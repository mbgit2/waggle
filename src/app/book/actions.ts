"use server";

import { redirect } from "next/navigation";
import {getServices} from "@/lib/db";

// Define service data structure - you'll need to adjust this based on your actual data
interface ServiceData {
    id: string;
    subAccountId: string;
    price: number;
    name: string;
}

export async function bookServices(formData: FormData) {
    console.log(formData)

    const email = formData.get("email") as string;
    const date = formData.get("date") as string;
    const serviceIds = formData.getAll("serviceIds[]") as string[];
    const services = await getServices()

// Get the selected service IDs from the form
    const selectedServiceIds = formData.getAll('serviceIds[]');

// Filter services to only include selected ones
    const selectedServices = services.filter(service =>
        selectedServiceIds.includes(service.id.toString())
    );

// Calculate total amount
    const totalAmount = selectedServices.reduce((sum, service) =>
        sum + parseFloat(service.price), 0
    );

// Create the payment object with splits
    const paymentData = {
        "account_id": "[platform-account-id]",
        "reference": "your-reference",
        "amount": {
            "currency": "EUR",
            "quantity": totalAmount.toFixed(2)
        },
        "return_url": "https://rootline.com/[PAYMENT_ID]",
        "splits": selectedServices.map(service => ({
            "account_id": `[service-${service.id}-account-id]`, // You'll need to map service IDs to account IDs
            "amount": {
                "currency": "EUR",
                "quantity": parseFloat(service.price).toFixed(2)
            },
            "reference": `service-${service.id}-payment`
        }))
    };

    console.log(paymentData);


    // Make API request to Rootline
    const res = await fetch('https://payment-api.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
            'Rootline-Version': '2024-04-23',
            'Content-Type': 'application/json',
                'X-Api-Key': process.env.CLIENT_KEY || 'YOUR_SECRET_TOKEN'
        },
        body: JSON.stringify(paymentData)
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