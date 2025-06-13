"use server";

import { redirect } from "next/navigation";

// Define service data structure - you'll need to adjust this based on your actual data
interface ServiceData {
    id: string;
    subAccountId: string;
    price: number;
    name: string;
}

export async function bookServices(formData: FormData) {
    const email = formData.get("email") as string;
    const date = formData.get("date") as string;
    const serviceIds = formData.getAll("serviceIds[]") as string[];

    console.log(serviceIds)

    var body = JSON.stringify({
        account_id: process.env.ROOTLINE_PLATFORM_ACCOUNT,
        amount: {
            currency: 'EUR',
            quantity: '10.00'
        },
        reference: 'Pets',
        return_url: 'https://waggle-nine.vercel.app'
    })

    // Make API request to Rootline
    const res = await fetch('https://payment-api.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
            'Rootline-Version': '2024-04-23',
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.ROOTLINE_API_KEY || 'YOUR_SECRET_TOKEN'
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Rootline API error:", errorData);
        throw new Error("Failed to create payment");
    }

    const { checkout_url } = await res.json();

    if (!checkout_url) {
        throw new Error("No checkout URL received from payment provider");
    }

    redirect(checkout_url); // Redirect to Rootline checkout
}