"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react" 
import Link from "next/link";

export default function Hero() {
    return (
        <section className="my-12 md:my-24">
            <div className="max-w-xs md:max-w-xl flex flex-col gap-10 justify-start mx-3 max-md:text-center">
                <h1 className="text-3xl md:text-5xl w-full tracking-tight font-bold max-md:text-center">
                    Student dormitories for {" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">CvSU - Main</span>{" "}
                    campus. All in one place for your pleasure of viewing.
                </h1>

                <section className="flex flex-col gap-6">
                    <p className="text-lg tracking-normal">
                        What started out as a mere idea by a freshman student at CvSU, 
                        now having come into fruition with the goals of solving all your 
                        problems with handling your student housing.
                    </p>

                    <Button asChild>
                        <Link 
                            className="self-center md:self-start px-4" 
                            href={'/listings'}
                        >
                            <ArrowRight />
                            Explore
                        </Link>
                    </Button>
                </section>
            </div>
        </section>
    )
}