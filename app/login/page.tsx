import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { handleSignIn } from "@/app/actions/auth"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-20 text-center">

                <h1 className="text-4xl md:text-6xl font-serif max-w-2xl mb-6 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Sign In
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                    Access your personal dashboard to save, track, and reduce your carbon footprint over time.
                </p>

                <div className="bg-secondary/30 border border-border/50 p-10 rounded-2xl w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <form action={handleSignIn}>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full rounded-xl px-8 py-6 bg-foreground text-background hover:opacity-90 transition-opacity font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3"
                        >
                            {/* Google SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                            Continue with Google
                        </Button>
                    </form>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-8 text-center">
                        Secure & Minimal Authentication
                    </p>
                </div>

            </main>
        </div>
    )
}
