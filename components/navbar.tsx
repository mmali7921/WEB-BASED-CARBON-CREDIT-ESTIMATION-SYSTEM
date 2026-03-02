import Link from "next/link"
import { UserAuthButton } from "@/components/user-auth-button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-sm bg-foreground text-background overflow-hidden group-hover:scale-105 transition-transform">
          {/* Abstract V Logo */}
          <div className="absolute w-[2px] h-4 bg-background/90 rotate-[25deg] -translate-x-1 translate-y-0.5" />
          <div className="absolute w-[2px] h-5 bg-accent -rotate-[25deg] translate-x-1" />
        </div>
        <span className="text-xl font-serif tracking-tight font-medium">Valence</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
        <Link href="/" className="hover:text-muted-foreground transition-colors">
          Home
        </Link>
        <Link href="/calculator" className="hover:text-muted-foreground transition-colors">
          Calculator
        </Link>
        <Link href="/dashboard" className="hover:text-muted-foreground transition-colors">
          Dashboard
        </Link>
        <Link href="/emission-factors" className="hover:text-muted-foreground transition-colors">
          Emission Factors
        </Link>
        <Link href="/about" className="hover:text-muted-foreground transition-colors">
          About
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserAuthButton />
      </div>
    </nav>
  )
}
