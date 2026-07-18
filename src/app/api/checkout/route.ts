import { NextRequest, NextResponse } from "next/server";
import { PLANS } from "@/lib/paystack";

export async function POST(request: NextRequest) {
  try {
    const { plan, email } = await request.json();

    if (!plan || !email) {
      return NextResponse.json(
        { error: "Plan and email are required" },
        { status: 400 }
      );
    }

    const planConfig = PLANS[plan as keyof typeof PLANS];
    if (!planConfig) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!secretKey) {
      return NextResponse.json(
        { error: "Paystack not configured" },
        { status: 500 }
      );
    }

    // Initialize Paystack transaction
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: planConfig.amount, // Already in kobo
          plan: plan,
          callback_url: `${appUrl}/dashboard?payment=success`,
          metadata: {
            plan,
            plan_name: planConfig.name,
          },
        }),
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to initialize checkout" },
      { status: 500 }
    );
  }
}
