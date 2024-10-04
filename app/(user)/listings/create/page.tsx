'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const dormSchema = z.object({
    type: z.string(),
    monthly_price: z.number().max(6),
    total_beds: z.number().max(2),
    occupied_beds: z.number().max(2),
    title: z
        .string()
        .trim()
        .min(6, { message: "Title is too short." }),
    description: z.string().trim(),
})

export default function CreateListings() {
    // **STORIES**
    // 1. Develop the general UI for the form
    // 2. Develop the functionality for the form
    // 3. Develop the option to add images (LAST)

    const form = useForm<z.infer<typeof dormSchema>>({
        resolver: zodResolver(dormSchema),
        defaultValues: {
            type: "shared"
        }
    })

    async function onSubmit(values: z.infer<typeof dormSchema>) {
    }

    return (
        <main className="bg-muted text-foreground flex justify-center items-center w-full h-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="bg-background p-10 rounded-[var(--radius)] border border-border shadow-md grid grid-cols-2 gap-5"
                >
                    <FormField 
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="mt-1">
                                <FormLabel>Dorm Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    {...field}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Dorm Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="shared">Shared Dorm</SelectItem>
                                        <SelectItem value="private">Private Dorm</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="monthly_price"
                        render={({ field }) => (
                            <FormItem className="mt-1">
                                <FormLabel>Monthly Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </main>
    )
}