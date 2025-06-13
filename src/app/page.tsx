import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from "next/link";

export default function Home() {
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
                    </div>
                    <Link href="/book">
                      <button
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0d9c6] text-[#191410] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                      >
                        <span className="truncate">Book a Service</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <h2 className="text-[#191410] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Some of Our
                Services</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwobNe_SnAC_ivt9DxnKRFeat_74s4MQTZ9P5qYzxETwJ2kR-nnUt4A7y3WFgzBUm7YJHRZPf9w_KLfb2OElicPumll2gm4j3t76UVun8NIHAw4YG1NELd4UdD-mnCMo4dKS3npaXvPr-SopcMb_edzV-TM952ULBphtpum17SYjqkCAQXmFXnn4jZTQ89sna45bTO_wKktNBtNHkYPSmFRIK6pImXix6jFEGe9udk6qjsUAhjHmjN0z8DEQLYzcPDbdq5gzAigpo")'
                      }}></div>
                  <div>
                    <p className="text-[#191410] text-base font-medium leading-normal">Pet Nail Salons</p>
                    <p className="text-[#8d7058] text-sm font-normal leading-normal">Give your pet the perfect
                      paw-dicure.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDByPBpAth6j5TCk9SEZcXSxuhKuXPbfcmkv6Gw2XTzZRLD8aDyA4bo98Z25yyGzRda0kshKStToJuLBqHPOePnmR8uKYJY_z0jHfC7CNEQr3XYPjcxzwTADTE9j5tjdXCHhtZAMAuez4D6Smz_ihr952meJCdiH_lsMsimOB9KRV4mbFvuv1xkJ2lJp6dImTfp2Fc10wRTfibJXdRP9EyotrYU50FitbV_3vXTOGlFFBt_bV3z9awc3z0_djyBeetejol7WMjaVw8")'
                      }}></div>
                  <div>
                    <p className="text-[#191410] text-base font-medium leading-normal">Pet Funeral Services</p>
                    <p className="text-[#8d7058] text-sm font-normal leading-normal">Honor your pet's memory with
                      dignity.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXZEzHnWGYP0pLbBQB7cPZSaFrzjg5gEJNml9ANoD2ZsJ0NZ_c2vUyh6yA-ocxyGQpQG3UTkgdWFIiW9xr5aBJeTKcKpF7u8e_lm2QAarAZ7uiPhoSzK6Nx3QkqqaRYpe-bR-9ukb79DgFJfsT6SupZszYmGtLC4f0djpwNbs-5QomDQghDLVIee5YtKOd93KlfX3kl7ZqmbTOA9wXK5fP9ftFC4LMwFfy2X3N_NAnTwpK4yclZVozKPga9YK3yixaHqIUPWGUH_w")'
                      }}></div>
                  <div>
                    <p className="text-[#191410] text-base font-medium leading-normal">Pet Motivational Courses</p>
                    <p className="text-[#8d7058] text-sm font-normal leading-normal">Help your dog realise their inner alpha.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                            backgroundImage: 'url("https://i.pinimg.com/736x/10/2d/3a/102d3a91f0ba6b5f19ad2673dcca9247.jpg")'
                          }}
                  ></div>
                  <div>
                    <p className="text-[#191410] text-base font-medium leading-normal">Pet Photography Salons</p>
                    <p className="text-[#8d7058] text-sm font-normal leading-normal">Capture unfurgettable
                      moments.</p>
                  </div>
                </div>
              </div>
              <div className="@container">
                <div
                    className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                  <div className="flex flex-col gap-2 text-center">
                    <h1
                        className="text-[#191410] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                    >
                      Ready to Spoil Your Pet?
                    </h1>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <div className="flex justify-center">
                      <Link href="/book">
                        <button
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0d9c6] text-[#191410] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow"
                        >
                          <span className="truncate">Book a Service</span>
                        </button>
                      </Link>
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
