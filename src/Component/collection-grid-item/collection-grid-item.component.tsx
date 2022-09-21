import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimeCollection } from '../../common/interfaces/anime-collection.interface';
import DeleteCollectionModal from '../delete-collection-modal/delete-collection-modal.component';

export interface Props {
    collection: AnimeCollection,
    updateAnimeCollections: (animeCollections: {[name:string]: AnimeCollection}) => void
}

const CollectionGridItem: React.FC<Props> = (props) => {
    // STYLES
    const StyledLink = styled(Link)`
        text-decoration: none;
        color: black;
        margin: 1%;
        padding: 10px;
        overflow: hidden;
        text-align: center;
    `;

    const StyledImg = styled('img')`
        width: 100%;
        height: 30vh;
        object-fit: cover;
        border-radius: 7px;
        @media (min-width: 320px){
            height: 20vh;
        };
        @media (min-width: 1200px){
            height: 30vh;
        };
    `;

    const StyledButton = styled('button')`
        display: flex;
        background-color: #ea212d;
        border-color: #bdbdbd;
        border-style: solid;
        border-width: 1px;
        border-radius: 100px;
        border-radius = 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        &:hover {
            background: #b51922;
            transition-duration: 0.5s;
        }
        word-spacing: 0.2vw;
        padding: 10px 20px;
        color: white;
        @media (min-width: 320px){
            font-size: 3vw;
            margin-bottom: 1vh;
        }
        @media (min-width: 1200px){
            font-size: 1vw;
            margin-bottom: 1vh;
        }
    `;

    const StyledCollectionTitle = styled('h2')`
        text-align: center;
        @media (min-width: 320px){
            font-size: 3.5vw;
        }
        @media (min-width: 1200px){
            font-size: 1.2vw;
        }
    `;

    const StyledDeleteButtonWrapper = styled('div')`
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const collection = props.collection;
    const [modalOpened, setModalOpened] = useState(false);

    const getCollectionImage = () => {
        if (collection.animes.length > 0){
            return collection.animes[0]?.bannerimage;
        }
        return "https://preview.redd.it/d8odt0lnmyj31.jpg?auto=webp&s=eb02efee5c08d18de8de88d6c01197284b19bc1b";
    }

    return (
        <>
            <StyledLink to={"/collection/" + collection.name}>
                <div className='collection-banner-image-wrapper'>
                    <StyledImg alt='collection banner' src={getCollectionImage()}></StyledImg>
                </div>
                <StyledCollectionTitle>{collection.name}</StyledCollectionTitle>
            </StyledLink>
            <div className='delete-collection-wrapper'>
                <StyledDeleteButtonWrapper>
                    <StyledButton onClick={() => setModalOpened(true)}>Delete</StyledButton>
                </StyledDeleteButtonWrapper>
                {modalOpened && <DeleteCollectionModal updateModalStatus={setModalOpened} collection={collection} updateAnimeCollections={props.updateAnimeCollections}/>}
            </div>
        </>
    )
};

export default CollectionGridItem;