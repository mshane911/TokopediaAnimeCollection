import {keyframes} from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { AnimeCollectionMap } from '../../common/interfaces/anime-collection-map.interface';
import { Anime } from '../../common/interfaces/anime.interface';
import AddToCollection from '../add-to-collection/add-to-collection';

export interface Props {
    updateModalStatus: (modalStatus: boolean) => void,
    anime: Anime
}



const AddToCollectionModal: React.FC<Props> = (props) => {

    const handleAddButton = () => {
        const selector: string = 'collection-grid-item-input'
        const inputs = Array.from(document.getElementsByName(selector)) as [HTMLInputElement]
        

        const animesCollectionMap: {[id:number]: AnimeCollectionMap} = JSON.parse(localStorage.getItem('animecollectionsmap') || "{}")
        const collections = JSON.parse(localStorage.getItem('collections') || "{}")
        
        
        inputs.forEach((input) => {
            if(input.checked){
                collections[input.id].animes.push(props.anime);
                if(animesCollectionMap[props.anime.id]){
                    animesCollectionMap[props.anime.id].collections.push(collections[input.id].name);
                }else{
                    animesCollectionMap[props.anime.id] = {
                        id: props.anime.id,
                        collections: [collections[input.id].name]
                    }
                }
                
            }
        })
        localStorage.setItem('animecollectionsmap', JSON.stringify(animesCollectionMap))
        localStorage.setItem('collections', JSON.stringify(collections));
        props.updateModalStatus(false);
    }

    const StyledModalWrapper = styled('div')`
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    `;

    const StyledModalBg = styled('div')`
        width: 100%;
        height: 100%;
    `; 

    const SlideFromTop = keyframes`
        from {top: -300px; opacity: 0}
        to {top: 0; opacity: 1}
    `;

    const StyledModalContainer = styled('div') `
        border-color: #dbdbdb;
        border-style: solid;
        border-radius: 7px;
        box-shadow: 5px 5px 8px 1px #888888;
        background-color: white;
        margin: 2% auto;
        position: relative;
        animation: ${SlideFromTop} 0.4s;
        padding: 1%;

        @media (min-width: 320px){
            margin: 25% auto;
            width: 80vw;
            height: 65vh;
        }
        @media (min-width: 1200px){
            margin: 2% auto;
            width: 40vw;
            height: 75vh;
        }
    `;  

    const StyledCloseButton = styled('button')`
        float: right;
        font-size: 1.5vw;
        border: none;
        background: none;
        color: #aaa;
        &:hover,
        &:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
            transition-duration: 0.5s;
        }
        @media (min-width: 320px){
            font-size: 4.5vw;
        }
        @media (min-width: 1200px){
            font-size: 1.5vw;
        }
    `;

    const StyledCloseButtonWrapper = styled('div')`
        height: auto;
    `;

    const StyledModalContentWrapper = styled('div')`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    `;
    const StyledModalTitle = styled('div')`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    `;
    const StyledModalBody = styled('div')`
        height: 100%;
        width: 100%;
        overflow: scroll;
    `;
    
    const StyledModalTitleText = styled('h3')`
        @media (min-width: 320px){
            font-size: 3.5vw;
        }
        @media (min-width: 1200px){
            font-size: 1.2vw;
        }
    `

    const StyledModalFooter = styled('div')`
        width: 100%;
        margin-top: 1.5vh;
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 1.2vw;
    `
    const StyledButtonWrapper = styled('div')`
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const StyledAddButton = styled('button')`
        border-style: solid;
        border-radius: 100px;
        border-width: 1px;
        border-color: #dbdbdb;

        background-color: #03ac0e;
        padding: 10px 0;
        width: 40%;

        font-size: 0.9vw;
        color: white;

        &:hover{
            background-color: #03800b;
            transition-duration: 0.5s;
        }
        @media (min-width: 320px){
            font-size: 2.2vw;
        }
        @media (min-width: 1200px){
            font-size: 0.9vw;
        }
    `;

    const StyledCancelButton = styled('button')`
        border-style: solid;
        border-radius: 100px;
        border-width: 1px;
        border-color: #dbdbdb;

        background-color: #ea212d;
        padding: 10px 0;
        width: 40%;

        font-size: 0.9vw;
        color: white;

        &:hover{
            background-color: #b51922;
            transition-duration: 0.5s;
        }
        @media (min-width: 320px){
            font-size: 2.2vw;
        }
        @media (min-width: 1200px){
            font-size: 0.9vw;
        }
    `;

    return (
        <StyledModalWrapper className='add-to-collection-modal'>
            <StyledModalBg className='modal-bg'>
                <StyledModalContainer className='modal-container'>
                    <StyledCloseButtonWrapper>
                        <StyledCloseButton className='close-modal-btn' onClick={() => props.updateModalStatus(false)}>X</StyledCloseButton>
                    </StyledCloseButtonWrapper>
                    <StyledModalContentWrapper>
                        <StyledModalTitle className='modal-title' >
                            <StyledModalTitleText>Add to Collection</StyledModalTitleText>
                        </StyledModalTitle>
                        <StyledModalBody className='modal-body'>
                            <AddToCollection anime={props.anime}/>
                        </StyledModalBody>
                        <StyledModalFooter className='modal-footer'>
                            <StyledButtonWrapper>
                                <StyledCancelButton onClick={() => props.updateModalStatus(false)}>Cancel</StyledCancelButton>
                            </StyledButtonWrapper>
                            <StyledButtonWrapper>
                                <StyledAddButton onClick={handleAddButton}>Add</StyledAddButton>
                            </StyledButtonWrapper>
                        </StyledModalFooter>
                    </StyledModalContentWrapper>
                </StyledModalContainer>
            </StyledModalBg>
        </StyledModalWrapper>
    )
};

export default AddToCollectionModal;