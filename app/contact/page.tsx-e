import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-1 px-6 md:px-8 pt-32 pb-24 max-w-3xl mx-auto w-full text-center">
                <h1 className="text-4xl font-serif tracking-tight mb-6">Contact Us</h1>
                <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
                    Have questions about our calculation methodologies, system architecture, or want to discuss enterprise integrations? Reach out to our team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <Card className="bg-secondary/20 border-border rounded-none p-8">
                        <CardContent className="p-0 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6">
                                <Mail className="w-5 h-5 text-accent" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Engineering & Support</h3>
                            <p className="text-sm text-muted-foreground">hello@carbo.test</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary/20 border-border rounded-none p-8">
                        <CardContent className="p-0 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6">
                                <MapPin className="w-5 h-5 text-accent" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Headquarters</h3>
                            <p className="text-sm text-muted-foreground">Research Division<br />Global Climate Hub</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
