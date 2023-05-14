import React, {useState} from "react";

import {getCookies} from "cookies-next";
import Link from "next/link";

import SignInHeaderSingle from "../../../components/SignInHeaderSingle/SignInHeaderSingle";

import {fetchCreation, fetchCreations, fetchPerfumeList, getPerfume, getUser,} from "../../../api";
import loadable from "loadable-components";

import {Select, Tabs, Spin} from "antd";
// import WordCloud from "react-d3-cloud";
import ReactWordcloud from "react-wordcloud";
import GeoPerfumeMap from "../../../components/choropleth_map/GeoPerfumeMap";
import SignedInFooter from "../../../components/SignedInFooter/SignedInFooter";
import { divide, size } from "lodash";


const ReactApexChart = loadable(() => import("react-apexcharts"));
const {TabPane} = Tabs;
const {Option} = Select;

function Perfume(props) {
    const [zoom, setZoom] = useState(100);
    const [movV, setMovV] = useState(0.5);
    const [movH, setMovH] = useState(0.5);

    const [filterCountry, setFilterCountry] = useState(
        props.creations.countries
    );
    const [filterYear, setFilterYear] = useState(props.creations.years);
    const [audience, setAudience] = useState(
        props.creation.audience_breakedown
    );
    const [successMetrics, setSuccessMetrics] = useState(
        props.creation.success_metrics
    );

    const [filters, setFilters] = useState(false)

    const [perfumeList, setPerfumeList] = useState(props.perfumeList);

    let emotions = [];
    props.creation.emotions_cloud.map((emotion, i) => {
        emotions.push({text: emotion, value: i})
    })

    const children = [];
    perfumeList.results.forEach((element) => {
        if (element.id !== props.perfume.pk)
            children.push(<Option key={element.id}>{element.title}</Option>);
    });

    const [evolutionChartOption, setEvolutionChartOption] = useState({
        chart: {
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: "smooth",
            width: 1,
        },
        colors: ["#cfb992", "#552b32", "#1f2a56"],
        legend: {
            show: false,
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
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        grid: {
            row: {
                colors: ["#F44336", "#E91E63", "#9C27B0"],
            },
            column: {
                colors: ["#F44336", "#E91E63", "#9C27B0"],
            },
        },
    });
    //console.log(props)
    const today = new Date();
    const currentYear = today.getFullYear();

    const [country, setCountry] = useState("AF");
    const [year, setYear] = useState(currentYear);
    const [compareID, setCompareID] = useState([]);
    //console.log("year", year)
    const fetchDataByCountry = async (value) => {
        setCountry(value);
        const creation = await fetchCreation(
            getCookies(null, "authToken"),
            year,
            props.noteId,
            country
        );

        // console.log(creation);

        setEvolutionChartSeries([
            {
                name: props.perfume.title,
                data: Object.values(creation.tendency_chart),
            },
        ]);

        setAudience(creation.audience_breakedown);
        setSuccessMetrics(creation.success_metrics);

        // console.log(audience);
        // console.log(successMetrics);
    };

    const fetchDataByYear = async (value) => {
        //console.log("value",value);
        console.log("value:", value);
        console.log("year :",year);
        setYear(value);
        // console.log(creation);
        if(value=='All'){
            console.log("salut ca passe ici aussi")
            const creation = await fetchCreation(
                getCookies(null, "authToken"),
                0,
                props.noteId,
                country
            );
            setEvolutionChartSeries([
                {
                    name: props.perfume.title+" "+2020,
                    data: Object.values(creation.tendency_chart_1),
                },
                {
                    name: props.perfume.title+" "+2021,
                    data: Object.values(creation.tendency_chart_2),
                },
            ]);
            console.log("audience1", creation.audience_breakedown)
            setAudience(creation.audience_breakedown);
            setSuccessMetrics(creation.success_metrics);
        }
        else{
            const creation = await fetchCreation(
                getCookies(null, "authToken"),
                value,
                props.noteId,
                country
            );
            console.log("salut ca passe ici")
            setEvolutionChartSeries([
                {
                    name: props.perfume.title,
                    data: Object.values(creation.tendency_chart),
                },
            ]);
            console.log("audience2", creation.audience_breakedown)
            setAudience(creation.audience_breakedown);
            setSuccessMetrics(creation.success_metrics);
        }
        //console.log(creation.audience_breakedown, "audience")
    };

    const fetchCompareByPerfume = async (value) => {
        if(year == 'All'){
            if (value.length) {
                // console.log(value[value.length - 1]);
                // const perfume = await getPerfume(
                //     value[0],
                //     getCookies(null, "authToken")
                // );
                const creation = await fetchCreation(
                    getCookies(null, "authToken"),
                    0,
                    // value[value.length - 1],
                    value,
                    country
                );
                console.log("ici",creation.tendency_chart);
                if (creation !== undefined && Object.keys(creation).length) {
                    setEvolutionChartSeries([
                        ...evolutionChartSeries,
                        {
                            name: creation.creation.name+" "+2020,
                            data: Object.values(creation.tendency_chart_1),
                            id: value,
                        },
                        {
                            name: creation.creation.name+" "+2021,
                            data: Object.values(creation.tendency_chart_2),
                            id: value,
                        },
                    ]);
                }
    
                //console.log("Select", Object.values(creation.tendency_chart));
                // console.log("Props", Object.values(props.creation.tendency_chart));
                // console.log(evolutionChartSeries);
            } else {
                setEvolutionChartSeries([
                    {
                        name: props.perfume.title,
                        data: Object.values(props.creation.tendency_chart),
                    },
                    // {
                    //     name: "Series 2",
                    //     data: [40, 22, 60, 38, 24, 21, 48, 60],
                    // },
                ]);
            }
        }
        else{
            if (value.length) {
                const creation = await fetchCreation(
                    getCookies(null, "authToken"),
                    year,
                    // value[value.length - 1],
                    value,
                    country
                );

                if (creation !== undefined && Object.keys(creation).length) {
                    setEvolutionChartSeries([
                        ...evolutionChartSeries,
                        {
                        name: creation.creation.name,
                        data: Object.values(creation.tendency_chart),
                        id: value,
                        },
                    ]);
                }
            } else {
                setEvolutionChartSeries([
                    {
                        name: props.perfume.title,
                        data: Object.values(props.creation.tendency_chart),
                    },
                ]);
            }
        }
    };

    const [evolutionChartSeries, setEvolutionChartSeries] = useState([
        {
            name: props.perfume.title,
            data: Object.values(props.creation.tendency_chart),
            id: props.perfume.pk,
        },
        // {
        //     name: "Series 2",
        //     data: [40, 22, 60, 38, 24, 21, 48, 60],
        // },
    ]);

    const compareDeselect = (value) => {
        // console.log(value);

        const newSeries = evolutionChartSeries.filter(
            (item) => item["id"] !== value
        );

        setEvolutionChartSeries(newSeries);
        // console.log("Deselect");
    };

    const fontSizeMapper = (word) => Math.log2(word.value) * 5;
    const rotate = (word) => word.value % 260;
    const tooltip = (e) => {
        return (
            <div
                style={{
                    zIndex: 9999,
                    padding: 10,
                    justifyContent: "space-between",
                }}
                className={"tooltipCard flexColumn"}
            >
                <span className={"smallTitle"}>
                    {e && e.feature && e.feature.properties.name}
                </span>

                <span className={"bigText"}>
                    {e.feature.data &&
                    e.feature.data.value &&
                    e.feature.data.value}
                </span>
            </div>
        );
    };

    const wordCloudOption = {
        // rotations: 3,
        // rotationAngles: [0, 90],
        padding: 5,
        fontSizes: [5, 50],
        fontWeight: "bold",
        colors: [
            "#1F2A56",
            "#874825",
            "#CFB992",
            "#1D1E1E",
            "#32462F",
            "#D0DB8D",
            "#552B32",
            "#D94646",
            "#F38F37",
        ],
    };

    console.log(props)

    //console.log("year", year)
    //console.log("filteryear", filterYear)
    return (
        <><div>
        
            <div className="ada-container" style={{backgroundColor: "white", borderRadius: 20}}>
                <SignInHeaderSingle
                    type={1}
                    title="Note"
                    profileImage={props.user.user.image}
                    itemName={props.perfume.title}
                />

                {props.perfume ? (
                    <div className={"flexColumn item-container"}>
                        <div className="item-wrapper">
                            <div className="item-image">
                                <img src={props.perfume.image}/>
                            </div>
                            <div className="item-content">
                                {/* <h6 className="item-category">CITRUS SMELLS</h6> */}
                                <div className="item-title-wrapper">
                                    <h2>{props.perfume.title}</h2>
                                    <button className="btn item-type text-uppercase">
                                        {props.perfume.type}
                                    </button>
                                </div>
                                <hr/>

                                <div className="item-description">
                                    <div className="items-row">
                                        {props.creation.creation.notes &&
                                        props.creation.creation.notes.map(
                                            (note, i) =>
                                                <React.Fragment key={i}>
                                                    {note.image && (
                                                        <div className="item-col">
                                                            <div className="text-center">
                                                                <Link
                                                                    href={{
                                                                        pathname: `/ada/note/${note.id}`,
                                                                    }}
                                                                >
                                                                    <a>
                                                                        <img
                                                                            src={
                                                                                note.image
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </Link>

                                                                <Link
                                                                    href={{
                                                                        pathname: `/ada/note/${note.id}`,
                                                                    }}
                                                                >
                                                                    <a>
                                                                        <h6
                                                                            style={{
                                                                                fontSize:
                                                                                    ".735rem",
                                                                            }}
                                                                        >
                                                                            {
                                                                                note.name
                                                                            }
                                                                        </h6>
                                                                    </a>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </React.Fragment>
                                        )}
                                    </div>
                                    <div style ={{display: "flex", justifyContent: "space-between", alignItem : "center", flexDirection : "row", width:"100%", fontSize:"1.05vw", fontFamily:"Cormorant Garamond, serif", fontWeight:"bold",color:"#1F2A56"}}>
                                        <div style ={{display: "flex", flexDirection:"column", width:"100%"}}>
                                            <div > group :  {props.creation.creation.procom.group} </div>
                                            <div > sgmt :  {props.creation.creation.procom.sgmt} </div>
                                            <div > perfumer :  {props.creation.creation.procom.perfumer} </div>
                                            <div> analogy :  {props.creation.creation.procom.analogy} </div>
                                        </div>
                                        <div style ={{display: "flex", flexDirection : "column", width:"100%"}}>
                                            <div> release year :  {props.creation.creation.procom.release_year} </div>
                                            <div style ={{display: "flex", flexDirection : "row"}}>family : / {props.creation.creation.procom.family.map(item1 => {
                                                return <div> {item1}/ </div>
                                            })}</div>
                                            <div style ={{display: "flex", flexDirection : "row"}}>adj : / {props.creation.creation.procom.adj.map(item2 => {
                                                return <span> {item2}/ </span>
                                            })}</div>
                                            <div> effect :  {props.creation.creation.procom.effect} </div>
                                        </div>   
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div style={{ width : "100%", padding : "20px", alignItem : "center", margin : "auto" }}>
                            <div class="row">
                                <div class= "col">
                                    <div className="audience-breakdown">
                                        <h4> Audience Breakdown</h4>
                                        {audience.map((item, i) => (
                                            <div className="audience-col">
                                                <h6>{Object.keys(item)}</h6>
                                                    {Object.keys(item).map(
                                                        (j) => (<><h6>{item[j]["count"]}</h6>
                                                            <h6
                                                                className={
                                                                    item[j][ "percentage"] >= 0
                                                                            ? "positive-value"
                                                                            : "negative-value"
                                                                }>
                                                                {item[j]["percentage"] >= 0
                                                                    ? "+"
                                                                    : "-"}
                                                                {item[j]["percentage"].toFixed(2)} %
                                                            </h6>
                                                            </>
                                                        )
                                                    )}
                                        </div>))}
                                    </div>
                                </div>
                                
                                <div class= "col" >
                                    <div className="success-metrics">
                                        <h4> Success metrics</h4>
                                        <div className="success-col">
                                            <h6>Count</h6>
                                            <h6>{ successMetrics["evolution_count"]}</h6>
                                        </div>
                                        <div className="success-col">
                                            <h6>Reach</h6>
                                            <h6>{successMetrics["reach"]}</h6>
                                        </div>
                                        <div className="success-col">
                                            <h6>Engagement</h6>
                                            <h6>{successMetrics["engagement"]}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class = "col">                           
                                    <div  className="evolution-chart-wrapper">
                                        <div className="evolution-chart-item title">
                                            <h4>
                                                <span>
                                                    Interest in time -{" "}
                                                </span>
                                                <span>
                                                    {props.perfume.title}
                                                </span>
                                            </h4>
                                        </div>


                                        <div className="filter-item">
                                            <div className="filter-item">
                                                <h6>Compare with:  
                                                    <Select
                                                        className="compare-select"
                                                        mode="multiple"
                                                        style={{width: "50%",height:"auto"}}
                                                        placeholder="Please select"
                                                        defaultValue={[]}
                                                        optionFilterProp="children"
                                                        onSelect={
                                                            fetchCompareByPerfume
                                                        }
                                                    onDeselect={compareDeselect}
                                                    filterOption={(input, option) =>
                                                        option.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {children}
                                                    </Select>
                                                </h6>
                                            </div>
                                            <h6>Year: 
                                                <Select
                                                    showSearch
                                                    style={{width: "100%",height:"auto", paddingLeft : "10px"}}
                                                    placeholder="SELECT A YEAR"
                                                    optionFilterProp="children"
                                                    onChange={fetchDataByYear}
                                                    filterOption={(input, option) => option.value.indexOf(input) >= 0}>
                                                    {filterYear.map((year) => (
                                                        <Option value={year[0]}>
                                                            {year[1]}
                                                        </Option>
                                                    ))}
                                                </Select>
                                                {/*<div className="filter-item">
                                                    <h6>Location :
                                                        <Select
                                                        showSearch
                                                        style={{width:"100%", height:"auto", paddingLeft : "10px"}}
                                                        placeholder="SELECT A REGION"
                                                        optionFilterProp="children"
                                                        onChange={fetchDataByCountry}
                                                        filterOption={(input, option) =>
                                                        option.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0}
                                                        value={country}>
                                                        {Object.keys(filterCountry).map(
                                                        (country, i) => (
                                                            <Option value={country}>
                                                                {filterCountry[country]}
                                                            </Option>)
                                                        )}
                                                        </Select>
                                                    </h6>

                                                </div>*/}
                                            </h6>
                                            <ReactApexChart
                                                options={evolutionChartOption}
                                                series={evolutionChartSeries}
                                                type="line"
                                                height={350}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class='row' style ={{alignItem : "center", paddingTop:"20px"}}>
                                <div class="col" >
                                    <div style={{paddingTop:"20px", width : "100%",  borderStyle : "solid", boxSizing:"border-box", borderColor: "#cfb992", height : "100%"}}>
                                        <GeoPerfumeMap
                                            data={props.creation.geograph_series_by_countries}
                                            region={props.creation.geograph_series_by_regions}
                                            style={{margin : "auto", display : "flex", width : "100%"}}
                                        />
                                    </div>
                                </div>
                                <div class="col" >
                                    <div style={{paddingTop:"20px", width : "100%", borderStyle : "solid", boxSizing:"border-box", borderColor: "#cfb992", height : "100%"}}>
                                        <h4> Emotion cloud</h4>
                                        <div style={{ height: "300px",width: "100%",}}>
                                            {emotions.length !== props.creation.emotions_cloud.length ? (
                                            <div className="text-center my-5">
                                                <Spin size="large"/>
                                            </div>) :
                                                emotions.length > 0 && ( <ReactWordcloud
                                                    options={wordCloudOption}
                                                    words={emotions}
                                                    // style={{fontSize: "30px"}}
                                                />)}

                                        </div>
                                            {/* <WordCloud
                                                data={words}
                                                fontSizeMapper={fontSizeMapper}
                                                rotate={rotate}
                                                padding={2}
                                                width={800}
                                                height={300}
                                            /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SignedInFooter/>
                    </div>
                ) : (
                    <h1>Sorry perfume not found </h1>
                )}
            </div>
        </div>
        </>
    );
}

Perfume.getInitialProps = async (ctx) => {
    const today = new Date();
    const year = today.getFullYear();
    let noteId = ctx.query.id;
    // const note = await getNote(noteId, getCookies(ctx, "authToken"));
    const user = await getUser({token: getCookies(ctx, "authToken")});
    const perfume = await getPerfume(noteId, getCookies(ctx, "authToken"));
    const creations = await fetchCreations(getCookies(ctx, "authToken"));
    const creation = await fetchCreation(
        getCookies(ctx, "authToken"),
        year,
        noteId,
        0
    );
    const perfumeList = await fetchPerfumeList(getCookies(ctx, "authToken"));
    // const bestMatch = await fetchPerfumes({offset: 0, limit: 10, token: getCookies(ctx, 'authToken')})
    // const score = await getNoteScore(1, 2010, 'TUN', 'test')
    // const note = await getNote(1, getCookies(ctx, "authToken"));
    // const score = await getNoteScore(1, 2020, getCookies(ctx, "authToken"));

    return {
        perfume,
        user,
        creations,
        creation,
        perfumeList,
        year,
        noteId,
    };
};

export default Perfume;
