import styled from '@emotion/styled';
import React from 'react';
import { AnimeCollectionMap } from '../../common/interfaces/anime-collection-map.interface';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import { Anime } from '../../common/interfaces/anime.interface';
import SelectCollectionGridItem from '../select-collection-grid-item/select-collection-grid-item.component';

export interface Props {
    collections: {[name: string]: AnimeCollection},
    updateAnimeCollections: (animeCollections: {[name:string]: AnimeCollection}) => void,
    anime: Anime
}

const SelectCollectionGrid: React.FC<Props> = (props) => {
    const StyledCollectionGridItem = styled('div')`
        overflow: hidden;
        box-shadow: 5px 5px 8px 1px #888888;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        border-radius: 7px;
        margin: 0px 10px 20px 10px;
        
        @media (min-width: 320px){
            padding: 0px 10px;
        }
        @media (min-width: 1200px){
            padding: 10px;
        }
    `;

    const StyledCheckbox = styled('input')`
        
        @media (min-width: 320px){
            width: 3vw;
            height: 3vh;
        }
        @media (min-width: 1200px){
            width: 2vw;
            height: 2vh;
        }
    `;
    
    const collections = props.collections;
    const anime: Anime = props.anime;
    const animecollectionmap: {[id:number]: AnimeCollectionMap} = JSON.parse(localStorage.getItem("animecollectionsmap") || "{}")

    let collectionDivList: [JSX.Element] = [<></>];
    const found = (searchedCollectionName: string, animeId: number) => {
        if(!animecollectionmap[animeId]){
            return false;
        }else{
            return animecollectionmap[animeId].collections.find((collectionName) => {
                return collectionName === searchedCollectionName
           })    
        }
    }

    for (let key in collections){
        let collection = collections[key];
        if(!found(collection.name, anime.id)){
            collectionDivList.push(
                <StyledCollectionGridItem className="select-collection-grid-item">
                    <label key={collection.name} id={collection.name}>
                        <StyledCheckbox key={collection.name} id={collection.name} name="collection-grid-item-input" type="checkbox" />
                        <SelectCollectionGridItem collection={collection} updateAnimeCollections={props.updateAnimeCollections}/>
                    </label>
                </StyledCollectionGridItem>
            );
        }
    }

    const StyledCollectionGrid = styled('div')`
        display: grid;
        grid-template-columns: auto auto;
        margin-left: 20px;
        margin-right: 20px;
    `

    return (
        <StyledCollectionGrid className='select-collection-grid'>
            {collectionDivList}
        </StyledCollectionGrid>
    )
};

export default SelectCollectionGrid;