
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Image from "next/image";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { updateUserProfile } from "@/services/user";
import { signOut, useSession } from "next-auth/react";

export function Profile({ session }: { session: Session }) {
    const [formData, setFormData] = useState({
        name: session.user.name || "",
        username: session?.user?.username || '',
        email: session.user.email || "",
    });
    const { update } = useSession();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.promise(updateUserProfile(formData.name,formData.username),{
            loading: 'Updating...',
            success : async (res) =>{
                await update({ name: formData.name, username: formData.username });
                return res.data.message
            },
            error : (err) => err.response.data.message
        })
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="p-0 rounded-full">
                {session.user.image ? (
                    <Image
                    width={40}
                    height={40}
                    src={session.user.image}
                    alt="Profile"
                    className="rounded-full border-2 border-blue-500 cursor-pointer"
                    />
                ) : (
                    <span className="px-4 py-2 font-medium text-gray-700">Profile</span>
                )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 p-4 space-y-4 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Name
                        </label>
                        <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                        Username
                        </label>
                        <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        type="text"
                        placeholder="yourusername"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                        Email
                        </label>
                        <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        type="email"
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all cursor-pointer"
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            className="w-full bg-gray-100 hover:bg-gray-200 text-black font-semibold py-2 rounded-lg shadow-md transition-all cursor-pointer"
                            onClick={() => signOut()}
                        >
                            Logout
                        </Button>
                    </div>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
