'use server';

import type { dormSchema } from "./page";
import { FileWithPath } from "react-dropzone";

import { createClient } from "@/supabase/server";

export async function uploadListing(
    values: dormSchema, 
    image_files: readonly FileWithPath[]
) {
    // 1. Validate form data
    // 2. Upload data to Supabase Database & Storage 

    // IMAGES
    // 1. Figure out how to upload them to Storage and listings_images database
    // 2. fks are listing_id

    // LATER: 
    // 1. Compress images with CompressJS

    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();

    const { error: listingUploadError } = await supabase
        .from('listings')
        .insert({
            owner_id: userData.user?.id,
            ...values
        })

    if (listingUploadError) {
        throw new Error(listingUploadError.message);
    }

    // image_files.forEach(async (file) => {
    //     const { error: imageUploadError } = await supabase 
    //         .storage
    //         .from('images/listings')
    //         .upload('', file)
    // })
}