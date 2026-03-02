const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
    const factors = [
        // Emissions
        { source: "Electricity", factor: 0.82, unit: "kg CO₂ per kWh", category: "Emission" },
        { source: "Petrol", factor: 2.31, unit: "kg CO₂ per liter", category: "Emission" },
        { source: "Diesel", factor: 2.68, unit: "kg CO₂ per liter", category: "Emission" },
        { source: "LPG", factor: 1.51, unit: "kg CO₂ per kg", category: "Emission" },

        // Reductions
        { source: "Tree Absorption", factor: 21.00, unit: "kg CO₂ per year", category: "Reduction" },

        // Captures
        { source: "Direct Air Capture (DAC)", factor: 1.00, unit: "kg CO₂ removed per kg captured", category: "Capture" },
        { source: "Carbon Capture & Storage (CCS)", factor: 1.00, unit: "kg CO₂ removed per kg captured", category: "Capture" },
    ]

    console.log("Seeding emission factors...")
    for (const f of factors) {
        await prisma.emissionFactor.upsert({
            where: { source: f.source },
            update: f,
            create: f,
        })
    }
    console.log("Seeding finished.")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
