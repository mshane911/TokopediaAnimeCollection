import styled from '@emotion/styled';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../common/interfaces/anime.interface';
import DeleteAnimeModal from '../delete-anime-modal/delete-anime-modal.component';

export interface Props {
    anime: Anime,
    index: number,
    from?: string,
    updateAnimes?: (animes: [Anime] | []) => void
}

const AnimeGridItem: React.FC<Props> = (props) => {
    const anime = props.anime;
    let from: string;
    let path: string;
    let showDeleteButton: boolean;
    const [modalOpened, setModalOpened] = useState(false);

    if(!props.from){
        from = "home";
        path = "/anime-detail/"
        showDeleteButton = false;
    }else{
        from = props.from;
        path = "/collection/" + from + "/";
        showDeleteButton = true;
    }
    // STYLES
    const StyledImg = styled('img')`
        width: 100%;
        height: 30vh;
        object-fit: cover;
        border-radius: 7px;
        @media (min-width: 320px){
            height: 20vh;
        }
        @media (min-width: 1200px){
            height: 30vh;
        }
    `;

    const StyledLink = styled(Link)`
        text-decoration: none;
        color: black;
    `;

    const GenreWrapper = styled('div')`
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-column-gap: 20px;
        grid-template-rows: 4vh auto;
        grid-row-gap: 20px;
    `;

    const StyledGenre = styled('div')`
        display: flex;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 0.8vw;
        @media (min-width: 320px){
            font-size: 2.2vw;
            border-radius: 4vw;
        }
        @media (min-width: 1200px){
            font-size: 0.8vw;
            border-radius: 5vw;
        }
    `;

    const StyledAnimeTitle = styled('h2')`
        text-align: center;
        @media (min-width: 320px){
            font-size: 3.5vw;
        }
        @media (min-width: 1200px){
            font-size: 1.2vw;
        }
    `;

    const StyledAnimeDesc = styled('p')`
        text-align: justify;
        font-size: 1vw;
        @media (min-width: 320px){
            font-size: 2.5vw;
        }
        @media (min-width: 1200px){
            font-size: 1vw;
        }
    `;

    const StyledDeleteButtonWrapper = styled('div')`
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const StyledButton = styled('button')`
        display: flex;
        background-color: #ea212d;
        border-color: #bdbdbd;
        border-style: solid;
        border-width: 1px;
        border-radius: 100px;
        border-radius = 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        &:hover {
            background: #b51922;
            transition-duration: 0.5s;
        }
        word-spacing: 0.2vw;
        padding: 10px 20px;
        color: white;
        @media (min-width: 320px){
            font-size: 3vw;
            margin-bottom: 1vh;
        }
        @media (min-width: 1200px){
            font-size: 1vw;
            margin-bottom: 1vh;
        }
    `;

    return (
        <>
            <StyledLink to={path + (props.index - 1)}>
                <StyledAnimeTitle>{anime.title}</StyledAnimeTitle>
                <div className='anime-banner-image-wrapper'>
                    <StyledImg alt="Anime Banner" src={anime.bannerimage}></StyledImg>
                </div>
                <StyledAnimeDesc>{anime.description}</StyledAnimeDesc>
                <br/>
                <StyledAnimeDesc><b>Number of Episodes: </b>{anime.episodes}</StyledAnimeDesc>
                <StyledAnimeDesc><b>Genre:</b></StyledAnimeDesc> 
                <GenreWrapper> 
                    {
                        anime.genres.map((genre)=>{
                            return <StyledGenre key={genre}>{genre}</StyledGenre>
                        })
                    }
                </GenreWrapper>
                <StyledAnimeDesc><b>Rating: </b>{anime.rating}</StyledAnimeDesc>
            </StyledLink>
            {showDeleteButton && <div className='delete-collection-wrapper'>
                <StyledDeleteButtonWrapper>
                    <StyledButton onClick={() => setModalOpened(true)}>Delete</StyledButton>
                </StyledDeleteButtonWrapper>
                {modalOpened && <DeleteAnimeModal updateModalStatus={setModalOpened} collectionName={from} anime={anime} updateAnimes={props.updateAnimes!}/>}
            </div>}
        </>
    )   
};

export default AnimeGridItem;