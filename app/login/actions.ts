'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/supabase/server";

import type { formSchema } from "./page";

export async function authenticate(
    mode: "login" | "register", 
    values: formSchema
) {
    const supabase = createClient();

    if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        })

        if (signInError) {
            throw new Error(signInError.message);
        }

        revalidatePath('/', 'layout');
        redirect('/listings/explore')
    } else if (mode === "register") {
        const { error: signUpError} = await supabase.auth.signUp({
            email: values.email,
            password: values.password
        })

        if (signUpError) {
            throw new Error(signUpError.message)
        }

        const { data: userData } = await supabase.auth.getUser();
        const { error: userError } = await supabase.from('users').insert({
            id: userData.user?.id,
            email: values.email
        })

        if (userError) {
            throw new Error(userError.message)
        }

        revalidatePath('/', 'layout');
        redirect('/listings/explore');
    }
}