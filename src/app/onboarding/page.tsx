import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import OnboardingForm from "@/app/onboarding/OnboardingForm";

export default function Onboarding() {
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#fbfaf9] overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <Header />

                <div className="px-40 flex flex-1 justify-center py-5 text-black">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <OnboardingForm/>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}