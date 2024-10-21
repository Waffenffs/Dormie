import { NextResponse, NextRequest } from "next/server";

// query params:
// -- type
// -- monthly_price
// -- amenities
// request: api/explore?

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const type = searchParams.get('type');
    const monthlyPrice = searchParams.get('monthly_price');

    const success = NextResponse.json({
        message: type
    }, {
        status: 200 
    })

    return success;
}