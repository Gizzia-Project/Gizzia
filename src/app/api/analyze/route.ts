import { ImageAnnotatorClient } from "@google-cloud/vision";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const visionClient = new ImageAnnotatorClient({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY || "",
    client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
  },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get labels from Vision AI
    const [result] = await visionClient.labelDetection({
      image: { content: buffer },
    });

    const labels = result.labelAnnotations || [];
    const foodLabels = labels
      .filter((label) => label.description)
      .map((label) => label.description)
      .join(", ");

    // Use Gemini to analyze nutrition
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    const prompt = `Analyze the nutritional content of these foods: ${foodLabels}. 
                   Provide a detailed breakdown including:
                   1. Estimated calories per serving
                   2. Macronutrients (protein, carbs, fats)
                   3. Key vitamins and minerals
                   4. Health benefits
                   5. Any potential allergens or concerns
                   Format the response in a clear, structured way following this schema: {"calories": str, "macronutrients": str, "vitamins": str, "healthBenefit": str, "concerns": str}`;

    const result2 = await model.generateContent(prompt);
    const response = await result2.response;

    const nutritionAnalysis = response.text();

    return NextResponse.json({
      labels: foodLabels,
      nutrition: nutritionAnalysis,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}