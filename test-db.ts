import { prisma } from "../lib/prisma"

// Just test if we can query the users
async function test() {
    const users = await prisma.user.findMany()
    console.log("Users:", users)

    if (users.length > 0) {
        const user = users[0]
        console.log("Trying to create carbon entry for user", user.id)
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
        console.log("No users found in the DB.")
    }
}

test()
