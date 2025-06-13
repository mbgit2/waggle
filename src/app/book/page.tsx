import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import {getServices} from "@/lib/db";

export default async function Home() {
    const services = await getServices();

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#fbfaf9] group/design-root overflow-x-hidden"
             style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
        >
            <div className="layout-container flex h-full grow flex-col">
                <Header/>

                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                        <div className="@container">
                            <div className="@[480px]:p-4">
                                <div
                                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                                    style={{
                                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBdzXRIjbLf3CHqm5DQxQAYqcIDu1g3z5lhQj6dY9_Uja3Q6Vb7qHNqdjE6QEjwaWGEd5O0ahSYVE2wZrezJJOh28xt4kzSafnC9mmL_TL-l_SxPeHy8208WiooXImXmPf8xGHkclQ0QZ3sOInMqTUpKNW5ZwEq1FifAj4tdJtMAbtPqyG3_xSZRaz2vHQ3efcC75gMPEY5AN5VKxH1FU2caaubm6v38L2rYdCKZd7DErCE_h7c49Is8rGUIvDQ7vHeQnNKdo6DxH0")'
                                    }}
                                >
                                    <div className="flex flex-col gap-2 text-center">
                                        <h1
                                            className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                                        >
                                            Pamper Your Pets with Waggle
                                        </h1>
                                        <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                                            Discover a world of care and fun for your furry, scaly, or feathered friends. From grooming to
                                            training, we've got it all.
                                        </h2>
                                        {services.map((service) => (
                                            <>
                                                <p>Service: {JSON.stringify(service)}</p>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        </div>
    );
}
