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
import {fetchNotes, getNote, getNoteScore} from "../../../api";
import Carousel from "../../../components/Carousel/Carousel";

import _ from 'lodash'


function Note(props) {

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
        console.log(props.note) //return window.removeEventListener('scroll', handleScroll);

    }, [])

    return <div style={{height: '100%'}}>
        <SignedInHeader type={0} title='Note'/>

        <div style={{height: '12%'}}>

     {/*       <FloatCard>


                <div style={{flexBasis: '45%'}}>
                    <img style={{padding: 15, width: '80%', height: '100%', objectFit: 'cover'}}
                         src={props.note.images[2].image}
                         alt=""/>
                </div>
                <div style={{flexBasis: '55%', justifyContent: 'space-between'}} className="flexColumn">
                    <div className={"grayText"}>CITRUS SMELLS</div>
                    <div style={{justifyContent: 'space-between'}} className={'bigText flexRow'}>
                        <span>{props.note.name}  </span>
                        <div className={'btn_note '} style={{}}>{props.note.type}</div>
                    </div>
                    <hr style={{width: '100%'}}/>
                    <div className={'smallText'}>{props.note.profile}
                    </div>
                    <div className={'smallText'}> {props.note.profile}
                    </div>

                    <div className={'grayText'} style={{alignSelf: 'flex-end'}}>Load more</div>
                </div>

            </FloatCard>
     */}
        </div>
        <NivoMap note={props.note} data={props.score} />
        <SignedInFooter/>
    </div>

}

Note.getInitialProps = async (ctx) => {


    let noteId = ctx.query.id
    console.log(noteId , 'note id')
    const note = await getNote(noteId, getCookies(ctx, 'authToken'))
    const bestMatch = await fetchNotes({offset: 0, limit: 10, token: getCookies(ctx, 'authToken')})
    const score = await getNoteScore(noteId, 2010, getCookies(ctx, 'authToken'))

    return {note, bestMatch, score}
}

export default (Note)


