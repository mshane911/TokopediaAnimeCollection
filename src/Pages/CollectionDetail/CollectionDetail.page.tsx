import styled from '@emotion/styled';
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import { Anime } from '../../common/interfaces/anime.interface';
import { BodyDiv } from '../../common/styles/page-body-div';
import AnimeGrid from '../../Component/anime-grid/anime-grid.component';

export interface Props {
    
}

const CollectionDetail: React.FC<Props> = (props) => {
    const params = useParams()
    const collectionName = params.name||"";
    const collections = JSON.parse(localStorage.getItem('collections') || "{}")
    const collection: AnimeCollection = collections[collectionName];
    const [animes, setAnimes] = useState(collection.animes);

    const updateAnimes = (newAnimes: [Anime] | []) => {
        setAnimes(newAnimes);
    }

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
                <TitleText>{collection.name} Detail</TitleText>
            </TitleDiv>
            <AnimeGrid animes={animes} from={collection.name} updateAnimes={updateAnimes}/>
        </BodyDiv>
    )
};

export default CollectionDetail;