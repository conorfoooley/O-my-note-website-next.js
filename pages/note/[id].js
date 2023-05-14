import React, {useEffect, useState} from 'react'
import Head from "next/head";
import logo from "../../assets/images/logo.svg";
import grid from "../../assets/images/feather-grid.svg";
import userVector from "../../assets/images/feather-user.svg";
import edit from "../../assets/images/edit.svg";
import fruits from "../../assets/images/fruits.png";
import {getCookies} from 'cookies-next'

import {ResponsiveGeoMap} from "@nivo/geo";
import {ResponsiveGeoMapCanvas} from "@nivo/geo";
import {ResponsiveChoropleth} from "@nivo/geo";
import countries from "../../utils/world_countries.json";

import us from "../../utils/us_map";
import france from "../../utils/france";

import test from "../../utils/france";
import FloatCard from "../../components/FloatCard/FloatCard";
import SignedInHeader from "../../components/SignedInHeader/SignedInHeader";
import SignedInFooter from "../../components/SignedInFooter/SignedInFooter";
import {privateRoute} from "../../components/privateRoute";
import NivoMap from "../../components/choropleth_map/nivo_map";
import {fetchNotes, getNote, getNoteScore} from "../../api";
import Carousel from "../../components/Carousel/Carousel";

import _ from 'lodash'

