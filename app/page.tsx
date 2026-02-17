import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-[10px] uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Announcing V1.0 for Educational Use
        </div>

        <h1 className="text-5xl md:text-8xl font-serif max-w-4xl mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Measure Your Carbon Footprint Simply
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          A minimal tool for educational and preliminary environmental assessment. Record, calculate, and understand
          your impact.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            <Link href="/calculator" className="flex items-center gap-2 uppercase text-xs tracking-widest font-bold">
              Calculate Emissions <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <section className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            { title: "Automated Calculation", desc: "Instantly convert kWh and fuel liters into CO2 equivalents." },
            { title: "Dashboard Recording", desc: "Keep track of your monthly emissions in a clean, minimal list." },
            { title: "Credit Estimates", desc: "Understand how many carbon credits are needed to offset your usage." },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 bg-secondary/30 border border-border/50 text-left hover:border-border transition-colors group"
            >
              <h3 className="text-xl font-medium mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="px-8 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
        <div>© 2025 Carbon Credit Recorder</div>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  )
}
