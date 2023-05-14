import React, {useEffect, useState} from 'react'

import {getCookies} from 'cookies-next'

import {ResponsiveChoropleth} from "@nivo/geo";
import countries from "../../../utils/world_countries.json";


import test from "../../../utils/france";

import SignedInHeader from "../../../components/SignedInHeader/SignedInHeader";

import {fetchNotes, fetchPerfumes, getNote, getNoteScore, getPerfume} from "../../../api";
import loadable from "loadable-components";

import {Select, Tabs} from "antd";
import image from "../../../assets/images/fakeNotePhoto.jpg";
import WordCloud from "react-d3-cloud";
import words from "../../../utils/words";
const ReactApexChart = loadable(() => import('react-apexcharts'));
const { TabPane } = Tabs;
const { Option } = Select;
function Perfume(props) {

    const [zoom, setZoom] = useState(100)
    const [movV, setMovV] = useState(0.5)
    const [movH, setMovH] = useState(0.5)
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 260;
    const tooltip = (e) => {
        return <div style={{zIndex: 9999, padding: 10, justifyContent: 'space-between'}}
                    className={'tooltipCard flexColumn'}>
            <span className={'smallTitle'}>{e && e.feature && e.feature.properties.name}</span>

            <span className={'bigText'}>{e.feature.data && e.feature.data.value && e.feature.data.value}</span>
        </div>
    }

    const MyResponsiveChoropleth = ({data}) => {
        return <ResponsiveChoropleth
            data={data}
            //features={location === 'world' ? countries.features : location === 'us' ? us.features : france.feature}
            features={countries.features}
            colors="blues"
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={zoom}
            projectionTranslation={[movV, movH]}
            enableGraticule={false}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}
            borderColor="#152538"
            tooltip={(e) => tooltip(e)}
            domain={[0, 100]}
        />
    }

    console.log(props)

    return (
        <>

                <div style={{height: '100%',backgroundColor: 'white', borderRadius: 20}}>
                    <SignedInHeader type={1} title='Note'/>
                    {props.perfume ?
                    <div className={'flexColumn'}>
                        <div className={'flexRow'} style={{
                            height: '12%',
                            justifyContent: 'space-between',
                            position: 'relative',
                            margin: '2% 5% 0 5% '
                        }}>

                            <Select placeholder={'SELECT A REGION '} style={{width: 220}}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                            <Select placeholder={'SELECT A YEAR '} style={{width: 220}}>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                            <Select placeholder={'SELECT A BRAND '} style={{width: 220}}>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                            <Select placeholder={'SELECT A CREATION '} style={{width: 220}}>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </div>
                        <div className={'flexRow'} style={{
                            marginTop: 10,
                            justifyContent: 'space-between',
                            position: 'relative',
                            margin: '2% 5% 0 5% '
                        }}>


                            <div style={{justifyContent: 'center', flexBasis: '20%', alignItems: 'center'}}
                                 className={'flexColumn'}>
                                <img src={image} style={{width: 120, height: 120, borderRadius: 60}} alt=""/>
                                <div style={{marginTop: 15, alignItems: 'center'}} className={'bigText flexRow'}>
                    <span style={{
                        textAlign: 'center',
                        padding: '0px 10px 0 10px'
                    }}>{props.perfume.name}  </span>

                                </div>
                                <div className={'smallText'}
                                     style={{width: '100%', textAlign: 'center', padding: 15}}>Apple description
                                </div>


                            </div>

                            <div style={{flexBasis: '25%'}} className={"interestCard flexColumn"}>


                                <ReactApexChart options={stats.options} series={stats.series} type="radialBar"
                                                height={200}/>


                            </div>
                            <div style={{flexBasis: '50%'}} className={"interestCard flexColumn"}>


                                <ReactApexChart options={evolutionChart.options} series={evolutionChart.series}
                                                type="area"
                                                height={190}/>


                            </div>

                        </div>
                        <div style={{
                            marginTop: 10,
                            justifyContent: 'space-between',
                            position: 'relative',
                            margin: '2% 5% 0 5% '
                        }}>
                            <Tabs tabPosition={'left'}>
                                <TabPane tab="Audience Brakedown" key="1">
                                    Content of Tab 1
                                </TabPane>
                                <TabPane tab="Ranking" key="2">
                                    Content of Tab 2
                                </TabPane>
                                <TabPane tab="Geographical distrubition" key="3">

                                    <div style={{position: 'relative', width: '100%', height: "320px"}}>
                                        <div style={{position: 'absolute', right: 0, zIndex: 888}}>
                                            <button onClick={() => setZoom(zoom + 100)}>+</button>
                                            <button onClick={() => setZoom(zoom - 100)}>-</button>
                                        </div>


                                        <MyResponsiveChoropleth data={[]}/>


                                        <div className={'flexColumn'} style={{
                                            width: 30, position: 'absolute',
                                            bottom: 20, alignItems: 'center'
                                        }}>
                                            <button onClick={() => setMovH(movH + 0.1)}><span
                                                className={'mdi mdi-arrow-up-thick'}/>
                                            </button>
                                            <div className={'flexRow'}>
                                                <button onClick={() => setMovV(movV + 0.1)}>
                                                    <span className={'mdi mdi-arrow-left-thick'}/>

                                                </button>
                                                <button onClick={() => setMovV(movV - 0.1)}>
                                                    <span className={'mdi mdi-arrow-right-thick'}/>

                                                </button>
                                            </div>
                                            <button onClick={() => setMovH(movH - 0.1)}>
                                                <span className={'mdi mdi-arrow-down-thick'}/>
                                            </button>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Emotions cloud" key="4">
                                    <WordCloud
                                        data={words}
                                        fontSizeMapper={fontSizeMapper}
                                        rotate={rotate}
                                        padding={2}
                                        width={800}
                                        height={300}
                                    />
                                </TabPane>
                            </Tabs>
                        </div>

                    </div>
                        :
                        <h1>Sorry perfume not found </h1>}
                </div>

            </>
    )


}

