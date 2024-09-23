import { createClient } from "@/supabase/server"

import Navigation from "../components/navigation"
import { Fragment } from "react"

export default async function UserLayout({ children }: React.PropsWithChildren) {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    return (
        <Fragment>
            <Navigation user={data?.user} />
            {children}
        </Fragment>
    )
}