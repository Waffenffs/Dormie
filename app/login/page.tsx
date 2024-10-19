'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { authenticate } from "./actions";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const signupSchema= z.object({
    email: z
        .string()
        .trim()
        .min(3, { message: "Email is too short." } )
        .email({ message: "Email is not valid." }),
    password: z
        .string()
        .trim()
        .min(6, { message: "Password is too short." }),
})
export type SignupSchema = z.infer<typeof signupSchema> 

export default function LoginPage() {
    const [mode, setMode] = useState<"login" | "register" | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<undefined | string>(undefined);
    const [pending, setPending] = useState(false);

    const form = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: SignupSchema) {
        if (mode !== undefined) {
            setPending(true);

            try {
                await authenticate(mode, {...values});
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            } finally {
                setPending(false);
            } 
        } else {
            console.log("Mode doesn't seem to be carrying over?");
        }
    }

    return (
        <main className="w-screen h-screen flex max-md:justify-center max-md:items-center bg-muted">
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-md:w-5/6 md:w-1/2 flex flex-col bg-card text-card-foreground max-md:rounded-[var(--radius)] p-10 border border-border drop-shadow-md"
                >
                    <input
                        type="hidden"
                        name="mode"
                        id="mode"
                        value={mode}
                    />

                    <section className="flex flex-col">
                        <Label className="text-xl self-center font-bold md:text-2xl">Sign in to Dormie</Label>
                    </section>

                    <Separator className="my-10" />
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="email" 
                                        placeholder="example.email@gmail.com" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-1">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="password"
                                        placeholder="Place your password here" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <Button 
                    type="submit"
                    onClick={() => setMode("login")}
                    disabled={pending}
                    className="mt-8"
                >
                    Login
                </Button>
                <div className="text-[0.8rem] text-destructive font-medium">{errorMessage}</div>
                <Button 
                    variant="outline"
                    type="submit"
                    onClick={() => setMode("register")}
                    disabled={pending}
                    className="mt-3"
                >
                    Register
                </Button>
                </form>
            </Form>
        </main>
    )
}