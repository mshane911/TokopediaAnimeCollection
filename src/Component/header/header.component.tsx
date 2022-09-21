import styled from '@emotion/styled'
import React from 'react'
import {NavLink, Link} from 'react-router-dom'

const Header: React.FC = () => {
    // const 

    const TokopediaLogo = styled('h2')`
        color: #03ac0e;
        @media (min-width: 320px){
            font-size: 3.5vw;
        }
        @media (min-width: 1200px){
            font-size: 2vw;
        }
    `;

    const StyledLink = styled(Link)`
        text-decoration: none;
    `;

    const StyledHeader = styled('header')`
        display: grid;
        padding: 0 0px 0px 20px;
        box-shadow: 0px 2px 10px 1px #888888;
        position: fixed;
        width: 100%;
        background-color: white;
        top: 0;

        @media (min-width: 320px){
            grid-template-columns: auto auto;
        }
        @media (min-width: 1200px){
            grid-template-columns: 75% 25%;
        }
    `

    const NavMenu = styled('nav')`
        padding-left: 0;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-column-gap: 1.5vw;
        justify-content: center;
        align-items: center;
        text-align: right;
        @media (min-width: 320px){
            padding-right: 5vh;
        }
        @media (min-width: 1200px){
            padding-right: 10vh;
        }
    `;

    const StyledNavLink = styled(NavLink)`
        color: black;
        &:hover {
            color: #03ac0e;
            transition-duration: 0.5s;
        }
        $:active {
            color: #03ac0e;
        }
        text-decoration: none;
        
        @media (min-width: 320px){
            font-size: 3vw;
        }
        @media (min-width: 1200px){
            font-size: 1.2vw;
        }
    `;



    return (
        <StyledHeader>
            <StyledLink to="/"><TokopediaLogo>tokopedia</TokopediaLogo></StyledLink>
            <NavMenu>
                <StyledNavLink to="/">Home</StyledNavLink>
                <StyledNavLink to="/collection-list">Collection List</StyledNavLink>
            </NavMenu>
        </StyledHeader>
    )
}

export default Header;