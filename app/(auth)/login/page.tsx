'use client'

import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const errorMessages: Record<string, string> = {
        OAuthAccountNotLinked: "An account with the same email exists. Please use the original login method.",
        AccessDenied: "Access was denied. Please try again.",
        Configuration: "There was a network error. Please try again.",
        Verification: "Invalid or expired sign-in link.",
        Default: "Something went wrong during login. Please try again.",
    };

    const errorMessage = error ? errorMessages[error] || errorMessages["Default"] : null;

    return (
        <div className="grid min-h-svh">
            <div className="flex flex-col gap-4 p-6">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-end gap-1 font-semibold">
                        <div className="bg-white text-primary-foreground flex size-10 items-center justify-center rounded-md">
                            <Image src={'/images/buildoova-logo.png'} width={30} height={30} alt="Buildoova logo" />
                        </div>
                        buildoova
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        {errorMessage && (
                            <div className="mb-4 rounded-md bg-red-100 border border-red-300 text-red-700 px-4 py-2 text-sm">
                                {errorMessage}
                            </div>
                        )}
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
