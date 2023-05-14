import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import * as XLSX from "xlsx";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import PredictNoteList from "./PredictNoteList";
import HashTags from "./HashTags";
import WordCloud from "react-d3-cloud";
import {getProductDetail} from "../../../api";
import { URI } from "../../../constants/uri";

const ProductDetail = (props) => {
    const [productDetail,setProductDetail] = useState({});
    const [words, setWords] = useState([]);
    const [wordExportData, setWordExportData] = useState([]);
    const [topTenFrequentWords, setTopTenFrequentWords] = useState([]);
    const [notesName, setNotesName] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductDetails();
    }, []);
    useEffect(() => {
        let WordsArray = [];
        words&&words.map((item) => {
            let obj = { word: item.text, frequency: item.value };
            WordsArray.push(obj);
            setWordExportData(WordsArray);
        });
    }, [words]);
    const getProductDetails = async() => {
        setLoading(true);
        const data = await getProductDetail(props.token,props.productId);
        setProductDetail(data);
        let arrWords = [];
        let arrNotesName = [];
        let arrTopTenFrequentWords = [];
        data && data.words && data.words.map((item, i) => {
            let altWords = {};
            altWords = {
                "text": item.word,
                "value": item.frequency
            }
            arrWords.push(altWords);
        })
        data && data.notes && data.notes.map((item, i) => {
            arrNotesName[i] = {
                "NotesName": item.name,
            }
        })
        data && data.topTenFrequentWords && data.topTenFrequentWords.map((item, i) => {
            arrTopTenFrequentWords[i] = {
                "TrendyHashtags": item,
            }
        })
        setWords(arrWords);
        setNotesName(arrNotesName);
        setTopTenFrequentWords(arrTopTenFrequentWords);
        setLoading(false);
    }
    // const fontSizeMapper = word => Math.log2(word.value) * 8;
    const fontSizeMapper = word => word.value*8;
    const exportToCSV = () => {
        var ws_pn = [
            ["Product Name"],[productDetail.product]
        ];
        var ws_pt = [
            ["Percentage of Trendy Notes"],[""+productDetail.trendyNotesPercentage+"%"]
        ];
        var wspn = XLSX.utils.aoa_to_sheet(ws_pn);
        var wspt = XLSX.utils.aoa_to_sheet(ws_pt);
        var wsnt = XLSX.utils.json_to_sheet(notesName);
        var wsht = XLSX.utils.json_to_sheet(topTenFrequentWords);
        var wswords = XLSX.utils.json_to_sheet(wordExportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, wspn, "Product Name");
        XLSX.utils.book_append_sheet(wb, wspt, "Percentage of Trendy Notes");
        XLSX.utils.book_append_sheet(wb, wsnt, "Notes");
        XLSX.utils.book_append_sheet(wb, wsht, "Trendy Hashtags");
        XLSX.utils.book_append_sheet(wb, wswords, "Emotional Cloud");
        XLSX.writeFile(wb, "Product.xlsx");
    };

    return (
        <>
            {loading ? (
                <div className="text-center" style={{marginBottom:80}}>
                    <h2>Loading...</h2>
                </div>
            ) : (
                <Card className="bg-transparent border-0">
                    
                    <div className="client-list-title" style={{display:'flex',alignItems:"center",justifyContent: 'flex-start',flexWrap:'wrap', position: 'relative',color:'#1F2A56', fontSize: 30, fontWeight:700}}>
                        {productDetail&&productDetail.product}
                    </div>
                    <div className={"flexColumn"} style={{position:"absolute",top:20,right:20,alignItems:"center"}}>
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
                    <Row justify="start" style={{marginTop:10}}>
                        <Col lg={3}>
                            <div className={"product-detailCard"}>
                                <img src={productDetail&&URI+productDetail.image} className="img-fluid" style={{width:300,height:300}} />
                                <div style={{display:'flex',marginTop:10,justifyContent: 'center',alignItems:"center",fontFamily: "Cormorant Garamond, serif",color: '#1f2a56',fontSize:17,fontWeight:700}}>
                                    Percentage of Trendy Notes :  {productDetail&&productDetail.trendyNotesPercentage}% 
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} justify="start" gutter={5}>
                            <div className="client-list-title" style={{display:'flex',justifyContent: 'center',alignItems:"center", position: 'relative',color:'#1F2A56', fontSize: 30, fontWeight:700}}>
                                Notes
                            </div>
                            <PredictNoteList notes={productDetail&&productDetail.notes}/>
                            
                        </Col>
                        <Col lg={3} justify="center" gutter={5}>
                            <div className="client-list-title" style={{display:'flex',justifyContent: 'center',alignItems:"center", position: 'relative',color:'#1F2A56', fontSize: 30, fontWeight:700}}>
                                Trendy Hashtags
                            </div>
                            <HashTags topTenFrequentWords={productDetail&&productDetail.topTenFrequentWords}/>
                        </Col>
                        <Col lg={3} justify="start" gutter={5}>
                            <div className="client-list-title" style={{display:'flex',justifyContent: 'center',alignItems:"center", position: 'relative',color:'#1F2A56', fontSize: 30, fontWeight:700}}>
                                Emotional Cloud   
                            </div>
                            <div style={{marginTop: 15, width: '100%', background: '#ffffff'}}>
                                {words ? <WordCloud
                                        data={words}
                                        fontSizeMapper={fontSizeMapper}
                                        padding={0.1}
                                        width={280}
                                        height={330}
                                    />
                                    :""
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}
        </>
        
    );
};

export default ProductDetail;
