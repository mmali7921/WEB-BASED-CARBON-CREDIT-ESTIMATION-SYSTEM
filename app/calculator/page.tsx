"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RefreshCcw, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CalculatorPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [electricity, setElectricity] = useState("")
  const [petrol, setPetrol] = useState("")
  const [diesel, setDiesel] = useState("")
  const [lpg, setLpg] = useState("") // Added LPG state
  const [naturalGas, setNaturalGas] = useState("")
  const [flightLong, setFlightLong] = useState("")
  const [flightShort, setFlightShort] = useState("")
  const [solar, setSolar] = useState("")
  const [trees, setTrees] = useState("")
  const [dac, setDac] = useState("") // Added DAC state
  const [biochar, setBiochar] = useState("")
  const [allowedLimit, setAllowedLimit] = useState("1000")
  const [breakdown, setBreakdown] = useState<{
    energy: number
    distance: number
    gross: number
    reduction: number
    net: number
    credits: number
    isCompliant: boolean
    suggestions: string[]
  } | null>(null)

  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [entryMonth, setEntryMonth] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
  })

  // Hardcoded factors
  const [factors, setFactors] = useState<{ [key: string]: number }>({
    "Electricity (Grid Average)": 0.45,
    "Petrol (Gasoline)": 2.31,
    Diesel: 2.68,
    LPG: 1.51,
    "Natural Gas": 0.184,
    "Air Travel (Long Haul)": 0.13,
    "Air Travel (Short Haul)": 0.23,
    "Reforestation (Mature Tree)": 21.00,
    "Direct Air Capture (DAC)": 1.0,
    "Biochar Application": 2.5,
    "Carbon Capture & Storage (CCS)": 1.0,
  })

  const calculate = (e: React.FormEvent) => {
    e.preventDefault()
    const elecEmission = Number(electricity) * (factors["Electricity (Grid Average)"] || 0.45)
    const petrolEmission = Number(petrol) * (factors["Petrol (Gasoline)"] || 2.31)
    const dieselEmission = Number(diesel) * (factors["Diesel"] || 2.68)
    const lpgEmission = Number(lpg) * (factors["LPG"] || 1.51) // Added LPG emission calculation
    const ngEmission = Number(naturalGas) * (factors["Natural Gas"] || 0.184)
    const flightLongEmission = Number(flightLong) * (factors["Air Travel (Long Haul)"] || 0.13)
    const flightShortEmission = Number(flightShort) * (factors["Air Travel (Short Haul)"] || 0.23)

    const energy = elecEmission + lpgEmission + ngEmission
    const distanceE = petrolEmission + dieselEmission + flightLongEmission + flightShortEmission
    const gross = energy + distanceE

    const solarReduction = Number(solar) * (factors["Electricity (Grid Average)"] || 0.45)
    const treeReduction = Number(trees) * (factors["Reforestation (Mature Tree)"] || 21)
    const dacReduction = Number(dac) * (factors["Direct Air Capture (DAC)"] || 1.0)
    const biocharReduction = Number(biochar) * (factors["Biochar Application"] || 2.5)

    let totalReduction = solarReduction + treeReduction + dacReduction + biocharReduction
    if (totalReduction > gross) {
      totalReduction = gross
    }
    const reduction = totalReduction

    const net = gross - reduction
    const limit = Number(allowedLimit)
    const isCompliant = net <= limit
    const creditDiff = Math.abs(limit - net) / 1000

    // Rule-based suggestions
    const suggestions = []
    if (Number(electricity) > 300 && Number(solar) === 0) {
      suggestions.push("Consider installing solar panels to offset high electricity consumption.")
    }
    if ((Number(petrol) > 50 || Number(diesel) > 50) && Number(trees) < 5) {
      suggestions.push("High fuel usage detected. Plant more trees to improve your reduction offset.")
    }
    if (net > limit) {
      suggestions.push("Your net emissions exceed the allowed limit. Focus on reducing transport fuel or grid power.")
    }
    if (suggestions.length === 0) {
      suggestions.push("You are maintaining an excellent balance. Continue your current sustainable practices.")
    }

    setBreakdown({ energy, distance: distanceE, gross, reduction, net, credits: creditDiff, isCompliant, suggestions })
    setSaveSuccess(false) // reset success state on new calc
  }

  const handleSave = async () => {
    if (!breakdown) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/carbon-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          energyUsage: breakdown.energy,
          distance: breakdown.distance,
          totalCarbon: breakdown.net,
          date: new Date(
            `${entryMonth || new Date().toISOString().slice(0, 7)}-01T12:00:00Z`
          ).toISOString(),
        }),
      })

      if (response.ok) {
        setSaveSuccess(true)
        router.push("/dashboard")
        router.refresh()
      } else {
        const data = await response.json().catch(() => null)
        alert(data?.error || "Save Failed")
      }
    } catch (error) {
      alert("Failed to save calculation")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to home
          </Link>

          <h2 className="text-4xl font-serif mb-12 tracking-tight">Carbon Credit Calculator</h2>

          {!breakdown ? (
            <form onSubmit={calculate} className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground border-b border-border pb-2">
                  Emission Inputs (Gross)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="electricity"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Electricity (kWh)
                    </Label>
                    <Input
                      id="electricity"
                      type="number"
                      placeholder="e.g. 450"
                      value={electricity}
                      onChange={(e) => setElectricity(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="petrol"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Petrol (Liters)
                    </Label>
                    <Input
                      id="petrol"
                      type="number"
                      placeholder="e.g. 40"
                      value={petrol}
                      onChange={(e) => setPetrol(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="diesel"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Diesel (Liters)
                    </Label>
                    <Input
                      id="diesel"
                      type="number"
                      placeholder="e.g. 20"
                      value={diesel}
                      onChange={(e) => setDiesel(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lpg"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      LPG (KG)
                    </Label>
                    <Input
                      id="lpg"
                      type="number"
                      placeholder="e.g. 25"
                      value={lpg}
                      onChange={(e) => setLpg(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="naturalGas"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Natural Gas (kWh)
                    </Label>
                    <Input
                      id="naturalGas"
                      type="number"
                      placeholder="e.g. 100"
                      value={naturalGas}
                      onChange={(e) => setNaturalGas(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="flightLong"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Air Travel - Long Haul (pkm)
                    </Label>
                    <Input
                      id="flightLong"
                      type="number"
                      placeholder="e.g. 2000"
                      value={flightLong}
                      onChange={(e) => setFlightLong(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="flightShort"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Air Travel - Short Haul (pkm)
                    </Label>
                    <Input
                      id="flightShort"
                      type="number"
                      placeholder="e.g. 500"
                      value={flightShort}
                      onChange={(e) => setFlightShort(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="limit"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Allowed Limit (kg CO₂)
                    </Label>
                    <Input
                      id="limit"
                      type="number"
                      value={allowedLimit}
                      onChange={(e) => setAllowedLimit(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-foreground rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-accent border-b border-accent/20 pb-2">
                  Emission Reductions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="solar"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Solar Generated (kWh)
                    </Label>
                    <Input
                      id="solar"
                      type="number"
                      placeholder="e.g. 150"
                      value={solar}
                      onChange={(e) => setSolar(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-accent rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="trees"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Trees Planted
                    </Label>
                    <Input
                      id="trees"
                      type="number"
                      placeholder="e.g. 10"
                      value={trees}
                      onChange={(e) => setTrees(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-accent rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="dac"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      CO₂ Captured (DAC / CCS) (KG)
                    </Label>
                    <Input
                      id="dac"
                      type="number"
                      placeholder="e.g. 200"
                      value={dac}
                      onChange={(e) => setDac(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-accent rounded-none px-0 text-lg transition-all"
                    />
                    <p className="text-[9px] text-muted-foreground/60 mt-2">
                      Manually enter CO₂ captured using carbon capture systems
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="biochar"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground"
                    >
                      Biochar Application (KG)
                    </Label>
                    <Input
                      id="biochar"
                      type="number"
                      placeholder="e.g. 50"
                      value={biochar}
                      onChange={(e) => setBiochar(e.target.value)}
                      className="h-12 bg-transparent border-x-0 border-t-0 border-b-2 border-border focus:border-accent rounded-none px-0 text-lg transition-all"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-full bg-foreground text-background hover:opacity-90 uppercase text-xs tracking-widest font-bold transition-all"
              >
                Perform Assessment
              </Button>
            </form>
          ) : (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              <Card className="bg-secondary/30 border-border rounded-none p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                  <span
                    className={`text-[10px] uppercase tracking-widest font-bold ${breakdown.isCompliant ? "text-accent" : "text-destructive"}`}
                  >
                    {breakdown.isCompliant ? "Compliant" : "Non-Compliant"}
                  </span>
                </div>
                <CardContent className="p-0 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Gross</p>
                      <p className="text-3xl font-serif">{breakdown.gross.toFixed(1)} kg</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">Reduction</p>
                      <p className="text-3xl font-serif">{breakdown.reduction.toFixed(1)} kg</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Net</p>
                      <p className="text-3xl font-serif">{breakdown.net.toFixed(1)} kg</p>
                    </div>
                  </div>

                  <div className="h-px bg-border w-1/4 mx-auto" />

                  <div className="text-center space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
                      {breakdown.isCompliant ? "Carbon Credits Surplus" : "Carbon Credits Required"}
                    </p>
                    <h3 className={`text-6xl font-serif ${breakdown.isCompliant ? "text-accent" : "text-foreground"}`}>
                      {breakdown.credits.toFixed(4)}
                      <span className="text-xl font-sans text-muted-foreground uppercase tracking-widest ml-3">
                        Credits
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-col items-center gap-4 mt-8">
                    {session?.user && !saveSuccess && (
                      <div className="flex flex-col items-center gap-2 mb-2">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground mr-2 font-bold">Select Month To Save For</Label>
                        <Input
                          type="month"
                          value={entryMonth}
                          onChange={(e) => setEntryMonth(e.target.value)}
                          className="w-36 h-8 bg-transparent border-t-0 border-x-0 border-b border-border focus:border-foreground rounded-none text-xs uppercase tracking-widest text-center shadow-none mb-2"
                        />
                      </div>
                    )}
                    <div className="flex justify-center gap-6">
                      <Button
                        type="button"
                        onClick={() => setBreakdown(null)}
                        variant="outline"
                        className="rounded-full border-border hover:bg-secondary transition-all uppercase text-[10px] tracking-widest font-medium px-6"
                      >
                        <RefreshCcw className="w-3 h-3 mr-2" /> New Calculation
                      </Button>

                      {session?.user && !saveSuccess && (
                        <Button
                          onClick={handleSave}
                          disabled={isSaving}
                          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all uppercase text-[10px] tracking-widest px-8"
                        >
                          {isSaving ? "Saving..." : "Save Entry"}
                        </Button>
                      )}
                    </div>

                    {saveSuccess && (
                      <p className="text-xs text-accent uppercase tracking-widest font-bold animate-in fade-in duration-300">
                        Entry saved successfully!
                      </p>
                    )}

                    {!session?.user && (
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center mt-2">
                        Sign in to save this calculation to your dashboard
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Carbon Reduction Suggestions Card */}
              <Card className="bg-accent/5 border-accent/20 rounded-none p-8">
                <CardHeader className="p-0 mb-6 flex flex-row items-center gap-3">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <CardTitle className="text-[10px] uppercase tracking-widest text-accent font-bold">
                    Reduction Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-4">
                    {breakdown.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm leading-relaxed text-foreground/80 flex gap-3">
                        <span className="text-accent shrink-0">—</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
