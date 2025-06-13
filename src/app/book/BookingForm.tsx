"use client";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {useState} from "react";
import {Service} from "@/lib/db/types";
import {bookServices} from "@/app/book/actions";

interface Props {
    services: Service[];
}

export default function BookingForm({ services }: Props) {
    const [type, setType] = useState("");
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);

    const filteredServices = services.filter((s) => s.type === type);
    const selected = services.find((s) => s.id === selectedServiceId);
    const serviceTypes = Array.from(new Set(services.map((s) => s.type)));

    const addService = () => {
        if (selected && !selectedServices.some((s) => s.id === selected.id)) {
            setSelectedServices([...selectedServices, selected]);
        }
        setSelectedServiceId(null);
    };

    const removeService = (id: number) => {
        setSelectedServices(selectedServices.filter((s) => s.id !== id));
    };

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#fbfaf9] overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />

                <div className="px-40 flex flex-1 justify-center py-5 text-black">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <form
                            action={bookServices}
                            className="space-y-6 border p-6 rounded"
                        >
                            {/* 1. Select Type */}
                            <div>
                                <label>Service Type</label>
                                <select
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                        setSelectedServiceId(null);
                                    }}
                                    className="border p-2 w-full"
                                >
                                    <option value="">Select type</option>
                                    {serviceTypes.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 2. Select Service */}
                            {type && (
                                <div>
                                    <label>Service Name</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedServiceId ?? ""}
                                            onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                                            className="border p-2 flex-1"
                                        >
                                            <option value="">Select service</option>
                                            {filteredServices.map((s) => (
                                                <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={addService}
                                            className="bg-gray-700 text-white px-3 py-2 rounded"
                                            disabled={!selectedServiceId}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 3. List of Added Services */}
                            {selectedServices.length > 0 && (
                                <div>
                                    <label className="block mb-2 font-semibold">Selected Services:</label>
                                    <ul className="space-y-2">
                                        {selectedServices.map((s) => (
                                            <li key={s.id} className="flex justify-between items-center border p-2 rounded">
                                                <div>
                                                    <p className="font-medium">{s.name}</p>
                                                    <p className="text-sm text-gray-600">${s.price}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeService(s.id)}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                                {/* Hidden input for form submission */}
                                                <input type="hidden" name="serviceIds[]" value={s.id} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* 4. Email & Date */}
                            <div>
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>

                            <div>
                                <label>Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                disabled={selectedServices.length === 0}
                            >
                                Book Services
                            </button>
                        </form>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}