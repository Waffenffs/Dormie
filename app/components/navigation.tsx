"use client";

import type { User } from "@supabase/supabase-js";

import { logout } from "../(user)/actions";

import Link from "next/link";

import { House as HouseIcon } from "lucide-react"

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ThemeSwitcherButton from "./button-themeswitcher";

export default function Navigation({ user }: { user: User | null }) {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <nav className="w-full flex justify-between items-center items-center py-2 px-4 bg-background/50 backdrop-blur-md sticky top-0 relative z-50">
            <section>
                <Link 
                    href={"/"} 
                    className="text-2xl md:text-4xl font-bold tracking-wide flex flex-row items-center gap-1"
                >
                    <HouseIcon  size={30} />
                    <span>Dormie</span>
                </Link>
            </section>
            <section className="flex flex-row justify-center items-center gap-2">
                <ThemeSwitcherButton />
                {
                    user === null ?
                    <Button asChild>
                        <Link href={'/login'}>Login / Register</Link>
                    </Button>
                    :
                    <Button
                        variant={"destructive"}
                        onClick={() => handleLogout()}
                    >
                        <span>Logout</span>
                    </Button>
                }
            </section>
        </nav>
    )
}