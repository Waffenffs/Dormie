'use server';

import { toast } from "sonner";

import { createClient } from "@/supabase/server";

export async function submit_role(
    user_role: "student" | "owner", 
    user_id: string
) {
    const supabase = createClient();

    const { error } = await supabase
        .from("users")
        .update({
            role: user_role,
            role_initialized: true
        })
        .eq('id', user_id)

    if (error) {
        return toast.error("An error has occurred with roles!", {
            description: "See the console for more information."
        })
    }
}