import { createClient } from "@/supabase/server"

import { authenticate } from "./actions"
import { redirect } from "next/navigation"

import type { Metadata } from "next"

import LoginPage from "./page"

export const metadata: Metadata = {
    title: "Dormie - Login",
    authors: {
        name: "Waffen Sultan",
        url: "https://github.com/waffenffs"
    }
}

export default async function LoginLayout() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    if (data.user === null) {
        return redirect('/listings/explore');
    }

    return (
        <main className="w-screen h-screen flex max-md:justify-center max-md:items-center bg-muted">
            <LoginPage action={authenticate} />
        </main>
    )
}