import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // Verify webhook signature
    const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;
    if (webhookSecret) {
      const hash = crypto
        .createHmac("sha512", webhookSecret)
        .update(body)
        .digest("hex");

      if (hash !== signature) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case "subscription.create":
        // New subscription created
        console.log("Subscription created:", event.data);
        // TODO: Save to subscriptions table
        break;

      case "invoice.payment.success":
        // Successful recurring payment
        console.log("Payment success:", event.data);
        // TODO: Update subscription period
        break;

      case "invoice.payment.failed":
        // Failed payment
        console.log("Payment failed:", event.data);
        // TODO: Mark subscription as at-risk
        break;

      case "subscription.disable":
        // Subscription cancelled
        console.log("Subscription disabled:", event.data);
        // TODO: Update subscription status
        break;

      default:
        console.log("Unhandled event:", event.event);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
