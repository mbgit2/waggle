"use client";

import { useState } from "react";
import {createOnboarding} from "@/app/onboarding/actions";
import {redirect} from "next/navigation";

interface Service {
    name: string;
    description: string;
    type: string;
    price: string;
}

export default function OnboardingForm() {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        bio: "",
        services: [] as Service[],
    });

    const [newService, setNewService] = useState<Service>({
        name: "",
        description: "",
        type: "",
        price: "",
    });

    const handleServiceAdd = () => {
        const errors = [];
        if (!newService.name.trim()) errors.push("Service name is required.");
        if (!newService.description.trim()) errors.push("Description is required.");
        const price = parseFloat(newService.price);
        if (isNaN(price) || price < 0 || price > 1000) errors.push("Price must be between 0 and 1000.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        setForm({
            ...form,
            services: [...form.services, newService],
        });

        setNewService({
            name: "",
            description: "",
            type: "",
            price: "",
        });
    };

    const handleServiceRemove = (index: number) => {
        const updated = form.services.filter((_, i) => i !== index);
        setForm({ ...form, services: updated });
    };

    const categories = ["Funeral", "Photoshoot", "Course", "Clothing", "Beauty"];



    async function handleSubmit(formData: FormData) {
        if (submitting) {
            return
        }

        setSubmitting(true);
        try {
            await createOnboarding(formData);
        } catch (e) {
            // Prevent form from being cleared on error
            e.preventDefault?.();
            alert(e instanceof Error ? e.message : 'Something went wrong');
            redirect('/onboarding')
        }
    }

    return (
        <form action={handleSubmit}>
        <div className="max-w-xl mx-auto p-6">
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Step 1: Personal Information</h2>
                    <input placeholder="Name" className="w-full p-2 border rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Email" className="w-full p-2 border rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input placeholder="Phone" className="w-full p-2 border rounded" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    <input placeholder="Location" className="w-full p-2 border rounded" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                    <textarea placeholder="Professional Bio" className="w-full p-2 border rounded" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                    <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setStep(2)}>Next</button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Step 2: Service Setup</h2>
                    <input placeholder="Service Name" className="w-full p-2 border rounded" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                    <textarea placeholder="Description" className="w-full p-2 border rounded" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
                    <select className="w-full p-2 border rounded" value={newService.type} onChange={(e) => setNewService({ ...newService, type: e.target.value })}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input placeholder="Price" className="w-full p-2 border rounded" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
                    <button type="button" onClick={handleServiceAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add Service</button>

                    <ul className="list-disc pl-5 space-y-2">
                        {form.services.map((s, i) => (
                            <li key={i} className="flex justify-between items-center">
                                <span>{s.name} - {s.type} - ${s.price}</span>
                                <button type="button"  onClick={() => handleServiceRemove(i)} className="text-red-600 text-sm ml-4">Remove</button>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between">
                        <button type="button"  onClick={() => setStep(1)} className="text-gray-600 underline">Back</button>
                        <button type="button"  onClick={() => setStep(3)} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center space-y-4">
                    <div className="mx-auto text-green-500 text-6xl">✔</div>
                    <h2 className="text-xl font-bold">Welcome aboard, {form.name}!</h2>
                    <p>Your onboarding is complete. You're ready to start offering your services.</p>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Continue to Onboarding</button>
                </div>
            )}
        </div>


            <input type="hidden" name="name" value={form.name} />
            <input type="hidden" name="email" value={form.email} />
            <input type="hidden" name="phone" value={form.phone} />
            <input type="hidden" name="location" value={form.location} />
            <input type="hidden" name="bio" value={form.bio} />
            <input type="hidden" name="services" value={JSON.stringify(form.services)} />
        </form>
    );
}
