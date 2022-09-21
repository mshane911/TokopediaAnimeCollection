import {gql, useQuery} from "@apollo/client"
import { Anime } from "../../common/interfaces/anime.interface"

interface queryResultItemType {
    id: number,
    title: {userPreferred: string},
    description: string,
    genres: [string],
    episodes: number,
    bannerImage: string,
    coverImage:{
        large: string
    }
    averageScore: number
}

const GET_ANIMES = gql`
    query GetAnimes($perPage: Int) {
        Page (perPage: $perPage) {
          media{
            id
            title {
              userPreferred
            }
            episodes
            genres
            description
            bannerImage
            coverImage{
                large
            }
            averageScore
          }
        }
      }
`

export const useGetAnimes = (): Anime[] | undefined => {
    const {data} = useQuery(GET_ANIMES, {
        variables:{
            perPage: 10
        }
    })
    var dataRaw = data?.Page?.media
    var dataCleaned:Anime[] = [];
    if(dataRaw){
        dataRaw.map((anime: queryResultItemType) => {
            var currentCleanData: Anime = {
                id: anime.id,
                title: anime.title.userPreferred,
                description: anime.description,
                genres: anime.genres,
                episodes: anime.episodes,
                bannerimage: anime.bannerImage,
                coverimage: anime.coverImage.large,
                rating: anime.averageScore,
                collections: []
            };

            dataCleaned?.push(currentCleanData)
            return dataCleaned;
        })
    }
    localStorage.setItem("animes", JSON.stringify(dataCleaned)); // Save in local storage
    return dataCleaned;
}