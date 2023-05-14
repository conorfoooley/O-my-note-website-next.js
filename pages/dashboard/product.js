import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Select, Spin } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
    getNotes,
    getPerfumes,
    searchInNotes,
    searchInPerfumes,
    searchInBrands,
} from "../../actions/notes";
import {getCookies} from "cookies-next";
import { privateRoute } from "../../components/privateRoute";
import { connect } from "react-redux";
import {getProduct,getBrands,searchProductsByFilter} from "../../api";
import Separator from "../../components/Separator/Separator";
import SignedInFooter from "../../components/SignedInFooter/SignedInFooter";
import FloatCard from "../../components/FloatCard/FloatCard";
import ProductCardGroup from "./ProductCardGroup";
import { capitalizeFLetter } from "../../utils/helpers";
import { AppContext } from '../../Context/AppContext';
import ReactPaginate from 'react-paginate';

const { Option } = Select;

// function getInitialProps(ctx) {
//     return { ctx };
// }
const Products = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [productsArr,setProductsArr] = useState([]);
    const {products, setProducts} = useContext(AppContext);
    const {totalPages_, setTotalPages_} = useContext(AppContext);
    const {currentPage, setCurrentPage} = useContext(AppContext);
    const [brandsOption, setBrandsOption] = useState([]);
    const [brands, setBrands] = useState([]);
    const [gender, setGender] = useState();
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState();
    const [selectedBrands, setSelectedBrands] = useState();

    useEffect(() => {
        // currentPage!=1? setPage(currentPage):setPage(1);
        getBrandsOption();
        getProducts();
    }, []);
    useEffect(() => {
        setProductsArr(products);
        setTotalPages(totalPages_);
    }, [products]);
    useEffect(() => {
        getProductsByFilter();
    }, [page,brands,gender,categories]);
    
    const seeAll = () => {
        setBrands([]);
        setSelectedBrands([]);
        setGender(null);
        setCategories([]);
        setSelectedCategories([]);
        setCurrentPage(1);
        getProducts();
    }
    const getProducts = async() => {
        setLoading(true);
        const data = await getProduct(page,getCookies(null, "authToken"));
        setProductsArr(data.products);
        setTotalPages(data.pages);
        setLoading(false);
    }
    const getProductsByFilter = async() => {
        setLoading(true);
        const dataByFilter = await searchProductsByFilter(page,brands,gender,categories,getCookies(null, "authToken"));
        setProductsArr(dataByFilter.products);
        setTotalPages(dataByFilter.pages);
        setLoading(false);
    }
    const getBrandsOption = async() => {
        const brandsoption = await getBrands(getCookies(null, "authToken"));
        setBrandsOption(brandsoption);
    }
    const brandsOnChange = (e) => {
        setSelectedBrands(e);
        let arr = [];
        e.map((item,i) => {
            arr.push(item.value);
        })
        setBrands(arr);
    }
    const categoriesOnChange = (e) => {
        setSelectedCategories(e);
        let arr = [];
        e.map((item,i) => {
            arr.push(item.value);
        })
        setCategories(arr);
    }
    const genderOnChange = (e) => {
        setGender(e);
    }
    const handlePageClick = (event) => {
        setPage(event.selected+1);
        setCurrentPage(event.selected+1);
    }
      return (
        <div>
            <div className="products-filter" style={{display:'flex', justifyContent: 'flex-start', margin: '2% 0 2% 3%'}}>
                <Button
                    shape="round"
                    size="small"
                    className="filter-btn"
                    onClick={seeAll}
                    style={{fontSize:15, fontWeight: '800', fontSize: '20px', height: '32px', display: 'flex', alignItems: 'center'}}
                >
                    SeeAll
                </Button>
                <div className="client-list-title" style={{paddingTop:2,paddingLeft:20,marginRight:5, fontSize: 20, fontWeight: 800, color:'#cfb992'}}>Brands:</div>
                <Select
                    mode="multiple"
                    placeholder="Select Brands"
                    style={{ minWidth: 150, width: "auto" }}
                    //defaultValue={}
                    // onSearch={fetchNotes}
                    labelInValue
                    value={selectedBrands}
                    notFoundContent={
                        <Spin size="small" />
                    }
                    filterOption={false}
                    onChange={(e) => {
                        brandsOnChange(e);
                    }}
                >
                    {brandsOption.brands&&brandsOption.brands.map((item,i) => (
                        <Option key={i} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <div className="client-list-title" style={{paddingTop:2,paddingLeft:20,marginRight:5, fontSize: 20, fontWeight: 800, color:'#cfb992'}}>Gender:</div>
                <Select
                    showSearch
                    style={{ minWidth: 120 }}
                    placeholder="Select a Gender"
                    optionFilterProp="children"
                    onChange={(e) => {
                        genderOnChange(e);
                    }}
                    value={gender}
                    // filterOption={(input, option) =>
                    //     option.children
                    //         .toLowerCase()
                    //         .indexOf(input.toLowerCase()) >= 0
                    // }
                >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="unisex">Unisex</Option>
                </Select>
                <div className="client-list-title" style={{paddingTop:2,paddingLeft:20,marginRight:5, fontSize: 20, fontWeight: 800, color:'#cfb992'}}>Categories:</div>
                <Select
                    mode="multiple"
                    placeholder="Select Categories"
                    style={{ minWidth: 150, width: "auto" }}
                    //defaultValue={}
                    // onSearch={fetchNotes}
                    labelInValue
                    value={selectedCategories}
                    notFoundContent={
                        <Spin size="small" />
                    }
                    filterOption={false}
                    onChange={(e) => {
                        categoriesOnChange(e);
                    }}
                >
                    <Option value="perfume">Perfume</Option>
                    <Option value="oil">Oil</Option>
                    <Option value="hair">Hair</Option>
                    <Option value="body">Body</Option>
                    <Option value="home">Home</Option>
                    <Option value="vegan">Vegan</Option>
                    <Option value="eco Friendly">Eco Friendly</Option>
                </Select>
            </div>
            <ProductCardGroup cards={productsArr} />
            {loading ? (
                <div className="text-center" style={{marginBottom:70}}>
                    <h2>Loading...</h2>
                </div>
            ) : null}
            <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
            <SignedInFooter />
        </div>
    );
};

const mapDispatchToProps = {
    getNotes: getNotes,
    getPerfumes: getPerfumes,
    searchInNotes: searchInNotes,
    searchInPerfumes: searchInPerfumes,
    searchInBrands: searchInBrands,
};

// Products.getInitialProps = async (ctx) => {
//     return { ctx };
// };

export default privateRoute(connect(null, mapDispatchToProps)(Products));
