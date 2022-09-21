import styled from '@emotion/styled';
import React from 'react';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';

export interface Props {
    collection: AnimeCollection,
    updateAnimeCollections: (animeCollections: {[name:string]: AnimeCollection}) => void
}

const SelectCollectionGridItem: React.FC<Props> = (props) => {
    const collection = props.collection;

    const getCollectionImage = () => {
        if (collection.animes.length > 0){
            return collection.animes[0]?.bannerimage;
        }
        return "/media/collection-default-image.jpg";
    }

    const StyledBannerImage = styled('img')`
        width: 100%;
        height: 15vh;
        object-fit: cover;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        border-radius: 7px;
    `;

    const StyledTitle = styled('h4')`
        text-align: center;
        
        @media (min-width: 320px){
            font-size: 2vw;
        }
        @media (min-width: 1200px){
            font-size: 0.8vw;
        }
    `

    return (
        <>
            <div>
                <StyledBannerImage alt='collection banner' src={getCollectionImage()}></StyledBannerImage>
            </div>
            <StyledTitle>{collection.name}</StyledTitle>
        </>
    )
};

export default SelectCollectionGridItem;