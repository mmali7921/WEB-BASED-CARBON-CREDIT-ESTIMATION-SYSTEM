import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Start seeding emission factors...")

    const factors = [
        // Emissions
        { source: "Electricity (Grid Average)", factor: 0.4, unit: "kg CO₂e / kWh", category: "Emission" },
        { source: "Natural Gas", factor: 0.2, unit: "kg CO₂e / kWh", category: "Emission" },
        { source: "Gasoline (Petrol)", factor: 2.3, unit: "kg CO₂e / liter", category: "Emission" },
        { source: "Diesel fuel", factor: 2.7, unit: "kg CO₂e / liter", category: "Emission" },
        { source: "Air Travel (Short Haul)", factor: 0.25, unit: "kg CO₂e / pkm", category: "Emission" },
        { source: "Air Travel (Long Haul)", factor: 0.15, unit: "kg CO₂e / pkm", category: "Emission" },

        // Captured / Reductions
        { source: "Direct Air Capture (DAC)", factor: 900.0, unit: "kg CO₂ / ton captured", category: "Capture" },
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
