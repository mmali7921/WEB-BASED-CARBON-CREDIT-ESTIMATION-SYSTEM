import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Start seeding emission factors...")

    const factors = [
        // Emissions
        // Emissions
        { source: "Electricity (Global Average)", factor: 0.45, unit: "kg CO₂e / kWh", category: "Emission" },
        { source: "Natural Gas", factor: 0.184, unit: "kg CO₂e / kWh", category: "Emission" },
        { source: "Petrol (Gasoline)", factor: 2.31, unit: "kg CO₂e / liter", category: "Emission" },
        { source: "Diesel", factor: 2.68, unit: "kg CO₂e / liter", category: "Emission" },
        { source: "Air Travel (Short Haul)", factor: 0.23, unit: "kg CO₂e / pkm", category: "Emission" },
        { source: "Air Travel (Long Haul)", factor: 0.13, unit: "kg CO₂e / pkm", category: "Emission" },

        // Captured / Reductions
        { source: "Direct Air Capture (DAC)", factor: 1000.0, unit: "kg CO₂ / ton captured", category: "Capture" },
        { source: "Reforestation (Mature Tree)", factor: 21.0, unit: "kg CO₂ / tree / year", category: "Capture" },
        { source: "Biochar Application", factor: 2.5, unit: "kg CO₂e / kg biochar", category: "Capture" }
    ]

    for (const factor of factors) {
        await prisma.emissionFactor.upsert({
            where: { source: factor.source },
            update: {},
            create: factor,
        })
    }

    console.log("Seeding complete.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
