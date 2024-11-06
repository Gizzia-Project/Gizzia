import { NextRequest, NextResponse } from "next/server";
import { getArticleById, deleteArticle } from "@/db/models/article";

export async function GET(req: NextRequest, params: { params: { id: string } }) {
    try {
        const id = params.params.id;
        if (!id) {
            return NextResponse.json({ error: "ID not provided" }, { status: 400 });
        }

        const article = await getArticleById(id);

        // Pastikan artikel mengandung data yang diperlukan
        if (!article) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }

        return NextResponse.json({ data: article });  // Menambahkan key `data`
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, params: { params: { id: string } }) {
    try {
        const id = params.params.id;
        if (!id) {
            return NextResponse.json({ error: "ID not provided" }, { status: 400 });
        }
        await deleteArticle(id);
        return NextResponse.json({ message: "Article deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
    }
}