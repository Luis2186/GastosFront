import { SubCategorie } from "./SubCategorie"

export type Categorie = {
    id: number,
    name: string,
    description: string,
    subCategories: SubCategorie[]
}

