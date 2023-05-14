import React, {useState} from "react";

import {getCookies} from "cookies-next";
import Suggsetion from "../../../components/suggestion";
// import SignedInHeader from "../../../components/SignedInHeader/SignedInHeader";
import SignInHeaderSingle from "../../../components/SignInHeaderSingle/SignInHeaderSingle";
import SignedInFooter from "../../../components/SignedInFooter/SignedInFooter";
import {
    fetchCreations,
    fetchNoteList,
    fetchNotes,
    fetchScentFamily,
    getNote,
    getNoteScore,
    getNoteScoreByMonth,
    getUser,
    storeScent,
} from "../../../api";

import GeoNoteMap from "../../../components/choropleth_map/GeoNoteMap";
import loadable from "loadable-components";
import {Button, Card, Form, Input, Modal, Select, Space, Spin, Tabs,} from "antd";
import {LeftOutlined, RightOutlined,} from "@ant-design/icons";

const ReactApexChart = loadable(() => import("react-apexcharts"));
const {TabPane} = Tabs;
const {Option} = Select;

function Note(props) {
    // console.log(props.scoreByMonth);

    let evolutionSeries = [];
    props.scoreByMonth.map((item) => {
        evolutionSeries.push(item.score);
    });

    // console.log(props.note);

    const [filterCountry, setFilterCountry] = useState(
        props.creations.countries
    );

    const [filterYear, setFilterYear] = useState(props.creations.years);

    const [fullDescription, setFullDescription] = useState(false);

    const [filters, setFilters] = useState(true)

    const [noteList, setNoteList] = useState(props.noteList);

    const [scents, setScents] = useState(props.note.scents);

    const today = new Date();
    const currenctYear = today.getFullYear();

    const [country, setCountry] = useState(0);
    const [year, setYear] = useState(currenctYear);

    // Scent State Variable
    const [scent, setScent] = useState("");
    const [scentData, setScentData] = useState({});
    const [scentFamily, setScentFamily] = useState(props.scentFamily.results);
    const [scentLoader, setScentLoader] = useState(false);

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

    const [evolutionChartSeries, setEvolutionChartSeries] = useState([
        {
            name: props.note.name,
            data: evolutionSeries,
            id: props.note.id,
        },
    ]);

    const children = [];
    noteList.results.forEach((element) => {
        if (element.id !== props.note.id)
            children.push(<Option key={element.id}>{element.name}</Option>);
    });

    const fetchDataByCountry = async (value) => {
        setCountry(value);

        const scoreByMonth = await getNoteScoreByMonth(
            props.note.id,
            year,
            getCookies(null, "authToken"),
            country
        );

        // // console.log(creation);
        // console.log(scoreByMonth);

        setEvolutionChartSeries([
            {
                name: props.note.name,
                data: scoreByMonth.map((item) => item.score),
            },
        ]);
    };

    const fetchDataByYear = async (value) => {
        setYear(value);

        const scoreByMonth = await getNoteScoreByMonth(
            props.note.id,
            year,
            getCookies(null, "authToken"),
            country
        );

        // // console.log(creation);
        console.log(scoreByMonth);

        setEvolutionChartSeries([
            {
                name: props.note.name,
                data: scoreByMonth.map((item) => item.score),
            },
        ]);
    };

    const fetchCompareByPerfume = async (value) => {
        // console.log(value);

        if (value.length) {
            const note = await getNote(value, getCookies(null, "authToken"));

            // console.log(note);

            const scoreByMonth = await getNoteScoreByMonth(
                note.id,
                year,
                getCookies(null, "authToken"),
                country
            );

            if (scoreByMonth !== undefined && scoreByMonth.length) {
                setEvolutionChartSeries([
                    ...evolutionChartSeries,
                    {
                        name: note.name,
                        data: scoreByMonth.map((item) => item.score),
                        id: value,
                    },
                ]);
            }
        } else {
            setEvolutionChartSeries([
                {
                    name: props.note.name,
                    data: evolutionSeries,
                },
            ]);
        }
    };

    const compareDeselect = (value) => {
        // console.log(value);

        const newSeries = evolutionChartSeries.filter(
            (item) => item["id"] !== value
        );

        setEvolutionChartSeries(newSeries);
    };

    const storeAssosiateScent = async () => {
        setScentLoader(true);

        const store = await storeScent(getCookies(null, "authToken"), {
            volatility: scentData.volatility,
            stability: scentData.stability,
            aspect: scentData.aspect,
            allergens: scentData.allergens,
            associatedmemories: scentData.associatedmemories,
            casnumber: scentData.casnumber,
            einecs: scentData.einecs,
            fema: scentData.fema,
            ifra: scentData.ifra,
            // note: scentData.note,
            note: props.note.id,
            family: scentData.family,
            subfamily: scentData.subfamily,
            subingredients: scentData.subingredients,
        });

        if (store) {
            setScentLoader(false);
            setScentData({});

            setScents([
                ...scents,
                store
            ])

            // window.location.reload();
        }
    };

    console.log(props.note);


    return (
        <div className="ada-container">
            <SignInHeaderSingle
                type={1}
                title="Note"
                profileImage={props.user.user.image}
                itemName={props.note.name}
            />
            {props.note ? (
                <div className={"flexColumn item-container"}>
                    <div
                        className="item-wrapper"
                        style={{marginBottom: "20px"}}
                    >
                        <div
                            className="item-image"
                            style={{maxHeight: "400px"}}
                        >
                            <img
                                src={props.note.featured_image.image}
                                style={{
                                    // width: "100% !important",
                                    height: "300px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                        <div className="item-content">
                            {/* <h6 className="item-category">CITRUS SMELLS</h6> */}
                            <div className="item-title-wrapper">
                                <h2>{props.note.name}</h2>
                                <button className="btn item-type text-uppercase">
                                    {props.note.type === "note"
                                        ? "INGREDIENT"
                                        : null}
                                </button>
                            </div>
                            <hr/>

                            <div className="item-description">
                                {/* {fullDescription
                                    ? props.note.description
                                    : props.note.description.substr(0, 500)} */}
                                <div className="item-scroller-btn">
                                    <Button shape="circle" size="large" onClick={() => {
                                        const perfumeRow = document.querySelector('.perfume-row')
                                        if (perfumeRow.scrollLeft > 0) {
                                            perfumeRow.scrollLeft -= 100
                                        }
                                    }}>
                                        <span className="btn-icon">
                                            <LeftOutlined/>
                                        </span>
                                    </Button>

                                    <Button shape="circle" size="large" onClick={() => {
                                        const perfumeRow = document.querySelector('.perfume-row')
                                        if (perfumeRow.scrollLeft != perfumeRow.scrollWidth) {
                                            perfumeRow.scrollLeft += 100
                                        }
                                    }}>
                                        <span className="btn-icon">
                                            <RightOutlined/>
                                        </span>
                                    </Button>
                                </div>


                                <div className="perfume-row">
                                    {props.note.parfumes &&
                                    props.note.parfumes.map(
                                        (perfume) =>
                                            perfume.image && (
                                                <div className="item-col">
                                                    <div className="text-center">
                                                        {/* <Link
                                                                href={{
                                                                    pathname: `/ada/perfume/${perfume.pk}`,
                                                                }}
                                                            >
                                                                <a>
                                                                    <img
                                                                        src={
                                                                            perfume.image
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            </Link>

                                                            <Link
                                                                href={{
                                                                    pathname: `/ada/perfume/${perfume.pk}`,
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
                                                                            perfume.title
                                                                        }
                                                                    </h6>
                                                                </a>
                                                            </Link> */}

                                                        <img
                                                            src={
                                                                perfume.image
                                                            }
                                                            alt=""
                                                        />

                                                        <h6
                                                            style={{
                                                                fontSize:
                                                                    ".735rem",
                                                            }}
                                                        >
                                                            {perfume.title}
                                                        </h6>
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>

                            {/* <div className="text-right">
                                <button
                                    className="btn btn-link btn-load-more"
                                    onClick={() =>
                                        setFullDescription(!fullDescription)
                                    }
                                >
                                    {fullDescription
                                        ? "Load less"
                                        : "Load more"}
                                </button>
                            </div> */}
                        </div>
                    </div>

                    <div className="filter-content">
                        <div
                            className={"flexRow filter-items"}
                            style={{
                                justifyContent: "flex-end",
                                marginTop: "50px",
                                marginBottom: "30px",
                            }}
                        >
                            {filters && (
                                <>
                                    <div className="filter-item">
                                        <h6>Location :</h6>

                                        <Select
                                            showSearch
                                            style={{
                                                width: 220,
                                                marginRight: "20px",
                                            }}
                                            placeholder="SELECT A REGION"
                                            optionFilterProp="children"
                                            onChange={fetchDataByCountry}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {Object.keys(filterCountry).map(
                                                (country, i) => (
                                                    <Option value={country}>
                                                        {filterCountry[country]}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    </div>

                                    <div className="filter-item">
                                        <h6>Year :</h6>

                                        <Select
                                            showSearch
                                            style={{width: 220}}
                                            placeholder="SELECT A YEAR"
                                            optionFilterProp="children"
                                            onChange={fetchDataByYear}
                                            filterOption={(input, option) =>
                                                option.value.indexOf(input) >= 0
                                            }
                                        >
                                            {filterYear.map((year) => (
                                                <Option value={year[0]}>
                                                    {year[1]}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </>
                            )}
                        </div>

                        <div
                            style={{
                                justifyContent: "space-between",
                            }}
                        >
                            <Tabs
                                onChange={(key) => {
                                    if (key == 1) {
                                        setFilters(true)
                                    } else {
                                        setFilters(false)
                                    }
                                }}
                                tabPosition={"left"}
                                style={{
                                    fontFamily: "Cormorant Garamond",
                                    color: "#1f2a56",
                                    fontWeight: 600,
                                    fontSize: "20px",
                                }}
                            >
                                <TabPane tab="Evolution Chart" key="1">
                                    <div className="evolution-chart-wrapper">
                                        <div className="evolution-chart-item title">
                                            <h4>
                                                <span>Interest in time - </span>
                                                <span>{props.note.name}</span>
                                            </h4>
                                        </div>

                                        <div className="evolution-chart-item compare">
                                            <div className="compare-label">
                                                <h6>Compare with:</h6>
                                            </div>

                                            <Select
                                                className="compare-select"
                                                mode="multiple"
                                                style={{width: "100%"}}
                                                placeholder="Please select"
                                                defaultValue={[]}
                                                optionFilterProp="children"
                                                onSelect={fetchCompareByPerfume}
                                                onDeselect={compareDeselect}
                                                filterOption={(input, option) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >=
                                                    0
                                                }
                                            >
                                                {children}
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <div style={{width: "70%"}}>
                                            <ReactApexChart
                                                options={evolutionChartOption}
                                                series={evolutionChartSeries}
                                                type="line"
                                                height={350}
                                            />
                                        </div>
                                        <div style={{width: "30%"}}>
                                            <div
                                                className={
                                                    "interestCardNote flexColumn w-100"
                                                }
                                            >
                                                <div className={"smallTitle"}>
                                                    Best Matches
                                                </div>
                                                <div
                                                    style={{
                                                        marginTop: 20,
                                                        maxHeight: 300,
                                                        overflow: "auto",
                                                    }}
                                                >
                                                    {props.note &&
                                                    props.note
                                                        .best_match_notes &&
                                                    props.note.best_match_notes.map(
                                                        (elem) => (
                                                            <Suggsetion
                                                                id={elem.id}
                                                                name={
                                                                    elem.name
                                                                }
                                                                image={
                                                                    elem.featured_image &&
                                                                    elem
                                                                        .featured_image
                                                                        .image
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>

                                <TabPane
                                    tab="Geographical Distrubition"
                                    key="2"
                                >
                                    <GeoNoteMap
                                        data={props.score}
                                        region={props.score}
                                    />
                                </TabPane>
                                <TabPane tab="Associated scent(s)" key="3">
                                    <div className="associate-input">
                                        <Input
                                            placeholder="Please add an associated scent to this smell then hit enter"
                                            value={scent}
                                            onChange={(e) => {
                                                setScent(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    setScent("");
                                                    setScentData({
                                                        name: scent,
                                                        modal: true,
                                                        volatility: "",
                                                        stability: "",
                                                        aspect: "",
                                                        allergens: "",
                                                        associatedmemories: "",
                                                        casnumber: "",
                                                        einecs: "",
                                                        fema: "",
                                                        ifra: "",
                                                        creation_datetime: "",
                                                        note: props.note.id,
                                                        family: null,
                                                        subfamily: null,
                                                        subingredients: null,
                                                    });
                                                    // console.log(scents);
                                                }
                                            }}
                                        />

                                        <div className="scent-container">
                                            {scents &&
                                            scents.sort().map((scent) => (
                                                <div className="scent-item">
                                                    <Card>
                                                        <p>
                                                            Allergens :{" "}
                                                            {scent.allergens
                                                                ? scent.allergens
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Aspect :{" "}
                                                            {scent.aspect
                                                                ? scent.aspect
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Associatedmemories
                                                            :{" "}
                                                            {scent.associatedmemories
                                                                ? scent.associatedmemories
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Casnumber :{" "}
                                                            {scent.casnumber
                                                                ? scent.casnumber
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Creation_datetime
                                                            :{" "}
                                                            {scent.creation_datetime
                                                                ? scent.creation_datetime
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Einecs :{" "}
                                                            {scent.einecs
                                                                ? scent.einecs
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Family :{" "}
                                                            {scent.family
                                                                ? scent.family
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Fema :{" "}
                                                            {scent.fema
                                                                ? scent.fema
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Ifra :{" "}
                                                            {scent.ifra
                                                                ? scent.ifra
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Note :{" "}
                                                            {scent.note
                                                                ? scent.note
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Stability :{" "}
                                                            {scent.stability
                                                                ? scent.stability
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Subfamily :{" "}
                                                            {scent.subfamily
                                                                ? scent.subfamily
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Subingredients :{" "}
                                                            {scent.subingredients
                                                                ? scent.subingredients
                                                                : "N/A"}
                                                        </p>
                                                        <p>
                                                            Volatility :{" "}
                                                            {scent.volatility
                                                                ? scent.volatility
                                                                : "N/A"}
                                                        </p>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Modal
                                        title="Associated scent(s)"
                                        centered
                                        visible={scentData.modal}
                                        // closable={false}
                                        onCancel={() => {
                                            setScent("");
                                            setScentData({});
                                            console.log(scent, scentData);
                                        }}
                                        okButtonProps={{
                                            style: {display: "none"},
                                        }}
                                        // cancelButtonProps={{
                                        //     style: { display: "none" },
                                        // }}
                                    >
                                        {!scentLoader ? (
                                            <div className="scent-form">
                                                <Form
                                                    onFinish={
                                                        storeAssosiateScent
                                                    }
                                                >
                                                    <Input
                                                        placeholder="Volatility"
                                                        value={
                                                            scentData.volatility
                                                        }
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                volatility:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />

                                                    <Input
                                                        placeholder="Stability"
                                                        value={
                                                            scentData.stability
                                                        }
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                stability:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />

                                                    <Input
                                                        placeholder="Aspect"
                                                        value={scentData.aspect}
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                aspect:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Allergens"
                                                        value={
                                                            scentData.allergens
                                                        }
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                allergens:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Associatedmemories"
                                                        value={
                                                            scentData.associatedmemories
                                                        }
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                associatedmemories:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Casnumber"
                                                        value={
                                                            scentData.casnumber
                                                        }
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                casnumber:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Einecs"
                                                        value={scentData.einecs}
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                einecs:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Fema"
                                                        value={scentData.fema}
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                fema:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Ifra"
                                                        value={scentData.ifra}
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                ifra:
                                                                e.target
                                                                    .value,
                                                            });
                                                        }}
                                                    />

                                                    {/* <Select
                                                    showSearch
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: "20px",
                                                    }}
                                                    placeholder="SELECT A NOTE"
                                                    optionFilterProp="children"
                                                    onChange={(e) => {
                                                        setScentData({
                                                            ...scentData,
                                                            note: e,
                                                        });
                                                    }}
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        option.children
                                                            .toLowerCase()
                                                            .indexOf(
                                                                input.toLowerCase()
                                                            ) >= 0
                                                    }
                                                >
                                                    {noteList.results.map(
                                                        (note) => (
                                                            <Option
                                                                value={note.id}
                                                            >
                                                                {note.name}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select> */}

                                                    <Select
                                                        showSearch
                                                        style={{
                                                            width: "100%",
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                        placeholder="SELECT A SCENT FAMILY"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                family: e,
                                                            });
                                                        }}
                                                    >
                                                        {scentFamily.map(
                                                            (member) => (
                                                                <Option
                                                                    value={
                                                                        member.id
                                                                    }
                                                                >
                                                                    {
                                                                        member.name
                                                                    }
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>

                                                    <Select
                                                        showSearch
                                                        style={{
                                                            width: "100%",
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                        placeholder="SELECT A SCENT SUB FAMILY"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                subfamily: e,
                                                            });
                                                        }}
                                                    >
                                                        {scentFamily.map(
                                                            (member) => (
                                                                <Option
                                                                    value={
                                                                        member.id
                                                                    }
                                                                >
                                                                    {
                                                                        member.name
                                                                    }
                                                                </Option>
                                                            )
                                                        )}
                                                    </Select>

                                                    <Select
                                                        showSearch
                                                        style={{
                                                            width: "100%",
                                                            marginBottom:
                                                                "20px",
                                                        }}
                                                        placeholder="SELECT A SUBINGREDIENTS"
                                                        optionFilterProp="children"
                                                        onChange={(e) => {
                                                            setScentData({
                                                                ...scentData,
                                                                subingredients: e,
                                                            });
                                                        }}
                                                    >
                                                        <Option value="null">
                                                            -----
                                                        </Option>
                                                    </Select>

                                                    <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <Space size="large">
                                                    <Spin
                                                        size="large"
                                                        tip="Loading..."
                                                    />
                                                </Space>
                                            </div>
                                        )}
                                    </Modal>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>

                    <SignedInFooter/>
                </div>
            ) : (
                <h1>Sorry note not found </h1>
            )}
        </div>
    );
}

Note.getInitialProps = async (ctx) => {
    // console.log(ctx);
    const today = new Date();
    const year = today.getFullYear();
    let noteId = ctx.query.id;
    // console.log(noteId, "note id");
    const note = await getNote(noteId, getCookies(ctx, "authToken"));
    const user = await getUser({token: getCookies(ctx, "authToken")});

    const noteList = await fetchNoteList(getCookies(ctx, "authToken"));

    const bestMatch = await fetchNotes({
        offset: 0,
        limit: 10,
        token: getCookies(ctx, "authToken"),
    });
    const score = await getNoteScore(
        noteId,
        year,
        getCookies(ctx, "authToken")
    );

    const scoreByMonth = await getNoteScoreByMonth(
        noteId,
        year,
        getCookies(ctx, "authToken"),
        0
    );

    const creations = await fetchCreations(getCookies(ctx, "authToken"));

    const scentFamily = await fetchScentFamily(getCookies(ctx, "authToken"));

    return {
        note,
        bestMatch,
        score,
        user,
        creations,
        scoreByMonth,
        noteList,
        scentFamily,
    };
};

export default Note;