Perfume.getInitialProps = async (ctx) => {

    console.log('11111111111')
    let noteId = ctx.query.id
    const perfume = await getPerfume(noteId, getCookies(ctx, 'authToken'))
   // const bestMatch = await fetchPerfumes({offset: 0, limit: 10, token: getCookies(ctx, 'authToken')})
   // const score = await getNoteScore(1, 2010, 'TUN', 'test')
    console.log(perfume , 'tttt')

    return {perfume}
}

export default (Perfume)



const stats = {

    series: [ 55, 67, 83],
    options: {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Success Metrics',
                        formatter: function (w) {
                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                            return '20%'
                        }
                    }
                }
            }
        },
        labels: ['Posts', 'Reach', 'Engagment'],
    },


}



const evolutionChart = {

    series: [{
        name: 'Network',
        data: [{
            x: 'Dec 23 2017',
            y: null
        },
            {
                x: 'Dec 24 2017',
                y: 44
            },
            {
                x: 'Dec 25 2017',
                y: 31
            },
            {
                x: 'Dec 26 2017',
                y: 38
            },
            {
                x: 'Dec 27 2017',
                y: null
            },
            {
                x: 'Dec 28 2017',
                y: 32
            },
            {
                x: 'Dec 29 2017',
                y: 55
            },
            {
                x: 'Dec 30 2017',
                y: 51
            },
            {
                x: 'Dec 31 2017',
                y: 67
            },
            {
                x: 'Jan 01 2018',
                y: 22
            },
            {
                x: 'Jan 02 2018',
                y: 34
            },
            {
                x: 'Jan 03 2018',
                y: null
            },
            {
                x: 'Jan 04 2018',
                y: null
            },
            {
                x: 'Jan 05 2018',
                y: 11
            },
            {
                x: 'Jan 06 2018',
                y: 4
            },
            {
                x: 'Jan 07 2018',
                y: 15,
            },
            {
                x: 'Jan 08 2018',
                y: null
            },
            {
                x: 'Jan 09 2018',
                y: 9
            },
            {
                x: 'Jan 10 2018',
                y: 34
            },
            {
                x: 'Jan 11 2018',
                y: null
            },
            {
                x: 'Jan 12 2018',
                y: null
            },
            {
                x: 'Jan 13 2018',
                y: 13
            },
            {
                x: 'Jan 14 2018',
                y: null
            }
        ],
    }],
    options: {
        chart: {
            type: 'area',
            height: 350,
            animations: {
                enabled: false
            },
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        fill: {
            opacity: 0.8,
            type: 'pattern',
            pattern: {
                style: ['verticalLines', 'horizontalLines'],
                width: 5,
                height: 6
            },
        },
        markers: {
            size: 5,
            hover: {
                size: 9
            }
        },
        title: {
            text: 'Network Monitoring',
        },
        tooltip: {
            intersect: true,
            shared: false
        },
        theme: {
            palette: 'palette1'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            title: {
                text: 'Bytes Received'
            }
        }
    },


}
