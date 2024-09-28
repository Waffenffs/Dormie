'use client';

import type { User } from "@supabase/supabase-js"
import { useState } from "react";

import { submit_role } from "./actions";

import { toast } from "sonner";

import {
    Building2, 
    BookOpen, 
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ListingsPageProps = {
    user: User | null;
    role_initialized: boolean
}

export default function ListingsPage(props: ListingsPageProps) {
    const [submittedRole, setSubmittedRole] = useState<boolean | undefined>(undefined);
    const [selected, setSelected] = useState<"student" | "owner" | undefined>(undefined);

    const handleRoleSubmit = async () => {
        if (selected === undefined) {
            return toast.error('Please choose a role!')
        }
        if (props.user === null) {
            return toast.error('User does not exist!')
        }

        await submit_role(selected, props.user.id);
        setSubmittedRole(true);
    }

    return (
        <main className="bg-muted overflow-auto w-screen h-screen">
            {
                (!submittedRole && !props.role_initialized) && (
                    <Dialog 
                        defaultOpen 
                        open={!submittedRole}
                    >
                        <DialogContent 
                            onInteractOutside={(e) => e.preventDefault()}
                            className="[&>button]:hidden"
                        >
                            <DialogHeader>
                                <DialogTitle>Welcome to Dormie!</DialogTitle>
                                <DialogDescription>What's your role as a user?</DialogDescription>
                            </DialogHeader>
                            <section className="flex flex-row items-center gap-2">
                                <div
                                    className={`w-32 h-32 md:w-1/2 transition duration-150 cursor-pointer hover:bg-muted flex flex-col gap-2 justify-center items-center rounded-[var(--radius)] border ${selected === "student" ? 'border-primary bg-muted' : 'border-border'}`}
                                    onClick={() => setSelected("student")}
                                >
                                    <BookOpen />
                                    <h1>Student</h1>
                                </div>
                                <div
                                    className={`w-32 h-32 md:w-1/2 transition duration-150 cursor-pointer hover:bg-muted flex flex-col gap-2 justify-center items-center rounded-[var(--radius)] border ${selected === "owner" ? 'border-primary bg-muted' : 'border-border'}`}
                                    onClick={() => setSelected("owner")}
                                >
                                    <Building2 />
                                    <h1>Owner</h1>
                                </div>
                            </section>
                            <DialogFooter>
                                <Button 
                                    className="flex flex-row items-center gap-1" 
                                    onClick={() => handleRoleSubmit()}
                                >
                                    <Check />
                                    Complete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )
            }
        </main>
    )
}
