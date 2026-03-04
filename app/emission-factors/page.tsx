import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const EMISSION_FACTORS = [
  {
    source: "Air Travel (Long Haul)",
    factor: 0.13,
    unit: "kg CO₂e / pkm",
    category: "Emission",
  },
  {
    source: "Air Travel (Short Haul)",
    factor: 0.23,
    unit: "kg CO₂e / pkm",
    category: "Emission",
  },
  {
    source: "Diesel Fuel",
    factor: 2.68,
    unit: "kg CO₂e / liter",
    category: "Emission",
  },
  {
    source: "Electricity (Grid Average)",
    factor: 0.45,
    unit: "kg CO₂e / kWh",
    category: "Emission",
  },
  {
    source: "Gasoline (Petrol)",
    factor: 2.31,
    unit: "kg CO₂e / liter",
    category: "Emission",
  },
  {
    source: "Natural Gas",
    factor: 0.184,
    unit: "kg CO₂e / kWh",
    category: "Emission",
  },
  {
    source: "Biochar Application",
    factor: 2.5,
    unit: "kg CO₂e / kg biochar",
    category: "Capture",
  },
  {
    source: "Direct Air Capture (DAC)",
    factor: 1000,
    unit: "kg CO₂ / ton captured",
    category: "Capture",
  },
  {
    source: "Reforestation (Mature Tree)",
    factor: 21,
    unit: "kg CO₂ / tree / year",
    category: "Capture",
  },
]

export default function EmissionFactorsPage() {
  const emissionFactors = EMISSION_FACTORS.filter((f) => f.category === "Emission")
  const captureFactors = EMISSION_FACTORS.filter((f) => f.category === "Capture")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-8 pt-32 pb-20 max-w-7xl mx-auto w-full">
        <header className="mb-16">
          <h2 className="text-4xl font-serif tracking-tight mb-4">Emission Factors</h2>
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
            Standardized Carbon Conversion Rates
          </p>
        </header>

        <div className="max-w-3xl space-y-12">
          <Card className="bg-secondary/30 border-border rounded-none p-8">
            <CardContent className="p-0 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">
                  About Emission Factors
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  This system uses standardized emission factors to convert energy consumption and fuel usage into
                  carbon dioxide equivalents. These factors are based on international environmental standards and
                  provide consistent baseline measurements for educational and preliminary assessment purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <section>
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-muted-foreground">
              Emission Conversion Rates
            </h3>
            <div className="border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold py-6">Source</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold py-6">Factor</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold py-6">Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emissionFactors.map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-secondary/20 transition-colors">
                      <TableCell className="text-sm py-6 font-medium">{item.source}</TableCell>
                      <TableCell className="text-sm py-6 font-mono text-accent">{item.factor}</TableCell>
                      <TableCell className="text-xs py-6 text-muted-foreground">{item.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-muted-foreground">
              CO₂ Capture & Removal Technologies
            </h3>
            <div className="border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold py-6">Technology</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold py-6">Factor</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest font-bold py-6">Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {captureFactors.map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-secondary/20 transition-colors">
                      <TableCell className="text-sm py-6 font-medium">{item.source}</TableCell>
                      <TableCell className="text-sm py-6 font-mono text-accent">{item.factor}</TableCell>
                      <TableCell className="text-xs py-6 text-muted-foreground">{item.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              These removal factors represent the equivalent CO₂ reduction achieved through each technology.
            </p>
          </section>

          <Card className="bg-accent/10 border-accent/30 rounded-none p-8">
            <CardContent className="p-0">
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-foreground">Disclaimer</h3>
                <p className="text-sm leading-relaxed text-foreground/80">
                  The emission factors presented here are simplified estimates intended for educational use only. They
                  should not be used for official reporting, compliance verification, or formal carbon accounting. For
                  precise calculations, consult with certified environmental professionals and refer to region-specific
                  emission databases.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
