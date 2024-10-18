'use server';

import { createClient } from "@/supabase/server";

export async function logout() {
    const supabase = createClient();

    const { error: logoutError} = await supabase.auth.signOut();
    if (logoutError) {
        throw new Error(logoutError.message);
    }
}