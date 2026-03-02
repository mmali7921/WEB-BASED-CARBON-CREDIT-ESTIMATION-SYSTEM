"use client" // added "use client" for interactivity (month switching)

import { useState } from "react" // added useState for monthly selector
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getCarbonEntries } from "@/app/actions/carbon"
import { useSession } from "next-auth/react"
import { useEffect, useState as useReactState } from "react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [dbRecords, setDbRecords] = useReactState<any[]>([])

  useEffect(() => {
    async function loadRecords() {
      if (session?.user) {
        const data = await getCarbonEntries()
        setDbRecords(data)
      }
    }
    loadRecords()
  }, [session])
  const [selectedMonth, setSelectedMonth] = useState("December 2025")

  const months = ["December 2025", "November 2025", "October 2025", "September 2025"]

  const downloadReport = () => {
    const reportData = [
      ["Carbon Credit Assessment Report"],
      ["Month", selectedMonth],
      [""],
      ["Summary"],
      ["Gross Emissions", currentAssessment.gross],
      ["Reductions", currentAssessment.reductions],
      ["Net Emissions", currentAssessment.net],
      ["Credits Status", currentAssessment.credits],
      ["Compliance Status", currentAssessment.status],
      ["CO₂ Captured", "0.00 kg"], // Added CO₂ Captured metric to report data
      [""],
      ["Activity Breakdown"],
      ["Activity", "Value", "Unit"],
      ...currentAssessment.breakdown.map((item) => [item.activity, item.value.toFixed(2), item.unit]),
    ]

    const csvContent = "data:text/csv;charset=utf-8," + reportData.map((e) => e.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `Carbon_Report_${selectedMonth.replace(" ", "_")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const assessments = {
    "December 2025": {
      gross: "425.50 kg",
      reductions: "150.00 kg",
      net: "275.50 kg",
      status: "Compliant",
      credits: "0.7245 Surplus",
      breakdown: [
        { activity: "Electricity", value: 250.5, unit: "kg CO₂" },
        { activity: "Petrol", value: 125.0, unit: "kg CO₂" },
        { activity: "Diesel", value: 50.0, unit: "kg CO₂" },
        { activity: "LPG", value: 0.0, unit: "kg CO₂" }, // Added LPG to activity breakdown
      ],
    },
    "November 2025": {
      gross: "150.20 kg",
      reductions: "20.00 kg",
      net: "130.20 kg",
      status: "Compliant",
      credits: "0.0000",
      breakdown: [
        { activity: "Electricity", value: 80.2, unit: "kg CO₂" },
        { activity: "Transport", value: 40.0, unit: "kg CO₂" },
        { activity: "Fuel", value: 30.0, unit: "kg CO₂" },
        { activity: "LPG", value: 0.0, unit: "kg CO₂" }, // Added LPG to activity breakdown
      ],
    },
    // ... other months would follow similar structure
  }

  const currentAssessment = assessments[selectedMonth as keyof typeof assessments] || assessments["December 2025"]

  const records = [
    { date: "2025-12-01", activity: "Monthly Home Usage", emissions: "425.50 kg", credits: "0.4255" },
    { date: "2025-11-15", activity: "Business Travel", emissions: "150.20 kg", credits: "0.1502" },
    { date: "2025-10-28", activity: "Office Utilities", emissions: "890.00 kg", credits: "0.8900" },
    { date: "2025-10-05", activity: "Data Center Cooling", emissions: "1,200.40 kg", credits: "1.2004" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-8 pt-32 pb-20 max-w-7xl mx-auto w-full">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-4">Dashboard</h2>
            <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
              Environmental Assessment Overview
            </p>
          </div>
          <Button
            onClick={downloadReport}
            variant="outline"
            className="rounded-full border-border hover:bg-secondary/50 text-[10px] uppercase tracking-widest px-6 bg-transparent"
          >
            <Download className="w-3 h-3 mr-2" /> Download Report
          </Button>
        </header>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">Monthly Assessment</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold">
                  {selectedMonth} <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border rounded-none">
                {months.map((month) => (
                  <DropdownMenuItem
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className="text-[10px] uppercase tracking-widest focus:bg-secondary cursor-pointer"
                  >
                    {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { label: "Gross Emissions", value: currentAssessment.gross },
              { label: "Reductions", value: currentAssessment.reductions },
              { label: "Net Emissions", value: currentAssessment.net },
              { label: "Credits Status", value: currentAssessment.credits || "0.0000" },
              { label: "Compliance", value: currentAssessment.status, highlight: true },
              { label: "CO₂ Captured", value: "0.00 kg", highlight: false }, // Added CO₂ Captured metric to dashboard summary
            ].map((stat, i) => (
              <Card key={i} className="bg-secondary/30 border-border rounded-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-2xl font-medium tracking-tighter ${stat.highlight ? "text-accent" : "text-foreground"}`}
                  >
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-muted-foreground">
            Activity-Wise Emission Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {currentAssessment.breakdown.map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-end border-b border-border pb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                    {item.activity}
                  </span>
                  <span className="text-xl font-medium tracking-tight">
                    {item.value.toFixed(2)}{" "}
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground ml-1">
                      {item.unit}
                    </span>
                  </span>
                </div>
                {/* Subtle visual indicator of relative weight */}
                <div className="h-1 bg-secondary w-full">
                  <div
                    className="h-full bg-accent transition-all duration-1000"
                    style={{
                      width: `${(item.value / Number.parseFloat(currentAssessment.gross.replace(/[^0-9.]/g, ""))) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-muted-foreground">
            Overall Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Emissions Recorded", value: "2,666.10 kg" },
              { label: "Average Monthly Emissions", value: "666.52 kg" },
              { label: "Total Credits Calculated", value: "2.6661" },
            ].map((stat, i) => (
              <Card key={i} className="bg-secondary/10 border-border rounded-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-medium tracking-tighter">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ... existing code (recent calculations table) ... */}
        <section className="mb-16">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-muted-foreground">
            Recent Calculations
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Emissions</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session?.user && dbRecords.length > 0 ? (
                dbRecords.map((record, i) => (
                  <TableRow key={i}>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>Calculated Assessment</TableCell>
                    <TableCell>{record.energyUsage.toFixed(2)} kg (Gross)</TableCell>
                    <TableCell>{record.totalCarbon.toFixed(4)}</TableCell>
                  </TableRow>
                ))
              ) : session?.user && dbRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No calculations saved yet.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record, i) => (
                  <TableRow key={i}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.activity}</TableCell>
                    <TableCell>{record.emissions}</TableCell>
                    <TableCell>{record.credits}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  )
}
