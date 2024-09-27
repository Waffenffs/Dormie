import { createClient } from "@/supabase/server"

import ListingsPage from "./page"

export default async function ListingsLayout({ children }: React.PropsWithChildren) {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    const { data: userRoleData } = await supabase
        .from('users')
        .select('role_initialized')
        .eq('id', data.user?.id)
        .single()

    return (
        <main className="bg-muted overflow-auto w-screen h-screen">
            <ListingsPage 
                user={data?.user} 
                role_initialized={userRoleData?.role_initialized} 
            />
            {children}
        </main>
    )
}