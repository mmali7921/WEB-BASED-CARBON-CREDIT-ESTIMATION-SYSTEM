import Link from "next/link"
import { UserAuthButton } from "@/components/user-auth-button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link href="/" className="text-xl font-medium tracking-tighter uppercase">
        Carbon Credit Recorder
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
