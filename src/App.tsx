import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Pages/Home/Home.page"
import CollectionList from './Pages/CollectionList/CollectionList.page';
import Header from './Component/header/header.component';
import {ApolloProvider} from "@apollo/client";
import client from './common/apollo-client';

import AnimeDetail from './Pages/AnimeDetail/AnimeDetail.page';
import CollectionDetail from './Pages/CollectionDetail/CollectionDetail.page';

export interface Props {

}

const Application: React.FunctionComponent<Props> = (props) => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/collection-list" element={<CollectionList/>} />
                    <Route path="anime-detail/:index" element={<AnimeDetail/>}/>
                    <Route path="collection/:name" element={<CollectionDetail/>}/>
                    <Route path="collection/:name/:index" element={<AnimeDetail/>}/>
                    <Route path="/TokopediaAnimeCollection/" element={<Navigate to="/"/>}/>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
};

export default Application;