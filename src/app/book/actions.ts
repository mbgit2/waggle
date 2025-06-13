"use server";

import { redirect } from "next/navigation";

// Define service data structure - you'll need to adjust this based on your actual data
interface ServiceData {
    id: string;
    subAccountId: string;
    price: number;
    name: string;
}

// Mock service data - replace with your actual service data source
const SERVICES_DATA: Record<string, ServiceData> = {
    "1": {
        id: "1",
        subAccountId: "sub_account_id_1",
        price: 4.00,
        name: "Service 1"
    },
    "2": {
        id: "2",
        subAccountId: "sub_account_id_2",
        price: 16.00,
        name: "Service 2"
    },
    // Add more services as needed
};

export async function bookServices(formData: FormData) {
    const email = formData.get("email") as string;
    const date = formData.get("date") as string;
    const serviceIds = formData.getAll("serviceIds[]") as string[];

    if (!email || !date || serviceIds.length === 0) {
        throw new Error("Missing booking information.");
    }

    // Calculate total amount and create splits
    let totalAmount = 0;
    const splits = serviceIds.map((serviceId, index) => {
        const service = SERVICES_DATA[serviceId];
        if (!service) {
            throw new Error(`Service not found: ${serviceId}`);
        }

        totalAmount += service.price;

        // Calculate fees for each split
        const platformFee = (service.price * 0.05).toFixed(2); // 5% platform fee
        const idealFeeShare = (0.30 * (service.price / totalAmount)).toFixed(2); // Proportional iDEAL fee

        return {
            account_id: service.subAccountId,
            amount: {
                currency: "EUR",
                quantity: service.price.toFixed(2)
            },
            reference: `${service.name} - ${date}`,
            description: `Booking for ${service.name} on ${date}`,
            fees: [
                {
                    flat_rate: {
                        amount: {
                            currency: "EUR",
                            quantity: platformFee
                        }
                    }
                },
                {
                    flat_rate: {
                        amount: {
                            currency: "EUR",
                            quantity: idealFeeShare
                        }
                    }
                }
            ]
        };
    });

    // Create payment request body
    const paymentData = {
        account_id: process.env.ROOTLINE_ACCOUNT_ID || "acc_3VfPsTP2kqnjR6LHnOdpVe", // Main account ID
        amount: {
            currency: "EUR",
            quantity: totalAmount.toFixed(2)
        },
        splits: splits,
        reference: `BOOKING-${Date.now()}-${email}`,
        description: `Service booking for ${email} on ${date}`,
        statement_descriptor: `Booking ${date}`,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"}/booking/success/[PAYMENT_ID]`,
        metadata: {
            email: email,
            date: date,
            serviceIds: serviceIds.join(",")
        }
    };

    // Make API request to Rootline
    const res = await fetch('https://payment-api.rootline.com/v1/payments', {
        method: 'POST',
        headers: {
            'Rootline-Version': '2024-04-23',
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.ROOTLINE_API_KEY || 'YOUR_SECRET_TOKEN'
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