import styled from "@emotion/styled";
import {Form, Button} from "react-bootstrap";
import React, {useState} from 'react';
import { AnimeCollection } from "../../common/interfaces/anime-collection.interface";

export interface Props {
    updateModalStatus: (modalStatus: boolean) => void
    updateAnimeCollections: (animeCollections: {[name:string]: AnimeCollection}) => void
}
const StyledForm = styled(Form)`
display: flex;
justify-content: space-around;
flex-direction: column;
height: 100%;
`
const StyledFormGroup = styled(Form.Group)`
display: grid;
grid-template-columns: auto auto;
grid-column-gap: 1.2vw;
`;
const StyledFormLabel = styled(Form.Label)`
display: flex;
align-items: center;
justify-content: center;

@media (min-width: 320px){
    font-size: 2.2vw;
}
@media (min-width: 1200px){
    font-size: 1vw;
}
`;

const StyledFormField = styled(Form.Control)`
border-color: #dbdbdb;
border-style: solid;
border-radius: 7px;
padding: 10px 20px;

@media (min-width: 320px){
    font-size: 2.2vw;
}
@media (min-width: 1200px){
    font-size: 1vw;
}
`;

const StyledFormButtonWrapper = styled('div')`
display: flex;
align-items: center;
justify-content: center;
`;

const StyledFormButton = styled(Button)`
border-style: solid;
border-radius: 100px;
border-width: 1px;
border-color: #dbdbdb;

background-color: #03ac0e;
padding: 10px 20px;

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

export const NewCollectionForm: React.FC<Props> = (props) => {
    const [collectionExists, setCollectionExists] = useState(false);
    const [name, setName] = useState("")
    
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let collections: {[name:string]: AnimeCollection} = JSON.parse(localStorage.getItem('collections') || "{}")
        if(collections[name]){
            // Collection Exists
            setCollectionExists(true);
        }else{
            setCollectionExists(false);
            collections[name] = {
                name: name,
                animes: []
            }
            localStorage.setItem('collections', JSON.stringify(collections));
            props.updateAnimeCollections(collections);
            props.updateModalStatus(false);

        }
    }
    

    
    return(
        <>
        <StyledForm onSubmit={(e) => handleSubmit(e)}>
            <StyledFormGroup controlId="add-new-collection-name">
                <StyledFormLabel>Collection Name </StyledFormLabel>
                <StyledFormField 
                    type="text"
                    name="new-collection-name"
                    value={name} 
                    onChange={(e) => {
                        e.preventDefault();
                        setName(e.target.value);
                    }}
                    placeholder="Collection Name"
                />
            </StyledFormGroup>
            <StyledFormButtonWrapper>
                <StyledFormButton className="mt-3" variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>Add Collection</StyledFormButton>  
            </StyledFormButtonWrapper>
        </StyledForm>
        {collectionExists && <p>Collection Exists</p>}
        </>
    )
}