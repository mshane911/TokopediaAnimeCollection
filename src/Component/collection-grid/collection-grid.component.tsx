import styled from '@emotion/styled';
import React from 'react';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import CollectionGridItem from '../collection-grid-item/collection-grid-item.component';

export interface Props {
    collections: {[name: string]: AnimeCollection},
    updateAnimeCollections: (animeCollections: {[name:string]: AnimeCollection}) => void
}

const CollectionGrid: React.FC<Props> = (props) => {
    // STYLES
    const StyledCollectionGrid = styled('div')`
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

    const StyledCollectionGridItem = styled('div')`
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
    
    const collections = props.collections;

    let collectionDivList: [JSX.Element] = [<></>];

    for (let key in collections){
        let collection = collections[key];
        collectionDivList.push(
            <StyledCollectionGridItem key={collection.name} className="collection-grid-item">
                <CollectionGridItem collection={collection} updateAnimeCollections={props.updateAnimeCollections}/>
            </StyledCollectionGridItem>
        );
    }

    return (
        <StyledCollectionGrid className='collection-grid'>
            {collectionDivList}
        </StyledCollectionGrid>
    )
};

export default CollectionGrid;