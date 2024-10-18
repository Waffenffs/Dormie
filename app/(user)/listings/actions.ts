'use server';

import type { USER_ROLE } from "@/app/lib/constants";

import { createClient } from "@/supabase/server";

export async function submit_role(
    user_role: USER_ROLE, 
    user_id: string
) {
    const supabase = createClient();

    const { error: updateRoleError} = await supabase
        .from("users")
        .update({
            role: user_role,
            role_initialized: true
        })
        .eq('id', user_id)
    if (updateRoleError) {
        throw new Error(updateRoleError.message);
    }
}