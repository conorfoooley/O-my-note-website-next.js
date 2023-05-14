import ProductHeader from "../../components/SignedInHeader/ProductHeader";
import React, {useCallback,useEffect,useState,createContext} from "react";
import * as XLSX from "xlsx";
import {getCookies} from "cookies-next";
import Head from "next/head";
import WordCloud from 'react-d3-cloud';
import countries from "../../utils/world_countries.json";

const ReactApexChart = loadable(() => import('react-apexcharts'));
import loadable from "loadable-components";
import { connect } from "react-redux";
import { Tabs, Select, Space, Spin, Button } from 'antd';
import { ArrowRightOutlined, LeftOutlined, DownloadOutlined } from "@ant-design/icons";
import {privateRoute} from "../../components/privateRoute";
import {Bar, Line, Scatter, Bubble, Doughnut} from 'react-chartjs-2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getDashboardData,getCountries,searchDashboardDataByFilter} from "../../api";
import { getUserProfile } from "../../actions/auth";
import DatePicker from 'react-datepicker';
import SignedInFooter from "../../components/SignedInFooter/SignedInFooter";
import { getMonth, getYear } from 'date-fns';
import {ResponsiveChoropleth} from "@nivo/geo";
import Products from './product';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip,
    Filler,
    ArcElement
  } from 'chart.js';
import Ingredient from "../../components/Ingredient/Ingredient";
import ProductDetail from "./Product/ProductDetail";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Filler, Title, Legend,);

