import React from 'react';
import { Anime } from '../../common/interfaces/anime.interface';
import AnimeGridItem from '../anime-grid-item/anime-grid-item.component';
import styled from '@emotion/styled';

export interface Props {
    animes: Anime[],
    from?: string,
    updateAnimes?: (animes: [Anime] | []) => void
}

const AnimeGrid: React.FC<Props> = (props) => {
    const animes = props.animes;
    var animeIndexCounter = 0;
    const StyledAnimeGrid = styled('div')`
        display: grid;
        margin-left: 20px;
        margin-right: 20px;

        @media (min-width: 320px){
            grid-template-columns: auto;
        }
        @media (min-width: 1200px){
            grid-template-columns: auto auto;
        }
    `;

    const StyledAnimeGridItem = styled('div')`
        box-shadow: 5px 5px 8px 1px #888888;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        border-radius: 7px;
        margin: 1%;
        padding: 20px;
        max-width: 100%;
        overflow: hidden;
    `;
    return (
        <StyledAnimeGrid className='anime-grid'>
            {animes.map((anime) => {
                animeIndexCounter += 1
                return (
                    <StyledAnimeGridItem key={anime.id} className='anime-grid-item'>
                        <AnimeGridItem anime={anime} index={animeIndexCounter} from={props.from} updateAnimes={props.updateAnimes}/>
                    </StyledAnimeGridItem>
                )
            })}
        </StyledAnimeGrid>
    )
};

export default AnimeGrid;