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
    query GetAnimes($id: Int) {
      Media(id: $id, type:ANIME){
        id
        title{
          userPreferred
        }
        description
        genres
        episodes
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
        averageScore
      }
    }
`

export const useGetAnime = (id:Number): Anime | undefined => {
    const {data} = useQuery(GET_ANIMES, {
        variables:{
            id: id
        }
    })

    var anime = data?.Media
    var animeCleaned:Anime|undefined;
    if(anime){
      animeCleaned = {
        id: anime.id,
        title: anime.title.userPreferred,
        description: anime.description,
        genres: anime.genres,
        episodes: anime.episodes,
        bannerimage: anime.bannerImage,
        coverimage: anime.coverImage.large,
        rating: anime.averageScore,
        collections: []
      }
    }

    return animeCleaned;
}