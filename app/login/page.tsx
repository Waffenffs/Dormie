import { authenticate } from "./actions"

import Form from "../components/form"

export default async function LoginPage() {
    return (
        <div className="w-screen h-screen flex max-md:justify-center max-md:items-center bg-muted">
            <Form action={authenticate} />
        </div>
    )
}