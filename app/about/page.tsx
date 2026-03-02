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

                {/* Header Section (Hero) */}
                <header className="mb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-[10px] uppercase tracking-[0.2em] mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Climate Intelligence
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 leading-tight">
                        Reimagining <br className="hidden sm:block" /> Carbon Accountability
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A structured carbon intelligence system. We bridge the gap between raw energy data and actionable environmental insights.
                    </p>
                </header>

                {/* The Problem */}
                <section className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">
                                The Problem
                            </h3>
                            <h2 className="text-3xl font-serif tracking-tight mb-6">Carbon Accounting is Broken</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                For too long, sustainability data has been fragmented, complex, and buried in spreadsheets. As global compliance demands increase, organizations lack the structured visibility required to make confident environmental decisions.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                You cannot manage what you do not measure. A transparent baseline is no longer optional—it is a critical operational requirement.
                            </p>
                        </div>
                        <Card className="bg-secondary/30 border-border rounded-none p-8 md:p-12 h-full">
                            <CardContent className="p-0">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-6">
                                    Our Solution
                                </h3>
                                <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-4">
                                    <p className="font-medium text-lg text-foreground">
                                        We built a transparent baseline engine.
                                    </p>
                                    <p>
                                        Carbon Credit Recorder is a centralized platform designed to seamlessly process raw usage metrics—electricity, transport, fuels—against verified reduction efforts like solar and direct air capture.
                                    </p>
                                    <p>
                                        The result is an immediate, irrefutable snapshot of your net emissions and carbon credit positioning.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* What We Do */}
                <section className="mb-24">
                    <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8 text-center md:text-left">
                        What We Do
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                icon: <LineChart className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Real-Time Carbon Assessment",
                                desc: "Instant calculation of gross emissions against verified reduction actions to generate an immediate NET carbon footprint.",
                            },
                            {
                                icon: <Shield className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Standardized Modeling",
                                desc: "A headless architectural approach that queries conversion variables from an independent relational database state.",
                            },
                            {
                                icon: <Code className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Net Impact Analytics",
                                desc: "Rule-based analysis engine generating immediate operational insights to guide sustainable practices.",
                            },
                            {
                                icon: <Leaf className="w-5 h-5 mb-4 text-foreground/70" />,
                                title: "Carbon Credit Positioning",
                                desc: "Automated calculation of surplus deficits, translating raw emission metrics into actionable market positions.",
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

                {/* Why It Matters */}
                <section className="mb-24">
                    <div className="bg-accent/5 border border-accent/20 p-8 md:p-12 text-center max-w-4xl mx-auto">
                        <Shield className="w-8 h-8 text-accent mb-6 mx-auto" />
                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">
                            Why It Matters
                        </h3>
                        <h2 className="text-3xl font-serif tracking-tight mb-6">Driven By Accountability</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Sustainability must be quantifiable. We empower businesses to make data-driven environmental decisions, establish scalable impact measurements, and face tightening global climate accountability standards with absolute confidence.
                        </p>
                    </div>
                </section>

                {/* Technology Stack & Vision (2 Columns) */}
                <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            Technology & Architecture
                        </h3>
                        <div className="space-y-4">
                            <Card className="bg-background border-border rounded-none p-6">
                                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                                    Built for speed, security, and scale. Our modern stack ensures highly performant, type-safe data pipelines.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Next.js", "TypeScript", "Tailwind CSS", "Auth.js", "Prisma", "SQLite"].map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-secondary text-foreground text-[10px] uppercase tracking-wider font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Vision */}
                    <div>
                        <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-6">
                            The Vision
                        </h3>
                        <div className="border border-border p-6 h-[calc(100%-2.25rem)]">
                            <ul className="space-y-4">
                                {[
                                    "Becoming a foundational climate intelligence layer.",
                                    "Expanding automated enterprise utility API integrations.",
                                    "Powering scalable, entity-wide carbon management.",
                                    "Deploying enterprise-ready, compliant audit reporting."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-foreground/80">
                                        <ArrowRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
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
