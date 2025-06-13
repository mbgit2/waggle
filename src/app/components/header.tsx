import Link from "next/link";

export default function Header() {
    return <>
        <header
            className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1ede9] px-10 py-3">
            <Link href="/">
            <div className="flex items-center gap-4 text-[#191410]">
                <div className="size-4">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-[#191410] text-lg font-bold leading-tight tracking-[-0.015em]">Waggle</h2>
            </div>
            </Link>
            <div className="flex flex-1 justify-end gap-8">
                <Link href="/onboarding">
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0d9c6] text-[#191410] text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="truncate">Onboard</span>
                    </button>
                </Link>
                <Link href="/book">
                <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f0d9c6] text-[#191410] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                    <span className="truncate">Book Now</span>
                </button>
                </Link>
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{
                        backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCA8WE6gjxNt7fTkTdcW5CeDdLLcYY9NuKqsI6eVLdXzioVo6XyWbqY2BBwt5vRgHayYegBeiY31bef5vbgPqbvFWPp0YMhgQkgxXg9Q_zKEt6JRhN_SLK28xMJnITvkUt7gifFFeuAWOZq73g1Mdb_1IaGH9kfq0kRPyQIVF4mSk6-YoR1Aq0YEP--AyYDixxRsK59SjPreSI2gGNvEZfDEPKVIz1tl5jHr3AwRiuG_A24w_QyStF4LREc78kdsk-whLD3tTcgGmk")',
                    }}
                ></div>
            </div>
        </header>
    </>
}