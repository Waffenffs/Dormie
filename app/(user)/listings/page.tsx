import RoleCard from "@/app/components/initialize-role";

import type { User } from "@supabase/supabase-js"

type ListingsPageProps = {
    user: User | null;
    role_initialized: boolean
}

export default function ListingsPage(props: ListingsPageProps) {
    // 2. Create a UI to set value to the user's "role_initialized" column
    // 3. After that, add listings!
    // Fetch listings!

    console.log(`Role initialized?: ${props.role_initialized}`);

    // BUG:
    // 1. Renders RoleCard twice!

    return (
        <div className="flex justify-center items-center">
            {!props.role_initialized && <RoleCard />}
        </div>
    )
}
