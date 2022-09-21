import styled from '@emotion/styled';
import React, {useState} from 'react';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import { Anime } from '../../common/interfaces/anime.interface';
import NewCollection from '../new-collection-modal/new-collection-modal';
import SelectCollectionGrid from '../select-collection-grid/select-collection-grid.component';

export interface Props {
    anime: Anime
}

const AddToCollection: React.FC<Props> = (props) => {
    const [animeCollections, setAnimeCollections] = useState(JSON.parse(localStorage.getItem('collections') || "{}"));
    
    const [modalOpened, setModalOpened] = useState(false);
    const updateModalStatus = (modalStatus: boolean) => {
        setModalOpened(modalStatus);
    } 

    const updateAnimeCollections = (animeCollections:{[name:string]: AnimeCollection}) => {
        setAnimeCollections(animeCollections);
    }

    const StyledButton = styled('button')`
        display: flex;
        background-color: #03ac0e;
        border-color: #bdbdbd;
        border-style: solid;
        border-width: 1px;
        border-radius: 10px;
        border-radius = 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 0.8vw;
        &:hover {
            background: #03800b;
            transition-duration: 0.5s;
        }
        color: white;
        padding: 7px 15px;

        @media (min-width: 320px){
            font-size: 2.2vw;
        }
        @media (min-width: 1200px){
            font-size: 0.8vw;
        }
    `;

    const StyledAddNewCollection = styled('div') `
        @media (min-width: 320px){
            margin-left: 2vw;
            margin-bottom: 1.5vh;
        }
        @media (min-width: 1200px){
            margin-left: 1.5vw;
            margin-bottom: 1.5vh;
        }
    `

    return (
        <>
            <StyledAddNewCollection className='new-collection-wrapper'>
                <StyledButton  className='openNewCollectionModal' onClick={() => updateModalStatus(true)}>
                    + Add New Collection
                </StyledButton>
                {modalOpened && <NewCollection updateModalStatus={updateModalStatus} updateAnimeCollections={updateAnimeCollections}/>}
            </StyledAddNewCollection>

            <div className='select-collection-wrapper'>
                <SelectCollectionGrid collections={animeCollections} updateAnimeCollections={updateAnimeCollections} anime={props.anime}/>
            </div>
        </>
        
    )
};

export default AddToCollection;