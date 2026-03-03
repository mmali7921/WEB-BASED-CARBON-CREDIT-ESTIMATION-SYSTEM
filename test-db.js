const { PrismaClient } = require('@prisma/client')

async function test() {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()
    if (users.length > 0) {
        const user = users[0]
        try {
            const entry = await prisma.carbonEntry.create({
                data: {
                    userId: user.id,
                    energyUsage: 100,
                    distance: 0,
                    totalCarbon: 100,
                    date: new Date(),
                }
            })
            console.log("Created successfully:", entry)
        } catch (err) {
            console.error("Error creating:", err)
        }
    } else {
        console.log("No users found")
    }
}
test()
