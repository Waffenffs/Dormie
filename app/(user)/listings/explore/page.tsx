'use client';

import type { User } from "@supabase/supabase-js"
import type { USER_ROLE } from "@/app/lib/constants";

import { useState, useEffect } from "react";

import { USER_ROLES } from "@/app/lib/constants";

import { submit_role } from "../actions";
import { wait } from "@/app/lib/utils";

import {
    Building2 as Building2Icon, 
    BookOpen as BookOpenIcon, 
    Check as CheckIcon
} from "lucide-react"
import { toast } from "sonner";
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
    const [showRoleDialog, setShowRoleDialog] = useState<boolean | undefined>();
    const [submittedRole, setSubmittedRole] = useState<boolean | undefined>(undefined);
    const [selected, setSelected] = useState<USER_ROLE | undefined>(undefined);

    useEffect(() => {
        if (!showRoleDialog) {
            wait(1000).then(() => setShowRoleDialog(true));
        }
    }, [])

    const handleRoleSubmit = async () => {
        if (selected === undefined) {
            return toast.error('Please choose a role!')
        }
        if (props.user === null) {
            return toast.error('User does not exist!')
        }

        try {
            await submit_role(selected, props.user.id);
            setSubmittedRole(true);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <main className="bg-muted overflow-auto w-full h-full">
            Hi
            <Dialog 
                open={!props.role_initialized && props.user !== null && !submittedRole && showRoleDialog}
                onOpenChange={(showRoleDialog) => {
                    if (!showRoleDialog) {
                        setShowRoleDialog(false);
                    }
                }}
            >
                <DialogContent 
                    onInteractOutside={(e) => e.preventDefault()}
                    className="[&>button]:hidden w-5/6 rounded-[var(--radius)] flex flex-col gap-10"
                >
                    <DialogHeader>
                        <DialogTitle>Welcome to Dormie!</DialogTitle>
                        <DialogDescription>What's your role as a user?</DialogDescription>
                    </DialogHeader>
                    <section className="flex flex-row items-center gap-2">
                        {USER_ROLES.map((role) => (
                            <div
                                key={role}
                                className={`
                                    w-1/2 h-32 transition duration-150 cursor-pointer flex flex-col gap-2 justify-center items-center rounded-[var(--radius)] border 
                                    ${selected === role ? 'bg-primary text-white shadow-xl' : 'border-border'}
                                `}
                                onClick={() => setSelected(role)}
                            >
                                {role === "Owner" ? <Building2Icon /> : <BookOpenIcon />}
                                <h1>{role}</h1>
                            </div>
                        ))}
                    </section>
                    <DialogFooter className="flex flex-row items-center">
                        <DialogDescription>Please choose one.</DialogDescription>
                        <Button 
                            className="flex flex-row items-center gap-1" 
                            onClick={() => handleRoleSubmit()}
                        >
                            <CheckIcon />
                            Complete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    )
}
