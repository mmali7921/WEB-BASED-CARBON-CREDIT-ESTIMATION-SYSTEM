import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, Shield, LineChart, Code, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 px-6 md:px-8 pt-32 pb-24 max-w-5xl mx-auto w-full">

                {/* Header Section */}
                <header className="mb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-[10px] uppercase tracking-[0.2em] mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Project Overview
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 leading-tight">
                        Accountability for a <br className="hidden sm:block" /> Sustainable Future
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A comprehensive, web-based carbon credit estimation system built to provide accurate environmental reporting through standardized metrics.
                    </p>
                </header>

                {/* The Purpose Block */}
                <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                    <Card className="bg-secondary/30 border-border rounded-none p-8 md:p-12">
                        <CardContent className="p-0">
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                                Purpose & Platform Scope
                            </h3>
                            <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-4">
                                <p>
                                    As global environmental regulations tighten, the necessity for precise carbon accounting has become paramount. This platform bridges the gap between complex greenhouse gas protocols and actionable, user-friendly assessments.
                                </p>
                                <p>
                                    Our system is designed to seamlessly record usage metrics—such as electricity, fuel, and transport—while applying scientifically standardized emission factors to calculate gross emissions. It simultaneously accounts for reduction efforts, supplying users with an immediate snapshot of their carbon deficit or surplus.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Why Carbon Accounting Matters */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">
                                The Core Problem
                            </h3>
                            <h2 className="text-3xl font-serif tracking-tight mb-6">Why Carbon Accounting Matters</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                You cannot manage what you do not measure. Establishing a transparent baseline of emissions is the critical first step any entity must take before designing meaningful reduction strategies or procuring offsets.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Regulatory adherence and preliminary compliance checks.",
                                    "Identifying operational inefficiencies.",
                                    "Understanding environmental liability before market participation.",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                        <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-accent/5 border border-accent/20 p-8 h-full flex flex-col justify-center">
                            <Shield className="w-8 h-8 text-accent mb-6" />
                            <h4 className="font-serif text-xl mb-3">Integrity & Standardisation</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                By enforcing standardized emission factors fetched from a secure central database, the platform prevents calculation discrepancies and anchors all assessments in peer-reviewed environmental science.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="mb-24">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8 text-center md:text-left">
                        Key Architectural Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                icon: <LineChart className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Calculated Assessments",
                                desc: "Real-time parsing of gross emissions against verified reduction actions, generating an immediate NET carbon footprint.",
                            },
                            {
                                icon: <Shield className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Secure Persistence",
                                desc: "OAuth-based user authentication granting access to isolated, encrypted dashboard environments for temporal tracking.",
                            },
                            {
                                icon: <Code className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Dynamic Factor Mapping",
                                desc: "A headless architectural approach that queries conversion variables from an independent relational database state.",
                            },
                            {
                                icon: <Leaf className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Intelligent Feedback",
                                desc: "Rule-based analysis engine generating immediate operational insights to guide sustainable practices and emission offset procurement.",
                            },
                        ].map((feature, i) => (
                            <Card key={i} className="bg-secondary/20 border-border rounded-none hover:bg-secondary/40 transition-colors">
                                <CardHeader className="pb-2">
                                    {feature.icon}
                                    <CardTitle className="font-serif text-lg tracking-tight">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Technology Stack & Roadmap (2 Columns) */}
                <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            Engineering Stack
                        </h3>
                        <div className="space-y-4">
                            <Card className="bg-background border-border rounded-none p-6">
                                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                                    Built on a modern React-based monolithic architecture prioritizing high performance and type safety.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Auth.js", "Prisma ORM", "SQLite"].map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-secondary text-foreground text-[10px] uppercase tracking-wider font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Roadmap */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            Project Roadmap
                        </h3>
                        <div className="border border-border p-6 h-[calc(100%-2.25rem)]">
                            <ul className="space-y-4">
                                {[
                                    "Integration with enterprise utility APIs for automated metric tracking.",
                                    "Generation of compliant PDF audit reports.",
                                    "Regional localization of emission factors.",
                                    "Implementation of team organization models."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-foreground/80">
                                        <span className="text-[10px] font-mono text-muted-foreground mt-0.5">0{i + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </section>

                {/* Team Placeholder */}
                <section className="border-t border-border pt-20">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">
                                The Engineering Team
                            </h3>
                            <h2 className="text-2xl font-serif tracking-tight">Built by Data Enthusiasts</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Placeholder Team Member */}
                        <div className="border border-border p-6 group hover:border-accent transition-colors">
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-6">
                                <Users className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                            </div>
                            <h4 className="font-medium text-lg mb-1">Muhammed Ali</h4>
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Lead Developer</p>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                                Focused on architectural design, UI consistency, and implementing scalable data persistence models.
                            </p>
                        </div>

                        {/* Empty Placeholders to show grid layout format */}
                        {[2, 3].map((_, i) => (
                            <div key={i} className="border border-border border-dashed p-6 flex flex-col items-center justify-center text-center opacity-50">
                                <Users className="w-6 h-6 text-muted-foreground mb-4" />
                                <p className="text-xs uppercase tracking-widest text-muted-foreground">Team Member Area</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Short Call to action */}
            <div className="border-t border-border bg-secondary/20 py-16">
                <div className="max-w-xl mx-auto text-center px-6">
                    <h3 className="text-xl font-serif mb-6">Ready to see your baseline?</h3>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 bg-foreground text-background hover:opacity-90 transition-opacity"
                    >
                        <Link href="/calculator" className="uppercase text-[10px] tracking-widest font-bold">
                            Open Calculator
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
