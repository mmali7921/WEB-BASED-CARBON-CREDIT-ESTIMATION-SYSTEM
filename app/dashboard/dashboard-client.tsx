"use client"

import { useState, useEffect as useReactEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type CarbonEntry = {
  id: string
  userId: string
  energyUsage: number
  distance: number
  totalCarbon: number
  date: string | Date
}

type DashboardClientProps = {
  dbRecords: CarbonEntry[]
  error?: string | null
}

export default function DashboardClient({ dbRecords: initialRecords, error }: DashboardClientProps) {
  const [dbRecords] = useState<CarbonEntry[]>(initialRecords)

  const availableMonths = Array.from(
    new Set(
      dbRecords.map((r) =>
        new Date(r.date).toLocaleString("default", { month: "long", year: "numeric" })
      )
    )
  )

  const months = availableMonths.length > 0 ? availableMonths : ["No Data Yet"]
  const [selectedMonth, setSelectedMonth] = useState(months[0])

  useReactEffect(() => {
    if (availableMonths.length > 0 && !availableMonths.includes(selectedMonth)) {
      setSelectedMonth(availableMonths[0])
    }
  }, [availableMonths, selectedMonth])

  const monthlyRecords = dbRecords.filter(
    (r) => new Date(r.date).toLocaleString("default", { month: "long", year: "numeric" }) === selectedMonth
  )

  const monthlyGross = monthlyRecords.reduce((acc, r) => acc + r.energyUsage, 0)
  const monthlyNet = monthlyRecords.reduce((acc, r) => acc + r.totalCarbon, 0)
  const monthlyReductions = monthlyGross - monthlyNet
  const monthlyCredits = monthlyNet / 1000

  const currentAssessment = {
    gross: `${monthlyGross.toFixed(2)} kg`,
    reductions: `${monthlyReductions.toFixed(2)} kg`,
    net: `${monthlyNet.toFixed(2)} kg`,
    status: monthlyRecords.length > 0 ? "Tracked" : "No Data",
    credits: `${monthlyCredits.toFixed(4)}`,
    breakdown: [
      { activity: "Energy Usage", value: monthlyGross, unit: "kg CO₂" },
      { activity: "Distance / Transport", value: monthlyRecords.reduce((acc, r) => acc + r.distance, 0), unit: "kg CO₂" },
    ],
  }

  const totalEmissions = dbRecords.reduce((acc, r) => acc + r.energyUsage, 0)
  const totalNet = dbRecords.reduce((acc, r) => acc + r.totalCarbon, 0)
  const totalCredits = totalNet / 1000
  const avgMonthlyEmissions = availableMonths.length > 0 ? totalEmissions / availableMonths.length : 0

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-8 pt-32 pb-20 max-w-7xl mx-auto w-full">
        {error && (
          <div className="mb-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-serif tracking-tight mb-4">Dashboard</h2>
            <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
              Environmental Assessment Overview
            </p>
          </div>
          <Button
            onClick={downloadReport}
            disabled={dbRecords.length === 0}
            variant="outline"
            className="rounded-full border-border hover:bg-secondary/50 text-[10px] uppercase tracking-widest px-6 bg-transparent disabled:opacity-50"
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
              { label: "Credits", value: currentAssessment.credits },
              { label: "Status", value: currentAssessment.status, highlight: true },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                <div className="h-1 bg-secondary w-full">
                  <div
                    className="h-full bg-accent transition-all duration-1000"
                    style={{
                      width: `${monthlyGross > 0 ? (item.value / monthlyGross) * 100 : 0}%`,
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
              { label: "Total Emissions Recorded", value: `${totalEmissions.toFixed(2)} kg` },
              { label: "Average Monthly Emissions", value: `${avgMonthlyEmissions.toFixed(2)} kg` },
              { label: "Total Net Credits", value: totalCredits.toFixed(4) },
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

        <section className="mb-16">
          <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-muted-foreground">
            Recent Calculations
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Gross Emissions</TableHead>
                <TableHead>Net Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {error ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-destructive">
                    Could not load recent calculations. Please try again later.
                  </TableCell>
                </TableRow>
              ) : dbRecords.length > 0 ? (
                dbRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>Calculated Assessment</TableCell>
                    <TableCell>{record.energyUsage.toFixed(2)} kg</TableCell>
                    <TableCell>{(record.totalCarbon / 1000).toFixed(4)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No calculations saved yet. Access the calculator to generate your first report.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  )
}

