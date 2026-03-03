"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveCarbonEntry(data: {
    energyUsage: number
    distance: number
    totalCarbon: number
    date?: string | Date
}) {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("Must be logged in to save carbon entry")
    }

    const entry = await prisma.carbonEntry.create({
        data: {
            userId: session.user.id,
            energyUsage: data.energyUsage,
            distance: data.distance,
            totalCarbon: data.totalCarbon,
            date: data.date ? new Date(data.date) : new Date(),
        },
    })

    revalidatePath("/dashboard")
    return entry
}

export async function getCarbonEntries() {
    const session = await auth()

    if (!session?.user?.id) {
        return []
    }

    const entries = await prisma.carbonEntry.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            date: "desc",
        },
    })

    return entries
}

