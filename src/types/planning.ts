import { MakeGenerics } from "@tanstack/react-location"
type PlanningType = {
    id: string
    title: string
    keywords: string[]
    body: string
    date: Date //from - to
    status: string
    validation: string
    badge: string //etiquette
    boost?: number
    responsible?: string
}
type LocationGenerics = MakeGenerics<{
    LoaderData: {
        plannings: PlanningType[]
        planning: PlanningType
    }
}>
