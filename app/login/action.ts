'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";

import { z, ZodIssue } from "zod";

const schema = z.object({
    email: z
        .string()
        .trim()
        .min(3, { message: "Email is too short." })
        .email("This is not a valid email."),
    password: z
        .string()
        .trim()
        .min(6, { message: "Password is too short."}),
    mode: z
        .string()
        .min(1, { message: "Invalid mode." })
})

// TODOS:
// 1. Handle errors after validation succeeds
// 2. Implement sonners after error occurs by calling sonners()
// 3. Create /feed for authenticated users

// DONE:
// 1. Implement form validation for registration
// ---> Maybe if mode "login" then fire login() and vice versa
export async function authenticate(_prevState: any, formData: FormData) {
    const supabase = createClient();

    const validation = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        mode: formData.get('mode')
    })

    if (!validation.success) {
        return { errors: validation.error.issues };
    }

    if (validation.data.mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
            email: validation.data.email,
            password: validation.data.password 
        })

        if (error) {
            return {
                errors: [{
                    message: error.message,
                    path: ['supabase_login'],
                    code: 'custom'
                }] as ZodIssue[]
            }
        }

        revalidatePath('/', 'layout');
        redirect('/feed');
    } else if (validation.data.mode === "register") {
        const { error } = await supabase.auth.signUp({
            email: validation.data.email,
            password: validation.data.password
        })

        if (error) {
            return {
                errors: [{
                    message: error.message,
                    path: ['supabase_login'],
                    code: 'custom'
                }] as ZodIssue[]
            }
        }

        revalidatePath('/', 'layout');
        redirect('/listings')
    }

    return { errors: [] }
}
