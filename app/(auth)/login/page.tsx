import buildoovaLogo from '@/assets/images/buildoova-logo.png'
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
                <Link href="/" className="flex items-end gap-1 font-semibold">
                    <div className="bg-white text-primary-foreground flex size-10 items-center justify-center rounded-md">
                        <Image src={buildoovaLogo} width={30} height={30} alt="Buildoova logo"/>
                    </div>
                    buildoova
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
            <div className="relative hidden lg:block bg-gradient-to-br from-primary to-blue-800 text-white">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                <div className="relative z-10 flex h-[100vh] flex-col justify-between p-10">
                    <div className="text-center">
                        <Image
                            src={buildoovaLogo}
                            width={60}
                            height={60}
                            alt="Buildoova logo"
                            className="mx-auto mb-4"
                        />
                        <h1 className="text-4xl font-bold">Design Smarter, Launch Faster</h1>
                        <p className="mt-4 text-lg max-w-xl mx-auto">
                            buildoova empowers creators, freelancers, and startups to generate stunning portfolios & landing pages in minutes using AI or ready-made themes.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-6">
                        <div className="max-w-md text-center">
                            <h2 className="text-2xl font-semibold mb-2">AI-Powered Design</h2>
                            <p className="text-sm opacity-90">
                                Describe your idea — our AI builds a complete portfolio or landing page that fits your style.
                            </p>
                        </div>
                        <div className="max-w-md text-center">
                            <h2 className="text-2xl font-semibold mb-2">Pre-built Themes</h2>
                            <p className="text-sm opacity-90">
                                Choose from a library of professionally designed themes and customize them easily.
                            </p>
                        </div>
                        <div className="max-w-md text-center">
                            <h2 className="text-2xl font-semibold mb-2">One-Click Deployment</h2>
                            <p className="text-sm opacity-90">
                                Instantly publish your page to the web with a custom domain or use your own.
                            </p>
                        </div>
                        <div className="max-w-md text-center">
                            <h2 className="text-2xl font-semibold mb-2">Analytics & Insights</h2>
                            <p className="text-sm opacity-90">
                                Track traffic and performance with beautiful built-in analytics dashboards.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-10 opacity-80 text-sm italic">
                    &quot;buildoova helps you build your online presence — beautifully and effortlessly.&quot;
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
