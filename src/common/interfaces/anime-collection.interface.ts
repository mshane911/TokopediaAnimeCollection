import { Anime } from "./anime.interface";

export interface AnimeCollection {
    name: string,
    animes: [Anime] | []
}