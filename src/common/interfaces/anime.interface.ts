export interface Anime {
    id: number,
    title: string,
    description?: string,
    genres: [string],
    episodes?: number,
    bannerimage?: string,
    coverimage?: string,
    rating?: number,
    collections?: [string] | []
}