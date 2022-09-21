import styled from '@emotion/styled';
import React, { useState } from 'react';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import { BodyDiv } from '../../common/styles/page-body-div';
import CollectionGrid from '../../Component/collection-grid/collection-grid.component';
import NewCollection from '../../Component/new-collection-modal/new-collection-modal';

export interface Props {

}

const CollectionList: React.FC<Props> = (props) => {
    const [animeCollections, setAnimeCollections] = useState(JSON.parse(localStorage.getItem('collections') || "{}"));
    const [modalOpened, setModalOpened] = useState(false);
    const updateModalStatus = (modalStatus: boolean) => {
        setModalOpened(modalStatus);
    } 

    const updateAnimeCollections = (animeCollections:{[name:string]: AnimeCollection}) => {
        setAnimeCollections(animeCollections);
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
            font-size: 5vw;
        }
        @media (min-width: 1200px){
            font-size: 2vw;
        }
    `;

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
        &:hover {
            background: #03800b;
            transition-duration: 0.5s;
        }
        
        color: white;
        padding: 10px 20px;
        
        @media (min-width: 320px){
            font-size: 3vw;
        }
        @media (min-width: 1200px){
            font-size: 1.1vw;
        }
    `;

    const StyledAddNewCollection = styled('div') `
        @media (min-width: 320px){
            margin-left: 2vw;
        }
        @media (min-width: 1200px){
            margin-left: 1.5vw;
        }
    `

    return (
        <BodyDiv>
            <TitleDiv>
                <TitleText>Collection List</TitleText>
            </TitleDiv>
            <StyledAddNewCollection>
                <StyledButton  className='openNewCollectionModal' onClick={() => updateModalStatus(true)}>
                + Add New Collection
                </StyledButton>
                {modalOpened && <NewCollection updateModalStatus={updateModalStatus} updateAnimeCollections={updateAnimeCollections}/>}
            </StyledAddNewCollection>
            <br />
            <CollectionGrid collections={animeCollections} updateAnimeCollections={updateAnimeCollections}/>
        </BodyDiv>
    )
};

export default CollectionList;