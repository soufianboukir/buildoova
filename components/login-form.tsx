'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from 'next/image';

import linkedInIcon from '@/assets/svgs/linkedin.svg'
import googleIcon from '@/assets/svgs/google.svg'
import githubIcon from '@/assets/svgs/github.svg'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to buildoova</h1>
                <p className="text-muted-foreground text-lg text-balance">
                    Build stunning portfolios and landing pages with our ready made-themes or AI-powered tools
                </p>
                <p className="text-lg text-blue-600 mt-2 font-medium">
                    No account needed - just sign in with your preferred provider
                </p>
        </div>

        <div className="grid gap-5">
            <Button
                variant="outline"
                className="w-full h-14 text-lg"
                onClick={() => signIn("github")}
                type="button"
                >
                    <Image src={githubIcon} width={25} height={25} alt='github icon'/>
                
                Continue with GitHub
            </Button>

            <Button
                variant="outline"
                className="w-full h-14 text-lg"
                onClick={() => signIn("google")}
                type="button"
                >
                    <Image src={googleIcon} width={25} height={25} alt='google icon'/>
                Continue with Google
            </Button>

            <Button
                variant="outline"
                className="w-full h-14 text-lg"
                onClick={() => signIn("linkedin")}
                type="button"
                >
                <Image src={linkedInIcon} width={25} height={25} alt='linkedin icon'/>
                
                Continue with LinkedIn
            </Button>
        </div>

        <div className="text-center text-base text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
    </form>
  );
}