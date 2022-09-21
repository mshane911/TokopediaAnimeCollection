import styled from '@emotion/styled';
import React from 'react';
import { BodyDiv } from '../../common/styles/page-body-div';
import AnimeGrid from '../../Component/anime-grid/anime-grid.component';
import { useGetAnimes } from '../../hooks/animes/useGetAnimes';


export interface Props {

}


const Home: React.FC<Props> = (props) => {
    const animes = useGetAnimes()

    // STYLES
    const TitleDiv = styled('div')`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fffff;
        @media (min-width: 320px){
            min-height: 20vh;
        }
        @media (min-width: 1200px){
            min-height: 40vh;
        }
    `;

    const TitleText = styled('h2')`
        color: #03ac0e;
        @media (min-width: 320px){
            font-size: 4vw;   
        }
        @media (min-width: 1200px){
            font-size: 2vw;
        }
    `;
    

    return (
        <BodyDiv>
            <TitleDiv>
                <TitleText>Anime List</TitleText>
            </TitleDiv>

            <AnimeGrid animes={animes?.slice(0, 10) || []}/>
        </BodyDiv>
    )
};

export default Home;