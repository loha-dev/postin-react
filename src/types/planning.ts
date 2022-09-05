import { MakeGenerics } from "@tanstack/react-location"
type PlanningType = {
    id: string
    title: string
    keywords: string[]
    date: Date
    status: string
    validation: string
    badge: string
    boost: number
    responsible: string
    body: string
}
type LocationGenerics = MakeGenerics<{
    LoaderData: {
        plannings: PlanningType[]
        planning: PlanningType
    }
}>
