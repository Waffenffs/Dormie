'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import { useState } from "react";

import { uploadListing } from "./actions";

import { Upload as UploadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
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
import { Textarea } from "@/components/ui/textarea";

const dormSchema = z.object({
    type: z.string(),
    monthly_price: z.coerce.number().max(9999),
    total_beds: z.coerce.number(),
    occupied_beds: z.coerce.number(),
    title: z
        .string()
        .trim()
        .min(6, { message: "Title is too short." }),
    description: z.string().trim(),
})
export type DormSchema = z.infer<typeof dormSchema>;

export default function CreateListings() {
    const [pending, setPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState<undefined | string>(undefined);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        noDrag: true,
        accept: {
            'image/png': ['.png', '.jpeg']
        },
        maxFiles: 3
    })

    const form = useForm<DormSchema>({
        resolver: zodResolver(dormSchema),
        defaultValues: {
            type: "shared"
        }
    })

    async function onSubmit(values: DormSchema) {
        if (acceptedFiles.length >= 1) {
            setPending(true);

            const formData = new FormData();
            acceptedFiles.forEach((file) => {
                formData.append('images', file, file.name);
            })

            try {
                const result = await uploadListing({...values}, formData);
                if (result.success) {
                    form.reset();
                }
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            } finally {
                setPending(false);
            }
        } else {
            setErrorMessage("Expected at least more than 1 attached image file")
        }
    }

    return (
        <main className="bg-gradient-to-br from-green-400 to-green-700 text-foreground flex justify-center items-center w-full h-full py-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="md:w-1/2 bg-background p-10 rounded-[var(--radius)] border border-border shadow-md flex flex-col gap-5"
                >
                    <div className="w-full grid grid-cols-2 gap-5">
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
                                                <SelectValue placeholder="Select" />
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
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="total_beds"
                            render={({ field }) => (
                                <FormItem className="mt-1">
                                    <FormLabel>Total Beds</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="occupied_beds"
                            render={({ field }) => (
                                <FormItem className="mt-1">
                                    <FormLabel>Occupied Beds</FormLabel>
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
                    </div>
                    <FormField 
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mt-1 flex-grow">
                                <FormLabel>Dorm Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        min={0}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The name for your dorm should be concise.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mt-1 flex-grow">
                                <FormLabel>Dorm Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="resize-none"
                                        rows={15}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can include amenities, and other applicable items.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Images</FormLabel>
                        <section {...getRootProps({ className: 'border border-border flex flex-col gap-2 justify-center items-center py-5 text-muted-foreground cursor-pointer' })}>
                            <Input {...getInputProps()} />
                            <UploadIcon />
                            <span>Click here to select your image files</span>
                        </section>
                        <FormDescription>Please attach at least 1 image file.</FormDescription>
                    </FormItem>
                    <div className="flex flex-col justify-end items-center mt-8">
                        <Button disabled={pending}>
                            Submit Dorm
                        </Button>
                        <div className="text-[0.8rem] text-destructive font-medium">{errorMessage}</div>
                    </div>
                </form>
            </Form>
        </main>
    )
}