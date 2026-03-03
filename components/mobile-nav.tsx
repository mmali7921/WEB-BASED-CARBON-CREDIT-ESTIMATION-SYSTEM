"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-8 border-l border-border/50">
                <SheetHeader className="p-0">
                    <SheetTitle className="text-left font-serif tracking-tight text-2xl">carbo</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8 mt-16 text-sm font-medium uppercase tracking-widest">
                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="hover:text-muted-foreground transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/calculator"
                        onClick={() => setOpen(false)}
                        className="hover:text-muted-foreground transition-colors"
                    >
                        Calculator
                    </Link>
                    <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="hover:text-muted-foreground transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/emission-factors"
                        onClick={() => setOpen(false)}
                        className="hover:text-muted-foreground transition-colors"
                    >
                        Emission Factors
                    </Link>
                    <Link
                        href="/about"
                        onClick={() => setOpen(false)}
                        className="hover:text-muted-foreground transition-colors"
                    >
                        About
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
