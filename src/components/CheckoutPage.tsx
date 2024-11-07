"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

interface CheckoutPageProps {
  amount: number;
  description: string;
}

const CheckoutPage = ({ amount, description }: CheckoutPageProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/stripe-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    let userEmail;

    // Fetch user email from the API
    try {
      const userResponse = await fetch("/api/auth/me");
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        setErrorMessage(`Failed to fetch user data: ${errorData.error}`);
        console.error("User data fetch error:", errorData);
        setLoading(false);
        return;
      }

      const userData = await userResponse.json();
      userEmail = userData.user.email; // Get email from user data
    } catch (error) {
      setErrorMessage("An error occurred while fetching user data.");
      console.error("User data API call error:", error);
      setLoading(false);
      return;
    }

    // Create donation record before confirming payment
    try {
      const donationResponse = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          description: description,
          emailProvider: userEmail, // Use the actual email from user data
          paymentDate: new Date().toISOString(),
        }),
      });

      if (!donationResponse.ok) {
        const errorData = await donationResponse.json();
        setErrorMessage(`Failed to create donation: ${errorData.error}`);
        console.error("Donation creation error:", errorData);
        setLoading(false); // Stop loading if donation creation fails
        return;
      }

      // Proceed to confirm payment after successful donation creation
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?amount=${amount}`,
        },
      });

      if (error) {
        // Handle error in payment confirmation
        setErrorMessage(error.message);
      } else {
        // Payment confirmed successfully
        console.log("Payment confirmed successfully!");
      }
    } catch (donationError) {
      setErrorMessage("An error occurred while creating the donation.");
      console.error("Donation API call error:", donationError);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface text-gray-300 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-green-900 mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