const { TabPane } = Tabs;
const { Option } = Select;
function handleChange(value) {
    console.log(`selected ${value}`);
}
export const UserContext = createContext();
const Dashboard = (props) => {
    const [zoom, setZoom] = useState(100)
    const [movV, setMovV] = useState(0.5)
    const [movH, setMovH] = useState(0.7)
    // const fontSizeMapper = word => Math.log2(word.value) * 20;
    const fontSizeMapper = word => word.value * 17;
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [data, setData] = useState({});
    const [storyTypes, setStoryTypes] = useState([]);
    const [storyPercentage, setStoryPercentage] = useState([]);
    const [usersPerWeek, setUsersPerWeek] = useState([]);
    const [IngredientsItem, setIngredientsItem] = useState([]);
    const [mapData, setMapData] = useState([]);
    const [words, setWords] = useState([]);
    const [selectedNum, setSelectedNum] = useState(0);
    const [altWords, setAltWords] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [showDate, setShowDate] = useState(new Date());
    const [productId, setProductId] = useState(0);
    const [isProductDetail,setIsProductDetail] = useState(false);
    const [CountriesOption, setCountriesOption] = useState({});
    const [countriesArr, setCountriesArr] = useState([]);
    const [usersPerCountryExportData, setUsersPerCountryExportData] = useState([]);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [channel, setChannel] = useState("");
    const [selectedCountries, setSelectedCountries] = useState();
    const [topTenMostSuggestedPerfumes, setTopTenMostSuggestedPerfumes] = useState([]);
    const [wordExportData, setWordExportData] = useState([]);
    
    const funcProductId = (id) => {
        setProductId(id);
        setIsProductDetail(true);
    };
    useEffect(() => {
        getCountriesOption();
        // getData();
        getDataByFilter();
        fetchUserProfile();
        startDate.setDate(28);
    }, []);
    useEffect(() => {
        if (startDate.getDate() == 1) {
            setYear(startDate.getFullYear())
            setMonth(startDate.getMonth() + 1)
        } else {
            setYear("")
            setMonth("")
        }
    }, [startDate]);
    useEffect(() => {
        setYear(year);
        setMonth(month);
        getDataByFilter();
    }, [month,countriesArr,channel]);
    useEffect(() => {
        let WordsArray = [];
        words&&words.map((item) => {
            let obj = { word: item.text, frequency: item.value };
            WordsArray.push(obj);
            setWordExportData(WordsArray);
        });
    }, [words]);
    const fetchUserProfile = () => {
        props.getUserProfileFn(getCookies(null, "authToken"), (res) => {
            res? setProfilePhoto(res.image)
                : null;
        });
    };
    const getData = async() => {
        setLoading(true);
        const data = await getDashboardData(getCookies(null, "authToken"));
        setData(data);
        setUpdateData(data);
        setLoading(false);
    }
    
    const getCountriesOption = async() => {
        const countries = await getCountries(getCookies(null, "authToken"));
        setCountriesOption(countries);
    }
    const getDataByFilter = async() => {
        setLoading(true);
        const dataByFilter = await searchDashboardDataByFilter(year, month, countriesArr, channel, getCookies(null, "authToken"));
        setData(dataByFilter);
        setUpdateData(dataByFilter);
        setLoading(false);
    }
    
    const setUpdateData = (data) =>{
        let arrType = [];
        let arrPercentage = [];
        let arrUserPerWeek = [];
        let arrUserPerCountry = [];
        let arrUsersPerCountryExportData =[];
        let arrWords = [];
        let arrTopTenMostSuggestedPerfumes = [];
        data.storyTypes && data.storyTypes.map((item, i) => {
            arrType.push(item.storyType);
            arrPercentage.push(item.percentage);
        })
        data.usersPerWeek && data.usersPerWeek.map((item, i) => {
            arrUserPerWeek.push(item.users);
        })
        data.usersPerCountry && data.usersPerCountry.map((item, i) => {
            arrUserPerCountry[i] = {
                "id": item.countryId,
                "value": item.users
            }
            arrUsersPerCountryExportData[i] = {
                "country": item.country
            }
        })
        data.mostSelectedNotesWords && data.mostSelectedNotesWords.map((item, i) => {
            arrWords[i] = [];
            item.words && item.words.map((navItem,j)=>{
                let altWords = {};
                altWords = {
                    "text": navItem.word,
                    "value": navItem.frequency
                }
                arrWords[i].push(altWords);
            })
        })
        data.topTenMostSuggestedPerfumes && data.topTenMostSuggestedPerfumes.map((item, i) => {
            arrTopTenMostSuggestedPerfumes[i] = {
                "topTenPerfumes": item,
            }
        })
        setStoryTypes(arrType);
        setStoryPercentage(arrPercentage);
        setUsersPerWeek(arrUserPerWeek);
        setIngredientsItem(data.mostSelectedNotesPercentage);
        setMapData(arrUserPerCountry);
        setUsersPerCountryExportData(arrUsersPerCountryExportData);
        arrWords && setAltWords(arrWords);
        arrWords && setWords(arrWords[selectedNum]);
        setTopTenMostSuggestedPerfumes(arrTopTenMostSuggestedPerfumes);
    }
    
    const handleClick = (e, value) => {
        setSelectedNum(value);
        setWords(altWords[value]);
    }
    const CountriesChange = (e) => {
        setSelectedCountries(e);
        let arr = [];
        e.map((item,i) => {
            arr.push(item.value);
        })
        setCountriesArr(arr);
    }
    const ChannelChange = (e) => {
        setChannel(e);
    }
    const seeAll = () => {
        setYear("");
        setMonth("");
        getData();
        setSelectedCountries([]);
        setChannel("");
        setShowDate(new Date());
    }
    const funcDate = (date) => {
        setStartDate(date);
        setShowDate(date);
    }
    const lineseries= [{
        name: 'number of users',
        data: usersPerWeek
      }];
    const lineoptions= {
        chart: {
          height: 250,
          type: 'line',
          zoom: {
            autoScaleYaxis: true
          },
        },
        colors: ["#552B32"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'weeks',
          categories: ["1st week", "2nd week", "3rd week", "4th week", "5th week"]
        },
        tooltip: {
          x: {
            format: 'week'
          },
        },
      };
    const arcdata = {
        labels: storyTypes,
        datasets: [
            {
                label:"Audience Segments",
                data: storyPercentage,
                backgroundColor: [
                    "#552B32",
                    "#CFB992",
                    "#1F2A56",
                ],
                hoverOffset: 4,
            },
        ],
    };
    const arcconfig = {
        elements: {
            arc: {
                weight:0.5,
                borderWidth:3,
            },
        },
        cutout:"80%",
    };
    const exportToCSV = () => {
        var date = year=="" ? "All":year+"/"+month;
        var ws_date = [
            ["Year/Month"],[date]
        ];
        var wsdate = XLSX.utils.aoa_to_sheet(ws_date);
        var wscountry = XLSX.utils.json_to_sheet(usersPerCountryExportData);
        var ws1 = XLSX.utils.json_to_sheet(data.storyTypes);
        var ws2 = XLSX.utils.json_to_sheet(data.usersPerCountry);
        var ws3 = XLSX.utils.json_to_sheet(data.mostSelectedNotesPercentage);
        var ws4 = XLSX.utils.json_to_sheet(data.mostAddedNotesPercentage);
        var ws5 = XLSX.utils.json_to_sheet(topTenMostSuggestedPerfumes);
        var ws6 = XLSX.utils.json_to_sheet(wordExportData);
        var ws7 = XLSX.utils.json_to_sheet(data.usersPerWeek);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wsdate, "Date");
        XLSX.utils.book_append_sheet(wb, wscountry, "Country");
        XLSX.utils.book_append_sheet(wb, ws1, "Stories Destribution");
        XLSX.utils.book_append_sheet(wb, ws2, "Customers Destribution");
        XLSX.utils.book_append_sheet(wb, ws3, "10 Trendy Notes");
        XLSX.utils.book_append_sheet(wb, ws4, "Top 10 Added Notes");
        XLSX.utils.book_append_sheet(wb, ws5, "Top 10 Perfumes");
        XLSX.utils.book_append_sheet(wb, ws6, "Emotional Cloud");
        XLSX.utils.book_append_sheet(wb, ws7, "Users Per Week");
        XLSX.writeFile(wb, "Summary.xlsx");
    };
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
    return (
        <>
        <div style={{height: '100%', backgroundColor:'white' , borderRadius:20}}>
            <ProductHeader title='Note' profileImage={profilePhoto}/>
            <div className={'flexColumn'} >
                <div style={{justifyContent: 'space-between', position: 'relative', margin: '1% 1% 1% 1%', padding: '0 30px 10px 30px', border:'solid',borderWidth:2,borderColor:'#eaeaea',borderRadius:20}}>
                    <Tabs tabPosition={'top'}>                        
                        <TabPane tab="Summary" key="1">
                            <div className="client-list">
                                <div className={"flexColumn"} style={{position:"absolute",justifyContent:'space-between',top:20,right:20,alignItems:"center"}}>
                                    <Button
                                        shape="round"
                                        size="small"
                                        className="filter-btn"
                                        onClick={exportToCSV}
                                        style={{fontSize:15, fontWeight: '800', fontSize: '20px', height: '32px',  display: 'flex', alignItems: 'center'}}
                                    >
                                        <DownloadOutlined />
                                        Export Excel
                                    </Button>
                                </div>
                                <div style={{display:'flex', justifyContent: 'flex-start', margin: '2% 0 0 4%'}}>                                    
                                    <Button
                                        shape="round"
                                        size="small"
                                        className="filter-btn"
                                        onClick={seeAll}
                                        style={{fontSize:15, fontWeight: '800', fontSize: '20px', height: '32px',  display: 'flex', alignItems: 'center'}}
                                    >
                                        SeeAll
                                    </Button>
                                    <div className="client-list-title" style={{paddingTop:2,paddingLeft:20,marginRight:5, fontSize: 20,fontWeight: 800, color:'#cfb992'}}>Month/Year:</div>
                                    <DatePicker
                                        style={{marginTop: 20}}
                                        selected={showDate}
                                        onChange={(date) => funcDate(date)}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                    />
                                    <div className="client-list-title" style={{paddingTop:2,paddingLeft:20,marginRight:5, fontSize: 20, fontWeight: 800, color:'#cfb992'}}>Country:</div>
                                    <Select
                                        mode="multiple"
                                        placeholder="Select Countries"
                                        style={{ minWidth: 150, width: "auto" }}
                                        //defaultValue={}
                                        // onSearch={fetchNotes}
                                        labelInValue
                                        value={selectedCountries}
                                        notFoundContent={
                                            <Spin size="small" />
                                        }
                                        filterOption={false}
                                        onChange={(e) => {
                                            CountriesChange(e);
                                        }}
                                    >
                                        {CountriesOption.countries&&CountriesOption.countries.map((item,i) => (
                                            <Option key={i} value={item}>
                                                {item}
                                            </Option>
                                        ))}
                                        
                                    </Select>
                                    <div className="client-list-title" style={{paddingTop:2,paddingLeft:20,marginRight:5, fontSize: 20, fontWeight: 800, color:'#cfb992'}}>Channel:</div>
                                    <Select
                                        showSearch
                                        style={{ minWidth: 120 }}
                                        placeholder="Select a Channel"
                                        optionFilterProp="children"
                                        value={channel}
                                        onChange={(e) => {
                                            ChannelChange(e);
                                        }}
                                        // defaultValue={""}
                                        // filterOption={(input, option) =>
                                        //     option.children
                                        //         .toLowerCase()
                                        //         .indexOf(input.toLowerCase()) >= 0
                                        // }
                                    >
                                        <Option value="store">Store</Option>
                                        <Option value="ecommerce">Ecommerce</Option>
                                    </Select>
                                </div>
                                {loading ? (
                                    <div className="text-center" style={{marginTop:100, marginBottom:100}}>
                                        <h2>Loading...</h2>
                                    </div>
                                ) : (
                                    <>                                    
                                        <Row style={{ position: 'relative', margin: '1% 1% 1% 1%'}}>
                                            <Col className="dashboard-card"><Row>Add to basket</Row><Row>0</Row></Col>
                                            <Col className="dashboard-card"><Row>Users</Row><Row>{data.users}</Row></Col>
                                            <Col className="dashboard-card"><Row>Shares</Row><Row>0</Row></Col>
                                            <Col className="dashboard-card"><Row>Recommends</Row><Row>NA</Row></Col>
                                            <Col className="dashboard-card"><Row>Total time spend</Row><Row>0</Row></Col>
                                            <Col className="dashboard-card"><Row>Likes</Row><Row>0</Row></Col>
                                            <Col className="dashboard-card"><Row>Average time spend by user</Row><Row>0</Row></Col>
                                        </Row>
                                        <div style={{margin:10 , position: 'relative', margin: '0 5% 0 5% '}}>
                                            <Row>
                                                <Col md={4} className={"interestCard"}>
                                                    <div className="client-list-title" style={{color:'#1F2A56',fontSize: 35, fontWeight:600, paddingLeft:15, paddingBottom:15}}>Stories Destribution</div>
                                                    <Doughnut data={arcdata} width={50} height={50} options={arcconfig} />
                                                    
                                                </Col>
                                                <Col md={7} style={{marginLeft:15}} className={"interestCard"}>
                                                    <div className="client-list-title" style={{color:'#1F2A56',fontSize: 35, fontWeight:600, paddingLeft:15, paddingBottom:15}}>Customers Destribution</div>
                                                    <div style={{position: 'relative', width: '100%', height: "347px"}}>
                                                        <MyResponsiveChoropleth data={mapData}/>
                                                    </div>
                                                    {/* <div className="map-indicate"></div>
                                                    <div className="map-number">
                                                        <div>0</div>
                                                        <div>10</div>
                                                        <div>20</div>
                                                        <div>30</div>
                                                        <div>40</div>
                                                        <div>50</div>
                                                        <div>60</div>
                                                        <div>70</div>
                                                        <div>80</div>
                                                        <div>90</div>
                                                        <div>100</div>
                                                    </div> */}
                                                    <div
                                                        className={"flexRow"}
                                                        style={{
                                                            justifyContent: "space-between",
                                                            margin: "10px 0px 0px 0px",
                                                        }}
                                                    >
                                                        <span className={"smallTitle"}>
                                                        </span>
                                                        <div style={{ width: "73%" }}>
                                                            <div className={"Rectangle"} />
                                                            <div
                                                                className={"flexRow legendNumbers"}
                                                                style={{ justifyContent: "space-between" }}
                                                            >
                                                                <span>0</span>
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
                                                    <div className="map-text"
                                                        style={{
                                                            position: "absolute",
                                                            left: 10,
                                                            bottom: 10,
                                                            zIndex: 888,
                                                            border: '1px solid #ebebeb'
                                                        }}
                                                    >
                                                        {
                                                            data.topTenCountries ? data.topTenCountries.map((item, index) => {
                                                                return (
                                                                    <div key={index} className="map-text-content">
                                                                        <div className="map-text-country">
                                                                            <div className="map-text-country-name">{item.country+""}</div>
                                                                            <div>{item.percentage}%</div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                )
                                                            })
                                                            : ""
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className={"interestCard"} style={{marginRight: '15px'}} >
                                                    <div className="client-list-title" style={{justifyContent: 'center', position: 'relative',color:'#1F2A56', fontSize: 35, fontWeight:700, paddingLeft:15}}>10 Trendy Notes</div>
                                                    {
                                                        IngredientsItem ? IngredientsItem.map((data, index) => {
                                                            return (
                                                                <div key={index} onClick={event => handleClick(event,index)}>
                                                                    <Ingredient ingredientData={data} />
                                                                </div>
                                                            )
                                                        })
                                                        : ""
                                                    }
                                                </Col>
                                                <Col className={"interestCard"}>
                                                    <div className="client-list-title" style={{justifyContent: 'center', position: 'relative',color:'#1F2A56', fontSize: 35, fontWeight:700, paddingLeft: 15}}>Emotional Cloud</div>
                                                    {process.browser && words &&
                                                        <WordCloud
                                                        data={words}
                                                        fontSizeMapper={fontSizeMapper}
                                                        padding={0.1}
                                                        width={500}
                                                        height={500}
                                                    />}
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-center">
                                                <Col md={5} className={"interestCard"} style={{marginRight:'15px'}}>
                                                    <div className="client-list-title" style={{justifyContent: 'center', position: 'relative',color:'#1F2A56', fontSize:35, fontWeight:700, }}>Top 10 Perfumes</div>
                                                        {
                                                            data.topTenMostSuggestedPerfumes ? data.topTenMostSuggestedPerfumes.map((item, index) => {
                                                                return (
                                                                    <div key={index} className="top-added-notes">
                                                                        <div className="added-notes-title">{item}</div>
                                                                    </div>
                                                                )
                                                            })
                                                            : ""
                                                        }
                                                </Col>
                                                <Col md={5} className={"interestCard"}>
                                                    <div className="client-list-title" style={{justifyContent: 'center', position: 'relative',color:'#1F2A56', fontSize:35, fontWeight:700}}>Top 10 Added Notes</div>
                                                        {
                                                            data.mostAddedNotesPercentage ? data.mostAddedNotesPercentage.map((item, index) => {
                                                                return (
                                                                    <div key={index} className="top-added-notes">
                                                                        <div className="added-notes-title">{item.note}</div>
                                                                        <div className="ingredient-value">
                                                                            <span>{ item.percentage }</span>
                                                                            <div className="ingredient-percent">
                                                                                <div className="process" style={{width: `${item.percentage}%`}}></div>
                                                                                <div className="non-process"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            : ""
                                                        }
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-center">
                                                <Col md={8} className={"interestCard"}>
                                                    <div className="client-list-title" style={{justifyContent: 'center', position: 'relative',color:'#1F2A56', fontSize:35, fontWeight:700}}>Users PerWeek</div>
                                                    <ReactApexChart options={lineoptions} series={lineseries} type="line" height={300} />
                                                </Col>  
                                            </Row>
                                        </div>
                                    </>
                                )}
                            </div>
                            <SignedInFooter />
                        </TabPane>
                        <TabPane tab="Products" key="2">
                        {!isProductDetail?
                            <UserContext.Provider value={funcProductId}>
                                <Products/>
                            </UserContext.Provider>
                            :
                            <>
                                <Button
                                    type="link"
                                    shape="round"
                                    size="large"
                                    className="product-detail-back-btn"
                                    onClick={() => setIsProductDetail(false)}
                                >
                                    <LeftOutlined />
                                    <span>Back</span>
                                </Button>
                                <ProductDetail productId={productId} token={getCookies(null, "authToken")}/>
                            </>
                        }
                        </TabPane> 
                    </Tabs>
                </div>
            </div>
        </div>
        </>
    )

}


const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfileFn: (token, fn) => dispatch(getUserProfile(token, fn)),
    };
};

export default privateRoute(
    connect(null, mapDispatchToProps)(Dashboard)
);
