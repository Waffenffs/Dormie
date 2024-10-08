'use server';

import type { DormSchema } from './page';

import { v4 as uuidv4 } from 'uuid'

import { createClient } from "@/supabase/server";

// FormData has to be passed over.
export async function uploadListing(values: DormSchema, formData: FormData) {
    const supabase = createClient();
    const imageFiles = formData.getAll('images')
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
        imageFiles.forEach(async (file) => {
            const imageUrl = `listing_image_${uuidv4()}`

            const { error: imageUploadError } = await supabase
                .storage
                .from('/images/listings')
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