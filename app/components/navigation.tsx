"use client";

import type { User } from "@supabase/supabase-js";

import { logout } from "../(user)/actions";

import ThemeSwitcherButton from "./button-themeswitcher";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navigation({ user }: { user: User | null }) {
    const handleLogout = async () => {
        await logout();
    }

    return (
        <nav className="w-full flex justify-between items-center py-2 px-4 bg-background/50 backdrop-blur-md fixed border-b-2 border-black/10 z-20">
            <section>
                <Link 
                    href={"/"} 
                    className="text-2xl md:text-4xl font-bold tracking-wide"
                >Dormie</Link>
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
                    >Logout</Button>
                }
            </section>
        </nav>
    )
}