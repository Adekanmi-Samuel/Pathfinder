import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API = "https://api.paystack.co";

interface PaystackResponse {
  status: boolean;
  message: string;
  data?: Record<string, unknown>;
}

async function paystackFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<PaystackResponse> {
  const res = await fetch(`${PAYSTACK_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return res.json();
}

export async function initializeTransaction(params: {
  email: string;
  amount: number; // in kobo (Naira × 100)
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, unknown>;
}) {
  return paystackFetch("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      ...params,
      amount: params.amount,
    }),
  });
}

export async function verifyTransaction(reference: string) {
  return paystackFetch(`/transaction/verify/${reference}`);
}

export async function createSubscription(params: {
  email: string;
  plan: string; // Paystack plan code
  authorization?: string;
}) {
  return paystackFetch("/subscription", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function disableSubscription(params: {
  code: string;
  token: string;
}) {
  return paystackFetch("/subscription/disable", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const hash = crypto
    .createHmac("sha512", secret)
    .update(body)
    .digest("hex");
  return hash === signature;
}

// Plan amounts in Naira (converted to kobo)
export const PLANS = {
  pro: { name: "Pro", amount: 1200, interval: "monthly" }, // ₦12/mo
  business: { name: "Business", amount: 2900, interval: "monthly" }, // ₦29/mo
} as const;
