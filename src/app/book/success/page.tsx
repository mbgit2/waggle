"use client";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {useEffect, useState} from "react";
import {Service} from "../../../lib/db/types";

export default function BookingConfirmed() {
    const [selectedServices, setSelectedServices] = useState<Service[]>([]);

    useEffect(() => {
        // Retrieve saved services from localStorage on page load
        const storedServices = localStorage.getItem("selectedServices");
        if (storedServices) {
            setSelectedServices(JSON.parse(storedServices));
        }
    }, []);

    return (
        <>
            <div
                className="relative flex min-h-screen flex-col bg-[#fbfaf9] group/design-root overflow-x-hidden"
                style={{ fontFamily: 'Public Sans, Noto Sans, sans-serif' }}
            >
                <div className="layout-container flex h-full grow flex-col">
                    <Header />
                    <main className="px-40 flex flex-1 justify-center py-5">
                        <div className="flex flex-col w-[512px] max-w-[960px] flex-1 py-5">
                            <div className="@container">
                                <div className="@[480px]:px-4 @[480px]:py-3">
                                    <div
                                        className="flex min-h-[480px] flex-col gap-2 bg-cover bg-top bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                                        style={{
                                            backgroundImage:
                                                'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCNetiHHU2trW6KvMJzxlIRaPEFAXtgMVlEGZr5KIhlztt_-7uOizlZZJ6APUqcGC6uU4w5uBhNLY_SWujmea25lDuLtjDmWtFe7aL97j2f5l519V7Kda3UVCYb1CHlbAisnoFRdLX67J19RQkk6_7wE4bxUuo51LHcCCiVsFnix-XJPnH4ky-yunhld27aVSA493IvGNESTitTbHBhUrCrDheO-ooyxW12-_rf4IUuk8VzDL4v-QIygiMUdMfpBOWU8eXa7qAdunc)',
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <h2 className="text-[28px] text-black font-bold text-center pb-3 pt-5">Booking Confirmed!</h2>
                            <p className="text-black text-base text-center px-4 pb-3 pt-1">
                                Your pet care service has been successfully booked. We're excited to help you care for your furry friend!
                            </p>
                            <h3 className="text-black text-lg font-bold tracking-[-0.015em] px-4 pb-2 pt-4">Booking Details</h3>
                            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                                {[
                                    ['Service', selectedServices.at(0)?.name ?? 'Pet yacht vacation'],
                                    ['Date', 'July 22, 2024'],
                                    ['Time', '2:00 PM - 3:00 PM'],
                                    ['Location', 'The banks of the Amstel river'],
                                ].map(([label, value]) => (
                                    <div key={label} className="col-span-2 grid grid-cols-subgrid border-t border-[#e4dad3] py-5">
                                        <p className="text-sm text-[#8d7058]">{label}</p>
                                        <p className="text-sm text-[#191410]">{value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                                    <button className="h-10 px-4 rounded-full bg-[#f0d9c6] text-sm font-bold tracking-[0.015em] w-full">
                                        <span className="truncate">Add to Calendar</span>
                                    </button>
                                    <button className="h-10 px-4 rounded-full bg-[#f1ede9] text-sm font-bold tracking-[0.015em] w-full">
                                        <span className="truncate">Contact Support</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="flex justify-center">
                        <div className="max-w-[960px] flex-1">
                            <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
                                <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                                    {['About', 'Careers', 'Press', 'Terms', 'Privacy', 'Site Map'].map((item) => (
                                        <a key={item} className="text-[#8d7058] text-base" href="#">
                                            {item}
                                        </a>
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {[TwitterIcon(), FacebookIcon(), InstagramIcon()].map((icon, idx) => (
                                        <a key={idx} href="#" className="text-[#8d7058]">
                                            {icon}
                                        </a>
                                    ))}
                                </div>
                                <p className="text-[#8d7058] text-base">@2024 Waggle. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

function TwitterIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M247.39,68.94A8,8,0,0,0..." />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0..." />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,80a48,48,0,1,0..." />
        </svg>
    );
}
