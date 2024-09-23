'use server';

import { createClient } from "@/supabase/server";

export async function logout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error.message);
    }
}