import type { Metadata } from "next"

import { createClient } from "@/supabase/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Dormie - Create Listing",
    authors: {
        name: "Waffen Sultan",
        url: "https://github.com/waffenffs"
    }
}

import { Fragment } from "react"

export default async function CreateListingsLayout({ children }: React.PropsWithChildren) {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    if (data.user === null) {
        return redirect('/login');
    }

    const { data: data_two } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()
    if (data_two?.role !== "owner") {
        return redirect('/listings/explore')
    }
    
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}