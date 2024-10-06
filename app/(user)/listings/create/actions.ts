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

    // LATER: 
    // 1. Compress images with CompressJS

    const supabase = createClient();

    const { } = await supabase
        .from('')

    image_files.forEach(async (file) => {
        const { error: imageUploadError } = await supabase 
            .storage
            .from('images/listings')
            .upload('', file)
    })
}