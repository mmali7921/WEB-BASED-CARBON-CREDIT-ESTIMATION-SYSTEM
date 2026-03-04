import { auth } from "@/auth"
import { getCarbonEntries } from "@/app/actions/carbon"
import DashboardClient from "./dashboard-client"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  let records: Awaited<ReturnType<typeof getCarbonEntries>> = []
  let error: string | null = null

  try {
    const session = await auth()

    if (!session?.user?.id) {
      error = "You must be signed in to view the dashboard."
    } else {
      try {
        records = await getCarbonEntries()
      } catch (e) {
        console.error("Failed to load dashboard entries", e)
        error = "Could not load dashboard data. Please try again later."
      }
    }
  } catch (e) {
    console.error("Failed to resolve session in dashboard", e)
    error = "Could not verify authentication. Please try signing in again."
  }

  return <DashboardClient dbRecords={records} error={error} />
}
