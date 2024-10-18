"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight as ArrowRightIcon } from "lucide-react" 

import Link from "next/link";

export default function Hero() {
    return (
        <section className="px-5">
            <div className="flex flex-col gap-10 justify-start max-md:text-center md:w-1/2">
                <h1 className="text-3xl md:text-5xl w-full tracking-tight font-bold max-md:text-center">
                    Student dormitories for {" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">CvSU - Main</span>{" "}
                    campus. All in one place for your pleasure of viewing.
                </h1>
                <section className="flex flex-col gap-6">
                    <p className="text-lg tracking-normal">
                        What started out as an idea by a freshman student at CvSU - Main, 
                        now realized with the goal of solving all your problems with 
                        finding your ideal dormitory.
                    </p>
                    <Button asChild>
                        <Link 
                            className="self-center md:self-start px-4" 
                            href={'/listings/explore'}
                        >
                            <ArrowRightIcon />
                            Explore
                        </Link>
                    </Button>
                </section>
            </div>
        </section>
    )
}