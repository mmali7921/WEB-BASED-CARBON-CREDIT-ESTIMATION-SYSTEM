import { Navbar } from "@/components/navbar"

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 px-6 md:px-8 pt-32 pb-24 max-w-3xl mx-auto w-full">
                <h1 className="text-4xl font-serif tracking-tight mb-8">Terms of Service</h1>
                <div className="prose prose-neutral dark:prose-invert text-muted-foreground leading-relaxed">
                    <p className="mb-6">Last updated: March 2026</p>
                    <p className="mb-6">Welcome to carbo. By accessing our platform, you agree to these fundamental operational terms.</p>

                    <h2 className="text-xl font-medium text-foreground mt-8 mb-4">1. Platform Purpose</h2>
                    <p className="mb-6">carbo provides baseline carbon intelligence and emission estimations. Our calculations utilize standard emission factors but should not be considered legally binding audit deliverables.</p>

                    <h2 className="text-xl font-medium text-foreground mt-8 mb-4">2. User Responsibilities</h2>
                    <p className="mb-6">You are responsible for the accuracy of the raw data (energy use, fuel volumes) you input into the system. The quality of our carbon net analytics directly depends on your input accuracy.</p>

                    <h2 className="text-xl font-medium text-foreground mt-8 mb-4">3. Service Modifications</h2>
                    <p>We reserve the right to modify or discontinue features of the educational application as we refine our calculation baseline methodologies.</p>
                </div>
            </main>
        </div>
    )
}
