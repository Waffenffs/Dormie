import { authenticate } from "./action"

import Form from "../components/form"

export default async function Login() {
    return (
        <div className="w-screen h-screen flex max-md:justify-center max-md:items-center bg-muted">
            <Form action={authenticate} />
        </div>
    )
}