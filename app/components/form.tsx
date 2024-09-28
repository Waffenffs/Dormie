'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { ZodIssue } from "zod";

type Props = {
    action: (
        _prevState: any,
        formData: FormData,
    ) => Promise<{ errors: ZodIssue[] }>,
}

export default function Form({ action }: Props) {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [state, formAction] = useFormState(action, { errors: [] });
    // Use useFormStatus for pending/loading state
    const { pending } = useFormStatus();

    // const emailErrors = findErrors("email", state?.errors);
    // const passwordErrors = findErrors("password", state?.errors);
    // const supabaseLoginErrors = findErrors("supabase_login", state?.errors);

    const errors = {
        email: findErrors("email", state?.errors),
        password: findErrors("password", state?.errors),
        supabase: findErrors("password", state?.errors)
    }

    return (
            <form 
                action={formAction} 
                className="max-md:w-5/6 md:w-1/2 flex flex-col bg-card text-card-foreground max-md:rounded-[var(--radius)] p-10 border border-border drop-shadow-md"
            >
                {/* To pass mode state */}
                <input 
                    type="hidden" 
                    name="mode" 
                    id="mode" 
                    value={mode} 
                />
                <section className="flex flex-col">
                    <Label className="text-xl md:text-2xl md:font-bold md:self-center">Sign in to Dormie</Label>
                    {/* <Button variant={"outline"} className="mt-2 md:self-center md:px-10">Sign in with CvSU Gmail</Button> */}
                </section>

                <Separator className="my-10" />

                <Label htmlFor="email">Email</Label>
                <Input 
                    type="email" 
                    placeholder="Email" 
                    id="email" 
                    name="email" 
                    className="mt-1"
                />
                <ErrorMessage errors={errors.email} />
                <div className="mt-5"></div>
                <Label htmlFor="password">Password</Label>
                <Input 
                    type="password" 
                    placeholder="Password" 
                    id="password" 
                    name="password" 
                    className="mt-1" 
                />
                <ErrorMessage errors={errors.password} />
                <Button 
                    className="mt-8" 
                    type="submit" 
                    onClick={() => setMode("login")} 
                    disabled={pending}
                >
                    {pending ? 'Logging in...' : 'Login'}
                </Button>
                <ErrorMessage errors={errors.supabase} />
                <Button 
                    className="mt-2"
                    type="submit" 
                    variant={"outline"} 
                    onClick={() => setMode("register")} 
                    disabled={pending}
                >
                    {pending ? 'Registering...' : 'Register'}
                </Button>
                <span className="text-sm text-muted-foreground self-center underline mt-3">Forgot your password?</span>
            </form>
    )
}

const ErrorMessage = ({ errors }: { errors: string[] }) => {
    if (errors.length === 0) return null;

    return <div className="text-red-600 peer">{errors[0]}</div>
}

const findErrors = (fieldName: string, errors: ZodIssue[]) => {
    return errors
        .filter((item) => {
            return item.path.includes(fieldName);
        })
        .map((item) => item.message)
}