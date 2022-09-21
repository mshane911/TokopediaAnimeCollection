import styled from '@emotion/styled';
import React, {useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import { AnimeCollectionMap } from '../../common/interfaces/anime-collection-map.interface';
import { Anime } from '../../common/interfaces/anime.interface';
import { BodyDiv } from '../../common/styles/page-body-div';
import AddToCollectionModal from '../../Component/add-to-collection-modal/add-to-collection-modal.component';

interface Props {
}


const AnimeDetail: React.FC<Props> = (props) => {
    const params = useParams();
    const index = params.index;
    const intIndex = Number.parseInt(index!);

    let from: string;
    if(params.name){
        from = params.name;
    }else{
        from = "home"
    }

    let animes: [Anime];
    if(from !== "home"){
        animes = JSON.parse(localStorage.getItem("collections") || "{}")[from]['animes'];
    }else{
        animes = JSON.parse(localStorage.getItem("animes") || "[]");
    }
    const anime = animes[intIndex]

    const animeCollectionMap: AnimeCollectionMap = JSON.parse(localStorage.getItem("animecollectionsmap") || "{}")[anime.id]
    

    const path: string = from === 'home'? "/anime-detail/" : "/collection/" + from + "/";

    // NAVIGATION STYLES
    const StyledNavBar = styled('nav')`
        display: grid;
        grid-template-columns: auto auto;

        @media (min-width: 320px){
            padding-left: 1vw;
            padding-right: 1vw;
            padding-top: 3vh;
            padding-bottom: 3vh;
        }
        @media (min-width: 1200px){
            padding-left: 1vw;
            padding-right: 1vw;
            padding-top: 3vh;
            padding-bottom: 5vh;
        }
    `;

    const StyledPrevNav = styled('div')`
        text-align: left;
    `;
    const StyledNavLink = styled(Link)`
        text-decoration: none;
        color: white;
        &:hover {
            background-color: #005906;
            transition-duration: 0.5s;
        }
        background-color: #428f47;
        padding: 10px 20px;
        border-radius: 7px;
        
        @media (min-width: 320px){
            font-size: 3vw;
        }
        @media (min-width: 1200px){
            font-size: 1.1vw;
        }
    `;

    const StyledNextNav = styled('div')`
        text-align: right;
    `;

    const NavBar = () => {
        if(intIndex > 0 && intIndex < animes.length - 1){
            return (
                <StyledNavBar>
                    <StyledPrevNav>
                        <StyledNavLink to={path + (intIndex - 1)} onClick={() => {updateModalStatus(false)}}>Previous</StyledNavLink>
                    </StyledPrevNav>
                    <StyledNextNav>
                        <StyledNavLink to={path + (intIndex + 1)} onClick={() => {updateModalStatus(false)}}>Next</StyledNavLink>
                    </StyledNextNav>
                </StyledNavBar>
            )
        }else if(animes.length === 1){
            return (
                <></>
            )
        }
        else if(intIndex === 0){
            return (
                <StyledNavBar>
                    <div>&nbsp;</div>
                    <StyledNextNav>
                        <StyledNavLink to={path + (intIndex + 1)} onClick={() => {updateModalStatus(false)}}>Next</StyledNavLink>
                    </StyledNextNav>
                </StyledNavBar>
            )
        }else if(intIndex === animes.length - 1){
            return (
                <StyledNavBar>
                    <StyledPrevNav>
                        <StyledNavLink to={path + (intIndex - 1)} onClick={() => {updateModalStatus(false)}}>Previous</StyledNavLink>
                    </StyledPrevNav>
                    <div>&nbsp;</div>
                </StyledNavBar>
            )
        }else{
            return (
                <></>
            )
        }
    }

    const Collections = () => {
        if(animeCollectionMap){
            return (
                <>
                <StyledAnimeInfo><b>Collections</b></StyledAnimeInfo> 
                <PointsWrapper> 
                    {
                        animeCollectionMap.collections.map((collectionName: string)=>{
                            return (
                                <StyledCollections key={collectionName}>    
                                    <StyledLink to={"/collection/" + collectionName}>{collectionName}</StyledLink>
                                </StyledCollections>
                            )
                        })
                    }
                    <StyledButton  className='openAddToCollectionModal' onClick={() => updateModalStatus(true)}>
                        +
                    </StyledButton>
                </PointsWrapper>
                </>
            )
        }else{
            return (
                <>
                <StyledAnimeInfo><b>Collections</b></StyledAnimeInfo>
                <PointsWrapper>
                    <StyledButton  className='openAddToCollectionModal' onClick={() => updateModalStatus(true)}>
                        Add to Collection
                    </StyledButton>
                </PointsWrapper>
                </>
            )
        }
    }
    

    const TitleDiv = styled('div')`
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${anime.bannerimage});
        background-size: cover;
        @media (min-width: 320px){
            min-height: 25vh;
        }
        @media (min-width: 1200px){
            min-height: 45vh;
        }
    `;

    const TitleText = styled('h2')`
        text-transform: uppercase;
        color: white;
        text-align: center;
        
        @media (min-width: 320px){
            font-size: 5vw;
            letter-spacing: 1vw;
            word-spacing: 1.2vw;
        }
        @media (min-width: 1200px){
            font-size: 2vw;
            letter-spacing: 0.6vw;
            word-spacing: 0.8vw;
        }
    `;

    const StyledLink = styled(Link)`
        text-decoration: none;
        color: black;
    `;

    const PointsWrapper = styled('div')`
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-column-gap: 20px;
        grid-template-rows: 4vh auto;
        grid-row-gap: 20px;
        font-size: 0.9vw;
        @media (min-width: 320px){
            width: 90%;
        }
        @media (min-width: 1200px){
            width: 20%;
        }
    `;

    const StyledPoints = styled('div')`
        display: flex;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        border-radius: 100px;
        border-radius = 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        @media (min-width: 320px){
            font-size: 2.8vw;
        }
        @media (min-width: 1200px){
            font-size: 0.8vw;
        }
    `;

    const StyledCollections = styled('div')`
        display: flex;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        border-radius: 100px;
        border-radius = 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        background: white;
        &:hover {
            background: #ebebeb;
            transition-duration: 0.5s;
        }
        @media (min-width: 320px){
            font-size: 2.8vw;
        }
        @media (min-width: 1200px){
            font-size: 0.8vw;
        }
    `;

    const StyledAnimeDesc = styled('p')`
        text-align: justify;
        font-size: 0.9vw;
        @media (min-width: 320px){
            font-size: 2.8vw;
        }
        @media (min-width: 1200px){
            font-size: 0.9vw;
        }
    `;

    const StyledAnimeInfo = styled('p')`
        font-size: 0.9vw;
        @media (min-width: 320px){
            font-size: 2.8vw;
        }
        @media (min-width: 1200px){
            font-size: 0.9vw;
        }
    `;

    const ContentWrapper = styled('div')`
        margin: 20px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    `;

    const StyledButton = styled('button')`
        display: flex;
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        border-radius: 100px;
        border-radius = 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 0.8vw;
        background: white;
        &:hover {
            background: #ebebeb;
            transition-duration: 0.5s;
        }
        @media (min-width: 320px){
            font-size: 2.8vw;
        }
        @media (min-width: 1200px){
            font-size: 0.8vw;
        }
    `;

    const [modalOpened, setModalOpened] = useState(false);
    const updateModalStatus = (modalStatus: boolean) => {
        setModalOpened(modalStatus);
    } 
    return (
        <BodyDiv>
            <TitleDiv>
                <TitleText>{anime.title}</TitleText>
            </TitleDiv>
            <ContentWrapper>
                <StyledAnimeDesc>{anime.description}</StyledAnimeDesc>
                <StyledAnimeInfo><b>Number of Episodes: </b>{anime.episodes}</StyledAnimeInfo>
                <Collections/>
                {modalOpened && <AddToCollectionModal updateModalStatus={updateModalStatus} anime={anime!}/>}
                <StyledAnimeInfo><b>Genre</b></StyledAnimeInfo> 
                <PointsWrapper> 
                    {
                        anime?.genres.map((genre: string)=>{
                            return <StyledPoints key={genre}>{genre}</StyledPoints>
                        })
                    }
                </PointsWrapper>
                <StyledAnimeInfo><b>Rating: </b>{anime.rating}</StyledAnimeInfo>
                <br />
            </ContentWrapper>
            <NavBar/>
        </BodyDiv>
    );
};

export default AnimeDetail;