const data = [
    {
        id: "AFG",
        value: 336354
    },
    {
        id: "AGO",
        value: 296583
    },
    {
        id: "ALB",
        value: 364571
    },
    {
        id: "ARE",
        value: 610382
    },
    {
        id: "ARG",
        value: 794809
    },
    {
        id: "ARM",
        value: 923418
    },
    {
        id: "ATA",
        value: 342555
    },
    {
        id: "ATF",
        value: 598836
    },
    {
        id: "AUT",
        value: 718056
    },
    {
        id: "AZE",
        value: 208817
    },
    {
        id: "BDI",
        value: 360414
    },
    {
        id: "BEL",
        value: 876948
    },
    {
        id: "BEN",
        value: 655100
    },
    {
        id: "BFA",
        value: 232606
    },
    {
        id: "BGD",
        value: 417156
    },
    {
        id: "BGR",
        value: 854162
    },
    {
        id: "BHS",
        value: 388528
    },
    {
        id: "BIH",
        value: 111098
    },
    {
        id: "BLR",
        value: 740178
    },
    {
        id: "BLZ",
        value: 667428
    },
    {
        id: "BOL",
        value: 859564
    },
    {
        id: "BRN",
        value: 455763
    },
    {
        id: "BTN",
        value: 286525
    },
    {
        id: "BWA",
        value: 541041
    },
    {
        id: "CAF",
        value: 231176
    },
    {
        id: "CAN",
        value: 526976
    },
    {
        id: "CHE",
        value: 551696
    },
    {
        id: "CHL",
        value: 883340
    },
    {
        id: "CHN",
        value: 260808
    },
    {
        id: "CIV",
        value: 502330
    },
    {
        id: "CMR",
        value: 952636
    },
    {
        id: "COG",
        value: 446989
    },
    {
        id: "COL",
        value: 170799
    },
    {
        id: "CRI",
        value: 58530
    },
    {
        id: "CUB",
        value: 385820
    },
    {
        id: "-99",
        value: 639105
    },
    {
        id: "CYP",
        value: 11567
    },
    {
        id: "CZE",
        value: 180808
    },
    {
        id: "DEU",
        value: 804533
    },
    {
        id: "DJI",
        value: 262656
    },
    {
        id: "DNK",
        value: 96807
    },
    {
        id: "DOM",
        value: 133414
    },
    {
        id: "DZA",
        value: 179978
    },
    {
        id: "ECU",
        value: 264450
    },
    {
        id: "EGY",
        value: 58113
    },
    {
        id: "ERI",
        value: 648486
    },
    {
        id: "ESP",
        value: 994728
    },
    {
        id: "EST",
        value: 439892
    },
    {
        id: "ETH",
        value: 999849
    },
    {
        id: "FIN",
        value: 224870
    },
    {
        id: "FJI",
        value: 470055
    },
    {
        id: "FLK",
        value: 587110
    },
    {
        id: "FRA",
        value: 399189
    },
    {
        id: "GAB",
        value: 688694
    },
    {
        id: "GBR",
        value: 326974
    },
    {
        id: "GEO",
        value: 130355
    },
    {
        id: "GHA",
        value: 396228
    },
    {
        id: "GIN",
        value: 346166
    },
    {
        id: "GMB",
        value: 238358
    },
    {
        id: "GNB",
        value: 144958
    },
    {
        id: "GNQ",
        value: 33132
    },
    {
        id: "GRC",
        value: 976348
    },
    {
        id: "GTM",
        value: 383748
    },
    {
        id: "GUY",
        value: 942196
    },
    {
        id: "HND",
        value: 80385
    },
    {
        id: "HRV",
        value: 22055
    },
    {
        id: "HTI",
        value: 862572
    },
    {
        id: "HUN",
        value: 618455
    },
    {
        id: "IDN",
        value: 440180
    },
    {
        id: "IND",
        value: 378936
    },
    {
        id: "IRL",
        value: 512042
    },
    {
        id: "IRN",
        value: 719393
    },
    {
        id: "IRQ",
        value: 407179
    },
    {
        id: "ISL",
        value: 426395
    },
    {
        id: "ISR",
        value: 126372
    },
    {
        id: "ITA",
        value: 92517
    },
    {
        id: "JAM",
        value: 565786
    },
    {
        id: "JOR",
        value: 17395
    },
    {
        id: "JPN",
        value: 18504
    },
    {
        id: "KAZ",
        value: 962818
    },
    {
        id: "KEN",
        value: 784779
    },
    {
        id: "KGZ",
        value: 167237
    },
    {
        id: "KHM",
        value: 803724
    },
    {
        id: "OSA",
        value: 258915
    },
    {
        id: "KWT",
        value: 273442
    },
    {
        id: "LAO",
        value: 16362
    },
    {
        id: "LBN",
        value: 24627
    },
    {
        id: "LBR",
        value: 556305
    },
    {
        id: "LBY",
        value: 948576
    },
    {
        id: "LKA",
        value: 279931
    },
    {
        id: "LSO",
        value: 91930
    },
    {
        id: "LTU",
        value: 918907
    },
    {
        id: "LUX",
        value: 650418
    },
    {
        id: "LVA",
        value: 67889
    },
    {
        id: "MAR",
        value: 305183
    },
    {
        id: "MDA",
        value: 870719
    },
    {
        id: "MDG",
        value: 565187
    },
    {
        id: "MEX",
        value: 884355
    },
    {
        id: "MKD",
        value: 421457
    },
    {
        id: "MLI",
        value: 28249
    },
    {
        id: "MMR",
        value: 445724
    },
    {
        id: "MNE",
        value: 622233
    },
    {
        id: "MNG",
        value: 697176
    },
    {
        id: "MOZ",
        value: 63134
    },
    {
        id: "MRT",
        value: 870031
    },
    {
        id: "MWI",
        value: 968585
    },
    {
        id: "MYS",
        value: 133321
    },
    {
        id: "NAM",
        value: 381152
    },
    {
        id: "NCL",
        value: 987046
    },
    {
        id: "NER",
        value: 703084
    },
    {
        id: "NGA",
        value: 262330
    },
    {
        id: "NIC",
        value: 880106
    },
    {
        id: "NLD",
        value: 455865
    },
    {
        id: "NOR",
        value: 971668
    },
    {
        id: "NPL",
        value: 991203
    },
    {
        id: "NZL",
        value: 940595
    },
    {
        id: "OMN",
        value: 686114
    },
    {
        id: "PAK",
        value: 954628
    },
    {
        id: "PAN",
        value: 541490
    },
    {
        id: "PER",
        value: 338365
    },
    {
        id: "PHL",
        value: 658281
    },
    {
        id: "PNG",
        value: 946168
    },
    {
        id: "POL",
        value: 363557
    },
    {
        id: "PRI",
        value: 150737
    },
    {
        id: "PRT",
        value: 79490
    },
    {
        id: "PRY",
        value: 782567
    },
    {
        id: "QAT",
        value: 890224
    },
    {
        id: "ROU",
        value: 974987
    },
    {
        id: "RUS",
        value: 213400
    },
    {
        id: "RWA",
        value: 40508
    },
    {
        id: "ESH",
        value: 884303
    },
    {
        id: "SAU",
        value: 853554
    },
    {
        id: "SDN",
        value: 884475
    },
    {
        id: "SDS",
        value: 830765
    },
    {
        id: "SEN",
        value: 783905
    },
    {
        id: "SLB",
        value: 907517
    },
    {
        id: "SLE",
        value: 32298
    },
    {
        id: "SLV",
        value: 277433
    },
    {
        id: "ABV",
        value: 206463
    },
    {
        id: "SOM",
        value: 956107
    },
    {
        id: "SRB",
        value: 533310
    },
    {
        id: "SUR",
        value: 486394
    },
    {
        id: "SVK",
        value: 687779
    },
    {
        id: "SVN",
        value: 926993
    },
    {
        id: "SWZ",
        value: 420037
    },
    {
        id: "SYR",
        value: 568970
    },
    {
        id: "TCD",
        value: 227723
    },
    {
        id: "TGO",
        value: 417200
    },
    {
        id: "THA",
        value: 293391
    },
    {
        id: "TJK",
        value: 51557
    },
    {
        id: "TKM",
        value: 630756
    },
    {
        id: "TLS",
        value: 693895
    },
    {
        id: "TTO",
        value: 878665
    },
    {
        id: "TUN",
        value: 25
    },
    {
        id: "TUR",
        value: 155013
    },
    {
        id: "TWN",
        value: 205416
    },
    {
        id: "TZA",
        value: 724554
    },
    {
        id: "UGA",
        value: 892502
    },
    {
        id: "UKR",
        value: 573208
    },
    {
        id: "URY",
        value: 264886
    },
    {
        id: "USA",
        value: 283687
    },
    {
        id: "UZB",
        value: 814374
    },
    {
        id: "VEN",
        value: 247493
    },
    {
        id: "VNM",
        value: 667306
    },
    {
        id: "VUT",
        value: 915896
    },
    {
        id: "PSE",
        value: 396412
    },
    {
        id: "YEM",
        value: 433408
    },
    {
        id: "ZAF",
        value: 85205
    },
    {
        id: "ZMB",
        value: 460657
    },
    {
        id: "ZWE",
        value: 805423
    },
    {
        id: "KOR",
        value: 977973
    }
];


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
        console.log(props.score) //return window.removeEventListener('scroll', handleScroll);

    }, [])


    return <div style={{height: '100%'}}>
        <SignedInHeader title='Search'/>
        <div style={{height: '55%'}}>

            <FloatCard>


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
                    {/*<div className={'smallText'}> {props.note.profile}
                    </div>*/}

                    <div className={'grayText'} style={{alignSelf: 'flex-end'}}>Load more</div>
                </div>

            </FloatCard>
        </div>
        <NivoMap data={props.score}/>
        <Carousel cards={props.bestMatch.results}/>
        <SignedInFooter/>
    </div>

}

Note.getInitialProps = async (ctx) => {

    console.log('server side')
    let noteId = ctx.query.id
    console.log(noteId)
    const note = await getNote(noteId, getCookies(ctx, 'authToken'))
    const bestMatch = await fetchNotes({offset: 0, limit: 10, token: getCookies(ctx, 'authToken')})
    const score = await getNoteScore(1, 2010, 'TUN', 'test')
    console.log(bestMatch)
    return {note, bestMatch, score}
}

export default (Note)


