import {ResponsiveChoropleth} from "@nivo/geo";
import countries from "../../utils/world_countries";
import us from "../../utils/us_map";
import tun from "../../utils/TUN";
import dz from "../../utils/alg";
import React, {useEffect, useState} from "react";
import Separator from "../Separator/Separator";
import {Select} from "antd";
import NoteBar from "../NoteBar/NoteBar";

import {getCookies} from "cookies-next";
import {getNoteScoreByMonth, searchNotes} from "../../api";

// const ReactApexChart = loadable(() => import("react-apexcharts"));
const {Option} = Select;

function GeoPerfumeMap(props) {
    const [data, setData] = useState();
    const [country, setCountry] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [zoom, setZoom] = useState(100);
    const [movV, setMovV] = useState(0.5);
    const [movH, setMovH] = useState(0.5);
    const [location, setLocation] = useState("world");
    const [date, setDate] = useState(2020);
    const [lineData, setLineData] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [notes, setNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [maxScore, setMaxScore] = useState(10000);

    const [region, setRegion] = useState(props.region);

    // console.log(props);

    useEffect(() => {
        // getScore(date);
        setCountryData();
        // getScoreByNote(selectedNotes, date, country);
        setLoading(false);
        // setData(countryData);
        // console.log(data);
        // console.log(data);
    }, []);

    // const getScore = async (year) => {
    //     setLoading(true);
    //     const score = await getNoteScore(
    //         props.note.id,
    //         year,
    //         getCookies(null, "authToken")
    //     );

    //     console.log(score);

    //     setData(score);
    //     setLoading(false);
    // };

    const setCountryData = async () => {
        let countryData = [];
        for (let i in props.data) {
            // console.log(i);
            countryData.push({
                id: i,
                value: props.data[i],
            });
        }

        await setData(countryData);
    };

    // const getScoreByNote = async (notes, date, country) => {
    //     let workedNotes = notes;

    //     let res = [];

    //     const results1 = await getScoreByMonth(props.note.id, date, country);

    //     res.push({
    //         name: props.note.name,
    //         data: results1,
    //     });

    //     for (let i = 0; i < workedNotes.length; i++) {
    //         const results = await getScoreByMonth(
    //             workedNotes[i].value,
    //             date,
    //             country
    //         );
    //         setMaxScore(_.max(results));

    //         res.push({
    //             name: workedNotes[i].label,
    //             data: results,
    //         });
    //     }

    //     setLineData(res);
    // };

    const getLocation = (elem) => {
        switch (elem) {
            case "world":
                return countries.features;
            case "us":
                return us.features;
            case "TUN":
                return tun.features;
            case "ALG":
                return dz.features;

            default:
                return countries.features;
        }
    };

    const MyResponsiveChoropleth = ({data}) => {
        // console.log(data);
        return (
            <ResponsiveChoropleth
                data={data}
                //features={location === 'world' ? countries.features : location === 'us' ? us.features : france.feature}
                features={getLocation(location)}
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
                /*      legends={[
                      {
                          anchor: "bottom-left",
                          direction: "column",
                          justify: true,
                          translateX: 20,
                          translateY: -100,
                          itemsSpacing: 0,
                          itemWidth: 94,
                          itemHeight: 18,
                          itemDirection: "left-to-right",
                          itemTextColor: "#444444",
                          itemOpacity: 0.85,
                          symbolSize: 18,
                          effects: [
                              {
                                  on: "hover",
                                  style: {
                                      itemTextColor: "#000000",
                                      itemOpacity: 1
                                  }
                              }
                          ]
                      }
                  ]}
            */
            />
        );
    };
    const tooltip = (e) => {
        return (
            <div
                style={{padding: 10, justifyContent: "space-between"}}
                className={"tooltipCard flexColumn"}
            >
                <span className={"smallTitle"}>
                    {e && e.feature && e.feature.properties.name}
                </span>
                <span>Interest in {date}</span>
                <span className={"bigText"}>
                    {e.feature.data &&
                    e.feature.data.value &&
                    e.feature.data.value}
                </span>
            </div>
        );
    };

    function onChange(value) {
        console.log(`selected ${value}`);
        setLocation(value);
        setZoom(100);
        setMovV(0.5);
        setMovH(0.5);
    }

    function onChangeDate(value) {
        console.log(`selected ${value}`);
        setDate(value);
        getScore(value);
        getScoreByNote(selectedNotes, value, country);
    }

    const fetchNotes = async (val) => {
        setNotes([]);

        setFetching(true);

        const res = await searchNotes({
            searchTerm: val,
            token: getCookies(null, "authToken"),
        });

        setNotes(res.results);

        setFetching(false);
        //
        // console.log(res.results);
        // console.log("search:", val);
    };

    return (
        <div >
            <div className={"flexRow"}
                // style={{ position: "relative", margin: "0% 5% 0 5% " }} 
                >
                <div style={{position: "relative", flexBasis: "100%", }}>
                    <div
                        className={"flexRow"}
                        style={{
                            marginBottom: 25,
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                        }}
                    >
                        <span className={"bigText"}>Geography Distribution</span>
                        {/*<Separator size={"small"}/>*/}
                    </div>
                    <div
                        style={{
                            position: "flex",
                            width: "100%",
                            height: "320px",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                right: 0,
                                zIndex: 888,
                            }}
                        >
                            <button
                                className="btn btn-light"
                                onClick={() => setZoom(zoom + 100)}
                                style={{marginRight: "3px"}}
                            >
                                <span className={"mdi mdi-plus"}></span>
                            </button>
                            <button
                                className="btn btn-light"
                                onClick={() => setZoom(zoom - 100)}
                            >
                                <span className={"mdi mdi-minus"}></span>
                            </button>
                        </div>

                        {!loading && data && (
                            <MyResponsiveChoropleth data={data}/>
                        )}

                        <div
                            className={"flexColumn"}
                            style={{
                                width: 30,
                                position: "absolute",
                                bottom: 20,
                                left: 5,
                                alignItems: "center",
                            }}
                        >
                            <button
                                className="btn btn-light"
                                onClick={() => setMovH(movH + 0.1)}
                            >
                                <span className={"mdi mdi-arrow-up-thick"}/>
                            </button>
                            <div className={"flexRow"}>
                                <button
                                    className="btn btn-light"
                                    onClick={() => setMovV(movV + 0.1)}
                                >
                                    <span
                                        className={"mdi mdi-arrow-left-thick"}
                                    />
                                </button>
                                <button
                                    className="btn btn-light"
                                    onClick={() => setMovV(movV - 0.1)}
                                >
                                    <span
                                        className={"mdi mdi-arrow-right-thick"}
                                    />
                                </button>
                            </div>
                            <button
                                className="btn btn-light"
                                onClick={() => setMovH(movH - 0.1)}
                            >
                                <span className={"mdi mdi-arrow-down-thick"}/>
                            </button>
                        </div>
                    </div>
                    <div
                        className={"flexRow"}
                        style={{
                            justifyContent: "space-between",
                            margin: "15px 0px 15px 0px",
                        }}
                    >
                        <span className={"smallTitle"}>
                            Search interest in {date}
                        </span>
                        <div style={{width: "60%"}}>
                            <div className={"Rectangle"}/>
                            <div
                                className={"flexRow legendNumbers"}
                                style={{justifyContent: "space-between"}}
                            >
                                <span>10</span>
                                <span>20</span>
                                <span>30</span>
                                <span>40</span>
                                <span>50</span>
                                <span>60</span>
                                <span>70</span>
                                <span>80</span>
                                <span>90</span>
                                <span>100</span>
                            </div>
                        </div>
                    </div>
                </div>
                 {/*<div
                    className={"flexColumn"}
                    style={{
                        flexBasis: "40%",
                    }}
                >
                   <div className={"interestCard flexColumn"}>
                        <div className={"smallTitle"}> Search Interest In</div>
                        <div
                            style={{
                                marginTop: 20,
                                maxHeight: 300,
                                overflow: "auto",
                            }}
                        >
                            {region &&
                            Object.keys(region).map((elem) => (
                                <NoteBar
                                    key={elem}
                                    name={elem}
                                    percentage={() => {
                                        const maxValue = Math.max(
                                            ...Object.values(region)
                                        );
                                        return (
                                            (region[elem] * 100) / maxValue
                                        );
                                    }}
                                    value={
                                        // region[elem] > 100
                                        //     ? 100
                                        //     : region[elem]
                                        region[elem]
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    );
}

export default GeoPerfumeMap;

const getScoreByMonth = async (id_note, date, country) => {
    const score = await getNoteScoreByMonth(
        id_note,
        date,
        getCookies(null, "authToken"),
        country
    );
    let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log(score, "sss");
    if (score && score.length > 0) {
        score.map((elem, index) => {
            if (elem.month) results[elem.month - 1] = elem.score;
        });
    }

    return results;
};
