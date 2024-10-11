'use client';

import type { FileWithPath } from "react-dropzone";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

import imageCompression from "browser-image-compression";

import { uploadListing } from "./actions";
import { AMENITIES } from "@/app/lib/constants";

import {
    BadgeMinus as BadgeMinusIcon,
    BadgeX as BadgeXIcon,
    Upload as UploadIcon,
    Check as CheckIcon,
    Plus as PlusIcon,
    X as XIcon,
} from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const dormSchema = z.object({
    type: z.string(),
    monthly_price: z.coerce.number().max(9999),
    // total_beds: z.coerce.number(),
    // occupied_beds: z.coerce.number(),
    amenities: z
        .string()
        .array()
        .nonempty({ message: "At least one amenity must be included." }),
    title: z
        .string()
        .trim()
        .min(6, { message: "Title is too short." }),
    description: z.string().trim(),
})
export type DormSchema = z.infer<typeof dormSchema>;

type Room = {
    room_name: string;
    total_beds: number;
    occupied_beds: number;
}

export default function CreateListings() {
    const [pending, setPending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([
        {
            room_name: "Room 1",
            total_beds: 0,
            occupied_beds: 0
        }
    ]);
    // RHF's (react-hook-form) acceptedFiles property is immutable
    // The imageFiles state is a workaround for us to be able mutate it
    const [imageFiles, setImageFiles] = useState<FileWithPath[]>([]);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        noDrag: true,
        accept: {
            'image/png': ['.png', '.jpeg']
        },
        maxFiles: 3
    })

    useEffect(() => {
        setImageFiles([...acceptedFiles]);
    }, [acceptedFiles])

    const form = useForm<DormSchema>({
        resolver: zodResolver(dormSchema),
        defaultValues: {
            type: "shared"
        }
    })

    async function onSubmit(values: DormSchema) {
        if (imageFiles.length >= 1) {
            setPending(true);

            try {
                const formData = new FormData();

                const imageCompressionOptions = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                }

                for (const file of imageFiles) {
                    const compressedImage = await imageCompression(file, imageCompressionOptions);
                    formData.append('images', compressedImage, compressedImage.name);
                }

                const result = await uploadListing({...values}, formData);
                if (result.success) {
                    toast.success("Successfully created a dorm listing! We are shortly redirecting you...")
                    // We have to do this manually because RHF is the worst library of all time
                    form.reset({
                        type: "",
                        monthly_price: 0,
                        // total_beds: 0,
                        // occupied_beds: 0,
                        amenities: [],
                        title: "",
                        description: ""
                    })
                    setImageFiles([]);
                    setSubmitted(true);
                }
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            } finally {
                setPending(false);
            }
        } else {
            toast.error('Expected at least more than 1 attached image file')
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
                    </div>
                    <Label>Rooms</Label>
                    <div className="flex flex-col gap-4 items-center rounded-[var(--radius)] border border-border p-6 bg-muted">
                        {rooms.map((room, index) => (
                            <article key={index} className="w-full p-3 border border-border rounded-[var(--radius)] shadow-md bg-background">
                                <h3 className="text-md font-medium leading-none flex justify-between items-center w-full">
                                    <span>{room.room_name}</span>
                                    {rooms.length > 1 && (
                                        <BadgeMinusIcon 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const filteredRooms = rooms
                                                    .filter((_, thisIndex) => thisIndex !== index)
                                                    .map((room, thisIndex) => ({
                                                        ...room ,
                                                        room_name: `Room ${thisIndex + 1}`
                                                    }));
                                                setRooms(filteredRooms);
                                            }}
                                            className="hover:cursor-pointer hover:text-red-500 transition duration-300" 
                                        />
                                    )}
                                </h3>
                                <Separator className="my-2" />
                                <div className="w-full flex justify-row gap-5 items-center">
                                    <div className="flex flex-col gap-1 items-center w-1/2">
                                        <Label>Total Beds</Label>
                                        <Input 
                                            value={room.total_beds}
                                            onChange={(e) => {
                                                const newRooms = [...rooms];
                                                newRooms[index] = {...room, total_beds: parseInt(e.target.value)};
                                                setRooms(newRooms);
                                            }}
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 items-center w-1/2">
                                        <Label>Occupied Beds</Label>
                                        <Input 
                                            value={room.occupied_beds}
                                            onChange={(e) => {
                                                const newRooms = [...rooms];
                                                newRooms[index] = {...room, occupied_beds: parseInt(e.target.value)};
                                                setRooms(newRooms);
                                            }}
                                            type="number"
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                        <Button 
                            onClick={(e) => {
                                e.preventDefault();
                                setRooms((prevState) => [...prevState, {
                                    room_name: `Room ${prevState.length + 1}`,
                                    total_beds: 0,
                                    occupied_beds: 0
                                }])
                            }}
                            className="flex flex-row items-center gap-1 self-end"
                        >
                            <span>Add Room</span>
                            <PlusIcon />
                        </Button>
                    </div>
                    <FormField 
                        control={form.control}
                        name="amenities"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amenities</FormLabel>
                                <div className="flex flex-row gap-2 w-full overflow-x-auto">
                                    {Array.isArray(field.value) && (
                                        field.value?.map((amenity) => (
                                            <div className="flex flex-row gap-2 items-center rounded-[var(--radius)] border border-border py-1 px-3 text-sm font-semibold tracking-wide hover:bg-muted transition duration-300">
                                                <span>Includes {amenity}</span>
                                                <XIcon 
                                                    className="hover:cursor-pointer hover:text-red-500"
                                                    onClick={() => {
                                                        const filteredAmenities = field.value?.filter((thisAmenity) => thisAmenity !== amenity);
                                                        field.onChange(filteredAmenities);
                                                    }}
                                                    size={15} 
                                                />
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="flex flex-row w-full rounded-[var(--radius)] border border-border p-4 overflow-x-auto">
                                    <Command>
                                        <CommandInput placeholder="Enter an amenity here..." />
                                        <CommandList>
                                            <CommandEmpty>No such amenities found.</CommandEmpty>
                                            {AMENITIES.map((amenity) => !field.value?.includes(amenity) && 
                                                 <CommandItem 
                                                    key={amenity}
                                                    value={amenity}
                                                    onSelect={(currentValue) => {
                                                        if (Array.isArray(field.value)) {
                                                            const selectedAmenities = [...field.value, currentValue];
                                                            field.onChange(selectedAmenities);
                                                        } else {
                                                            // Initialize so we can map over field.value
                                                            field.onChange([currentValue]);
                                                        }
                                                    }}
                                                >{amenity}</CommandItem>                                       
                                            )}
                                        </CommandList>
                                    </Command>
                                </div>
                                <FormDescription>What amenities does your dorm include? Please select from our given options.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                    Let them know more about your dorm like the rules, curfews, etc.
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
                    <Label>Preview</Label>
                    <section className="border border-border flex flex-col gap-7 justify-center items-center p-5 text-muted-foreground">
                        {imageFiles.map((file, index) => {
                            const handleDeletion = (e: React.MouseEvent) => {
                                e.preventDefault();
                                setImageFiles(prevState => prevState.filter((i) => i.path !== file.path))
                            }

                            return (
                                <div 
                                    key={index} 
                                    className="relative z-0"
                                >
                                    <img 
                                        className="rounded-[var(--radius)] w-full h-full"
                                        src={URL.createObjectURL(file)} 
                                    />
                                    <Button 
                                        className="rounded-full absolute -top-2 -right-3"
                                        onClick={(e) => handleDeletion(e)} 
                                        variant={"destructive"}
                                    >
                                        <BadgeXIcon />
                                    </Button>
                                </div>
                            )
                        })}
                    </section>
                    <div className="flex flex-col mt-8">
                        <div className={`flex-grow self-end ${submitted && "hover:cursor-not-allowed"}`}>
                            <Button 
                                className="flex flex-row gap-1 items-center transition duration-300"
                                type="submit"
                                disabled={pending || submitted}
                            >
                                {submitted && <CheckIcon />}
                                Submit Dorm
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </main>
    )
}