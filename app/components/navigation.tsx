"use client";

import ThemeSwitcherButton from "./button-themeswitcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="w-full flex justify-between items-center items-center py-2 px-4 bg-background/50 backdrop-blur-md sticky top-0">
            <section>
                <h2 className="text-2xl md:text-4xl font-bold tracking-wide">Dormie</h2>
            </section>
            <section className="flex flex-row justify-center items-center gap-2">
                <ThemeSwitcherButton />
                <Button asChild >
                    <Link href={'/login'}>Login / Register</Link>
                </Button>
            </section>
        </nav>
    )
}