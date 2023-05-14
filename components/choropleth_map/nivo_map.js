import { ResponsiveChoropleth } from "@nivo/geo";
import countries from "../../utils/world_countries";
import us from "../../utils/us_map";
import tun from "../../utils/TUN";
import dz from "../../utils/alg";
import React, { useEffect, useState } from "react";
import Separator from "../Separator/Separator";
import { Select, Spin } from "antd";
import NoteBar from "../NoteBar/NoteBar";

import { getCookies } from "cookies-next";

import loadable from "loadable-components";
import { getNoteScore, getNoteScoreByMonth, searchNotes } from "../../api";
import Suggsetion from "../suggestion";

//const FusionCharts = loadable(() => import('fusioncharts'));
//import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
//const ReactFC = loadable(() => import('react-fusioncharts'));

const ReactApexChart = loadable(() => import("react-apexcharts"));
const { Option } = Select;

function NivoMap(props) {
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

    console.log(props);
    useEffect(() => {
        getScore(date);
        getScoreByNote(selectedNotes, date, country);
        setLoading(false);
    }, []);

    const lineCartData = {
        options: {
            chart: {
                height: 350,
                type: "line",
                dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2,
                },
                toolbar: {
                    show: true,
                },
            },
            colors: [
                "#77B6EA",
                "#de6360",
                "#ffd2b7",
                "#0048ba",
                "#1b1404",
                "#7b3801",
                "#8e0000",
                "#a45a52",
                "#c9b29b",
                "#747d83",

                "#795d4c",
            ],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            title: {
                text: "",
                align: "left",
            },
            grid: {
                borderColor: "#e7e7e7",
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5,
                },
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aut",
                    "Sep",
                    "oct",
                    "Nov",
                    "Dec",
                ],
                title: {
                    // text: 'Month'
                },
            },
            yaxis: {
                title: {
                    //    text: 'Temperature'
                },
                min: 0,
            },
            legend: {
                position: "top",
                horizontalAlign: "center",
                floating: true,
                offsetY: 0,
                offsetX: 0,
            },
        },
    };

    const getScore = async (year) => {
        setLoading(true);
        const score = await getNoteScore(
            props.note.id,
            year,
            getCookies(null, "authToken")
        );

        setData(score);
        setLoading(false);
    };

    const getScoreByNote = async (notes, date, country) => {
        let workedNotes = notes;

        let res = [];

        const results1 = await getScoreByMonth(props.note.id, date, country);

        res.push({
            name: props.note.name,
            data: results1,
        });

        for (let i = 0; i < workedNotes.length; i++) {
            const results = await getScoreByMonth(
                workedNotes[i].value,
                date,
                country
            );
            setMaxScore(_.max(results));

            res.push({
                name: workedNotes[i].label,
                data: results,
            });
        }

        setLineData(res);
    };

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

    const MyResponsiveChoropleth = ({ data }) => {
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
                style={{ padding: 10, justifyContent: "space-between" }}
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

        console.log(res.results);
        console.log("search:", val);
    };

    return props.note ? (
        <div>
            <div
                className={"flexRow"}
                style={{ position: "relative", margin: "0% 5% 0 5% " }}
            >
                <div
                    style={{
                        justifyContent: "center",
                        flexBasis: "20%",
                        alignItems: "center",
                    }}
                    className={"flexColumn"}
                >
                    {props.note && props.note.images && props.note.images[2] && (
                        <img
                            src={props.note.images[2].image}
                            style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                            }}
                            alt=""
                        />
                    )}
                    <div
                        style={{ marginTop: 15, alignItems: "center" }}
                        className={"bigText flexRow"}
                    >
                        <span
                            style={{
                                textAlign: "center",
                                padding: "0px 10px 0 10px",
                            }}
                        >
                            {props.note.name}{" "}
                        </span>
                    </div>
                    <div
                        className={"smallText"}
                        style={{
                            width: "100%",
                            textAlign: "center",
                            padding: 15,
                        }}
                    >
                        {props.note.profile}
                    </div>
                </div>
                <div style={{ position: "relative", flexBasis: "45%" }}>
                    <div
                        className={"flexRow"}
                        style={{
                            marginBottom: 25,
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                        }}
                    >
                        <span className={"bigText"}>Perfume Geography</span>
                        <Separator size={"small"} />
                    </div>
                    <div
                        style={{
                            position: "relative",
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
                            <button onClick={() => setZoom(zoom + 100)}>
                                +
                            </button>
                            <button onClick={() => setZoom(zoom - 100)}>
                                -
                            </button>
                        </div>

                        {!loading && data && (
                            <MyResponsiveChoropleth data={data} />
                        )}

                        <div
                            className={"flexColumn"}
                            style={{
                                width: 30,
                                position: "absolute",
                                bottom: 20,
                                alignItems: "center",
                            }}
                        >
                            <button onClick={() => setMovH(movH + 0.1)}>
                                <span className={"mdi mdi-arrow-up-thick"} />
                            </button>
                            <div className={"flexRow"}>
                                <button onClick={() => setMovV(movV + 0.1)}>
                                    <span
                                        className={"mdi mdi-arrow-left-thick"}
                                    />
                                </button>
                                <button onClick={() => setMovV(movV - 0.1)}>
                                    <span
                                        className={"mdi mdi-arrow-right-thick"}
                                    />
                                </button>
                            </div>
                            <button onClick={() => setMovH(movH - 0.1)}>
                                <span className={"mdi mdi-arrow-down-thick"} />
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
                        <div style={{ width: "60%" }}>
                            <div className={"Rectangle"} />
                            <div
                                className={"flexRow legendNumbers"}
                                style={{ justifyContent: "space-between" }}
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
                <div
                    className={"flexColumn"}
                    style={{
                        flexBasis: "35%",
                        padding: "10px 0 0 20px",
                    }}
                >
                    <div
                        className={"flexRow"}
                        style={{ justifyContent: "space-between" }}
                    >
                        <div
                            className={"flexRow"}
                            style={{
                                flexBasis: "50%",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                            }}
                        >
                            <span>Location : </span>
                            <Select
                                showSearch
                                style={{ width: 120 }}
                                placeholder="Select Location"
                                optionFilterProp="children"
                                onChange={onChange}
                                defaultValue={"world"}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="world">World wide</Option>
                            </Select>
                        </div>
                        <div
                            className={"flexRow"}
                            style={{
                                flexBasis: "50%",
                                justifyContent: "space-around",
                            }}
                        >
                            <span>year :</span>
                            <Select
                                showSearch
                                style={{ width: 120 }}
                                placeholder="Select a year"
                                optionFilterProp="children"
                                onChange={onChangeDate}
                                defaultValue={"2020"}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="2010">2010</Option>
                                <Option value="2011">2011</Option>
                                <Option value="2012">2012</Option>
                                <Option value="2013">2013</Option>
                                <Option value="2014">2014</Option>
                                <Option value="2015">2015</Option>
                                <Option value="2016">2016</Option>
                                <Option value="2017">2017</Option>
                                <Option value="2018">2018</Option>
                                <Option value="2019">2019</Option>
                                <Option value="2020">2020</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={"interestCard flexColumn"}>
                        <div className={"smallTitle"}> search interest In</div>
                        <div
                            style={{
                                marginTop: 20,
                                maxHeight: 300,
                                overflow: "auto",
                            }}
                        >
                            {data &&
                                data.map((elem) => (
                                    <NoteBar
                                        key={elem.id}
                                        name={elem.id}
                                        value={
                                            elem.value > 100 ? 100 : elem.value
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={"flexRow"}
                style={{
                    justifyContent: "space-between",
                    position: "relative",
                    margin: "0% 5% 0 5% ",
                }}
            >
                <div style={{ position: "relative", flexBasis: "65%" }}>
                    <div
                        className={"flexRow"}
                        style={{
                            marginBottom: 25,
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className={"flexRow"}
                            style={{
                                flexBasis: "40%",
                                flexWrap: "nowrap",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <span className={"bigText"}>Evolution chart </span>
                            <Separator size={"small"} />
                        </div>
                        <div
                            style={{
                                flexBasis: "40%",
                                display: "flex",
                                flexWrap: "nowrap",
                            }}
                        >
                            <span>Compare with :</span>
                            <Select
                                mode="multiple"
                                placeholder="Please select"
                                style={{ minWidth: 120, width: "auto" }}
                                //defaultValue={}
                                onSearch={fetchNotes}
                                labelInValue
                                notFoundContent={
                                    fetching ? <Spin size="small" /> : null
                                }
                                filterOption={false}
                                onChange={(e) => {
                                    console.log(e);
                                    getScoreByNote(e, date, country);
                                    setSelectedNotes(e);
                                }}
                            >
                                {notes.map((elem) => (
                                    <Option key={elem.id} value={elem.id}>
                                        {elem.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div style={{ flexBasis: "20%" }}>
                            <span>In :</span>
                            <Select
                                showSearch
                                style={{ width: 120 }}
                                placeholder="Select Location"
                                optionFilterProp="children"
                                //    onChange={onChange}
                                defaultValue={"ALL"}
                                onChange={(e) => {
                                    console.log(e, "ccccccccccccc");
                                    setCountry(e);
                                    getScoreByNote(selectedNotes, date, e);
                                }}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key={"ALL"} value="ALL">
                                    World wide
                                </Option>

                                {countries.features.map((ele) => (
                                    <Option key={ele.id} value={ele.id}>
                                        {ele.properties.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "400px",
                        }}
                    >
                        {lineData && lineData.length > 0 && (
                            <ReactApexChart
                                options={lineCartData.options}
                                series={lineData}
                                type="line"
                                height={300}
                            />
                        )}
                    </div>
                </div>
                <div
                    className={"interestCard flexColumn"}
                    style={{
                        flexBasis: "31%",
                        alignSelf: "baseline",
                        margin: "5px 25px 0px 0px ",
                    }}
                >
                    <div className={"smallTitle"}> Best Matches</div>
                    <div
                        style={{
                            marginTop: 20,
                            maxHeight: 300,
                            overflow: "auto",
                            padding: "0 15px 0 15px",
                        }}
                    >
                        {props.note &&
                            props.note.best_match_notes &&
                            props.note.best_match_notes.map((elem) => (
                                <Suggsetion
                                    id={elem.id}
                                    name={elem.name}
                                    image={
                                        elem.featured_image &&
                                        elem.featured_image.image
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <h1> No Brand with this Id</h1>
    );
}

export default NivoMap;

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
