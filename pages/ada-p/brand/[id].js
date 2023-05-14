import React, {useEffect, useState} from 'react'
import Head from "next/head";
import logo from "../../../assets/images/logo.svg";
import grid from "../../../assets/images/feather-grid.svg";
import userVector from "../../../assets/images/feather-user.svg";
import edit from "../../../assets/images/edit.svg";
import fruits from "../../../assets/images/fruits.png";
import {getCookies} from 'cookies-next'

import {ResponsiveGeoMap} from "@nivo/geo";
import {ResponsiveGeoMapCanvas} from "@nivo/geo";
import {ResponsiveChoropleth} from "@nivo/geo";
import countries from "../../../utils/world_countries.json";

import us from "../../../utils/us_map";
import france from "../../../utils/france";

import test from "../../../utils/france";
import FloatCard from "../../../components/FloatCard/FloatCard";
import SignedInHeader from "../../../components/SignedInHeader/SignedInHeader";
import SignedInFooter from "../../../components/SignedInFooter/SignedInFooter";
import {privateRoute} from "../../../components/privateRoute";
import NivoMap from "../../../components/choropleth_map/nivo_map";
import {fetchBrands, fetchNotes, getBrand, getNote, getNoteScore} from "../../../api";
import Carousel from "../../../components/Carousel/Carousel";

import _ from 'lodash'



function Brand(props) {

    const handleScroll = (e) => {

        console.log('scroll')
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header-content").classList.add("header-content-small");
            document.getElementById("header-logo").classList.add("logo");
        } else {
            document.getElementById("header-content").classList.remove("header-content-small");
            document.getElementById("header-logo").classList.remove("logo");
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        console.log(props.brand) //return window.removeEventListener('scroll', handleScroll);

    }, [])


    return props.brand ?
        <div style={{height: '100%'}}>
        <SignedInHeader title='Note'/>
        <div style={{height: '12%'}}>
        </div>
        <NivoMap note={props.brand} data={props.score} bestMatch={props.bestMatch.results}/>
        <Carousel cards={props.bestMatch.results}/>
        <SignedInFooter/>
    </div> :

        <h1>no brand with this id </h1>

}

Brand.getInitialProps = async (ctx) => {

    console.log('server side')
    let noteId = ctx.query.id
    console.log(noteId)
    const brand = await getBrand(noteId, getCookies(ctx, 'authToken'))
    const bestMatch = await fetchNotes({offset: 0, limit: 10, token: getCookies(ctx, 'authToken')})
    const score = await getNoteScore(noteId, 2010, getCookies(ctx, 'authToken'))
console.log(brand)
    return {brand, bestMatch, score}
}

export default (Brand)


