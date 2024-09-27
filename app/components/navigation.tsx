"use client";

import type { User } from "@supabase/supabase-js";

import { logout } from "../(user)/actions";

import ThemeSwitcherButton from "./button-themeswitcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navigation({ user }: { user: User | null }) {
    const handleLogout = async () => {
        await logout();
    }

    return (
        <nav className="w-full flex justify-between items-center items-center py-2 px-4 bg-background/50 backdrop-blur-md sticky top-0">
            <section>
                <Link 
                    href={"/"} 
                    className="text-2xl md:text-4xl font-bold tracking-wide"
                >Dormie</Link>
            </section>
            <section className="flex flex-row justify-center items-center gap-2">
                <ThemeSwitcherButton />
                {!user && 
                    <Button asChild >
                        <Link href={'/login'}>Login / Register</Link>
                    </Button>
                }
                {user && 
                    <Button 
                        variant={"destructive"} 
                        onClick={() => handleLogout()}
                    >Logout</Button>
                }
            </section>
        </nav>
    )
}