import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => filters[key] = value)

    try {
        const supabase = createClient();
        let responseData;

        if (Object.keys(filters).length <= 0) {
            const { data: listings, error: fetchListingsError } = await supabase
                .from('listings')
                .select()
            if (fetchListingsError) {
                throw new Error(fetchListingsError.message);
            }

            responseData = listings;
        } else {
            responseData = "filtered data here";
        }

        return NextResponse.json({
            data: responseData
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: "Error fetching listings data.",
                error: error.message
            }, {
                status: 500,
                statusText: error.message
            })
        }
    }
}