'use server';

import type { dormSchema } from "./page";

import { FileWithPath } from "react-dropzone";
import { v4 as uuidv4 } from 'uuid'

import { createClient } from "@/supabase/server";

export async function uploadListing(
    values: dormSchema, 
    image_files: readonly FileWithPath[]
) {
    const supabase = createClient();
    const listingId = uuidv4();

    const { data: userData } = await supabase.auth.getUser();
    const { error: listingUploadError } = await supabase
        .from('listings')
        .insert({
            id: listingId,
            owner_id: userData.user?.id,
            ...values
        })

    if (listingUploadError) {
        throw new Error(listingUploadError.message);
    }

    try {
        image_files.forEach(async (file) => {
            const imageUrl = `listings/listing_image${listingId}`

            // TODO:
            // 1. Compress image file size so we don't run out of storage (500mb MAX for free tier)
            const { error: imageUploadError } = await supabase
                .storage
                .from('images')
                .upload(imageUrl, file)

            if (imageUploadError) {
                throw new Error(imageUploadError.message);
            }

            const { error: imageDatabaseUploadError } = await supabase
                .from('listings_images')
                .insert({
                    listing_id: listingId,
                    image_url: imageUrl
                })

            if (imageDatabaseUploadError) {
                throw new Error(imageDatabaseUploadError.message);
            }
        })
    } catch (error) { 
        throw error
    }

    return { success: true }
}