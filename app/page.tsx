
import { Button } from "@/components/ui/button";
import Image from "next/image";
import buildoovaLogo from '@/public/images/buildoova-logo.png'
import { auth } from "@/auth";
import { Profile } from "@/components/Profile";
import Link from "next/link";


export default async function Home() {
    const session = await auth();
    const isLoggedIn = session?.user ? true : false; 
    console.log(session);
    
    return (
      <main className="min-h-screen bg-white text-gray-800">
            <header className="flex justify-between items-center px-[15%] py-4 border-b">
                <h1 className="text-2xl flex gap-2 items-end font-bold">
                    <Image src={buildoovaLogo} alt="Application logo" width={30} height={30} />
                    buildoova
                </h1>
                <div>
                    {isLoggedIn ? (
                        session?.user.image && (
                            <Profile session={session}/>
                        )
                    ) : (
                    <button className="px-6 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg transition cursor-pointer">
                        <Link href={'/login'}>
                            Login
                        </Link>
                    </button>
                    )}
                </div>
            </header>
    
            <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-36">
                <div className="absolute w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />
        
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    Create AI-Powered Portfolios <br /> & Landing Pages Instantly
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
                    Empower your online presence with beautiful, smart designs—generated just for you.
                </p>
                <Button className="px-8 py-5 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white text-lg rounded-full transition shadow-lg">
                    <Link href={'/start'}>
                        Get Started For Free
                    </Link>
                </Button>
            </section>
      </main>
    );
  }
  