import styled from '@emotion/styled';
import {keyframes} from '@emotion/react';
import React, {useState} from 'react';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import { NewCollectionForm } from './new-collection-form';


export interface Props {
    updateModalStatus: (modalStatus: boolean) => void
    updateAnimeCollections: (animeCollections: {[name:string]: AnimeCollection}) => void
}



const StyledModalWrapper = styled('div')`
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100vw;
height: 100vh;
overflow: auto;
background-color: rgba(0,0,0,0.4);
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
position: relative;
animation: ${SlideFromTop} 0.4s;
padding: 1%;

@media (min-width: 320px){
    margin: 50% auto;
    width: 60vw;
    height: 20vh;
}
@media (min-width: 1200px){
    margin: 2% auto;
    width: 28vw;
    height: 30vh;
}
`;  

const StyledCloseButton = styled('button')`
float: right;
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
height: 100%
`;

const StyledModalTitleText = styled('h3')`
@media (min-width: 320px){
    font-size: 3.5vw;
}
@media (min-width: 1200px){
    font-size: 1.2vw;
}
`
const NewCollection: React.FC<Props> = (props) => {
    return (
        <StyledModalWrapper className='new-collection-modal'>
            <StyledModalBg className='modal-bg'>
                <StyledModalContainer className='modal-container'>
                    <StyledCloseButtonWrapper>
                        <StyledCloseButton className='close-modal-btn' onClick={() => props.updateModalStatus(false)}>X</StyledCloseButton>
                    </StyledCloseButtonWrapper>
                    <StyledModalContentWrapper>
                        <StyledModalTitle className='modal-title' >
                            <StyledModalTitleText>Add New Collection</StyledModalTitleText>
                        </StyledModalTitle>
                        <StyledModalBody className='modal-body'>
                            <NewCollectionForm updateAnimeCollections={props.updateAnimeCollections} updateModalStatus={props.updateModalStatus}/>
                        </StyledModalBody>
                    </StyledModalContentWrapper>
                </StyledModalContainer>
            </StyledModalBg>
        </StyledModalWrapper>
    )
};

export default NewCollection;