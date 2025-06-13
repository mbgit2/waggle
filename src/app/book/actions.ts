"use server";


import { redirect } from "next/navigation";

export async function bookServices(formData: FormData) {
    const email = formData.get("email") as string;
    const date = formData.get("date") as string;
    const serviceIds = formData.getAll("serviceIds[]") as string[];

    if (!email || !date || serviceIds.length === 0) {
        throw new Error("Missing booking information.");
    }

    // Optionally convert to numbers
    const ids = serviceIds.map(id => parseInt(id, 10));

    // Simulate API request to backend service
    const res = await fetch(`${process.env.BACKEND_URL}/api/book-multiple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceIds: ids, email, date }),
    });

    if (!res.ok) throw new Error("Failed to book services");

    const { checkoutUrl } = await res.json();

    redirect(checkoutUrl); // Redirect to external checkout
}

