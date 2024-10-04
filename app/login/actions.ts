'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/supabase/server";

export async function authenticate(
    mode: "login" | "register", 
    email: string, 
    password: string,
) {
    const supabase = createClient();

    if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (signInError) {
            throw new Error(signInError.message);
        }

        revalidatePath('/', 'layout');
        redirect('/listings/explore')
    } else if (mode === "register") {
        const { error: signUpError} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (signUpError) {
            throw new Error(signUpError.message)
        }

        const { data } = await supabase.auth.getUser();
        const { error: userError } = await supabase.from('users').insert({
            id: data.user?.id,
            email: email
        })

        if (userError) {
            throw new Error(userError.message)
        }

        revalidatePath('/', 'layout');
        redirect('/listings/explore');
    }
}