'use server';

import type { DormSchema } from './page';

import { v4 as uuidv4 } from 'uuid'

import { createClient } from "@/supabase/server";

export async function uploadListing(values: DormSchema, formData: FormData) {
    const { amenities, rooms, ...listingValues } = values;

    const supabase = createClient();

    const imageFiles = formData.getAll('images') as File[];
    const listingId = uuidv4();

    const { data: userData, error: userDataError } = await supabase.auth.getUser();
    if (userDataError) {
        throw new Error(userDataError.message);
    }

    const { error: listingUploadError } = await supabase
        .from('listings')
        .insert({
            id: listingId,
            owner_id: userData.user?.id,
            ...listingValues
        })
    if (listingUploadError) {
        throw new Error(listingUploadError.message);
    }

    const roomPromises = rooms.map(async (room) => {
        const { error: roomUploadError } = await supabase
            .from('listings_rooms')
            .insert({
                ...room,
                for_listing: listingId
            })
        if (roomUploadError) {
            throw new Error(roomUploadError.message);
        }
    })

    const amenityPromises = amenities.map(async (amenity) => {
        const { error: listingsAmenitiesUploadError } = await supabase
            .from('listings_amenities')
            .insert({
                listing_id: listingId,
                amenity: `Includes ${amenity}`
            })
        if (listingsAmenitiesUploadError) {
            throw new Error(listingsAmenitiesUploadError.message);
        }
    })

    const imageUrl = `listing_image_${uuidv4()}`
    const imagePromises = imageFiles.map(async (image) => {
        const { error: imageUploadError } = await supabase
            .storage
            .from('/images/listings')
            .upload(imageUrl, image)
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

    try {
        await Promise.all([
            ...amenityPromises, 
            ...imagePromises, 
            ...roomPromises
            ]);
    } catch (error) {
        throw error; // We'll throw it again so our client can catch it
    } 

    return { success: true }
}