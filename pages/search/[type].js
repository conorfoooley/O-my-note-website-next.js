import React, { useState, useEffect } from 'react'
import { Button, Input } from "antd";
import { ArrowRightOutlined, } from '@ant-design/icons';
import { getNotes, getPerfumes, getBrands, searchInNotes, searchInPerfumes, searchInBrands } from '../../actions/notes'

import { privateRoute } from "../../components/privateRoute";
import { connect } from 'react-redux'

import Separator from '../../components/Separator/Separator'
import SignedInHeader from '../../components/SignedInHeader/SignedInHeader'
import SignedInFooter from '../../components/SignedInFooter/SignedInFooter'
import FloatCard from '../../components/FloatCard/FloatCard'
import SeachCardGroup from '../../components/SearchCardGroup/SearchCardGroup'

import { capitalizeFLetter } from '../../utils/helpers'


function getInitialProps(ctx) {
    return { ctx }
}
const SearchType = (props) => {
    let itemss = []

    const [items, setItems] = useState([])
    const [offset, setOffset] = useState(50)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchActive, setSearchActive] = useState(false)


    const handleScroll = (e) => {

        if (searchActive) { return }
        console.log(loading, offset, items, itemss)

        const { type } = props.router.query;

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header-content").classList.add("header-content-small");
            document.getElementById("header-logo").classList.add("logo");
        } else {
            document.getElementById("header-content").classList.remove("header-content-small");
            document.getElementById("header-logo").classList.remove("logo");
        }

        if (itemss.length > 0 && (
            document.documentElement.scrollTop + document.body.clientHeight >= document.body.scrollHeight
        )) {
            setLoading(true);

            switch (type) {
                case 'note':
                    props.getNotes(offset, 50, props.token, (res) => {
                        const x = items;
                        const newData = itemss.concat(res.results)
                        const newOffset = offset + 50
                        itemss = newData
                        setItems(newData)
                        setOffset(newOffset)
                        setLoading(false)
                    })
                    break
                case 'perfume':
                    props.getPerfumes(offset, 50, props.token, (res) => {
                        const newData = items.push(res)
                        const newOffset = offset + 50
                        setItems(newData)
                        setOffset(newOffset)
                        setLoading(false)
                    })
                    break
                case 'brand':
                    props.getBrands(offset, 50, props.token, (res) => {
                        const newData = items.push(res)
                        const newOffset = offset + 50
                        setItems(newData)
                        setOffset(newOffset)
                        setLoading(false)
                    })
                    break
                default:
                    null
                    break
            }
        }

    }

    const submitSearch = (term) => {
        const { type } = props.router.query;
        switch (type) {
            case 'note':
                props.searchInNotes(term, props.token, (hits) => {
                    setSearchActive(true)
                    setItems(hits.results)
                })
                break
            case 'perfume':
                props.searchInPerfumes(term, props.token, (hits) => {
                    setSearchActive(true)
                    setItems(hits.results)
                })
                break
            case 'brand':
                props.searchInBrands(term, props.token, (hits) => {
                    setSearchActive(true)
                    setItems(hits.results)
                })
                break
        }

    }

    useEffect(() => {
        const { type, searchTerm } = props.router.query;
        if (searchTerm) {
            setSearchActive(true)
            setSearchTerm(searchTerm)
            submitSearch(searchTerm)
            return;
        }

        switch (type) {
            case 'note':
                props.getNotes(0, 50, props.token, (res) => {
                    itemss.push(res.results)
                    setItems(res.results)
                    setLoading(false)
                })
                break
            case 'perfume':
                props.getPerfumes(0, 50, props.token, (res) => {
                    setItems(res.results)
                    setLoading(false)
                })
                break
            case 'brand':
                props.getBrands(0, 50, props.token, (res) => {
                    setItems(res.results)
                    setLoading(false)
                })
                break
            default:
                null
                break
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div >
            <SignedInHeader title={`Search / ${capitalizeFLetter(props.router.query.type)}`} />
            <div style={{ height: '55%' }}>
                <FloatCard style={{ width: '50%', left: '24%' }}   >
                    <div style={{
                        width: '100%'
                    }} >
                        <h2 className='client-list-title' >
                            Search {props.router.query.type ? capitalizeFLetter(props.router.query.type) : null}
                        </h2>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: '20px'
                        }} >
                            <Input
                                style={{ width: '80%', height: 48, alignItems: 'center' }}
                                placeholder='Search perfumes, brands, notes...'
                                allowClear
                                type='search'
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    if (e.type === 'click') {
                                        setSearchActive(false)
                                    }
                                }}
                                loading={loading}
                            />
                            <Button
                                onClick={() => submitSearch(searchTerm)}
                                shape='round'
                                htmlType="submit"
                                style={{
                                    backgroundColor: '#1F2A56',
                                    color: "#fff",
                                    fontSize: 12,
                                    border: 'none',
                                    height: 48,
                                    width: 152,
                                    marginLeft: 20
                                }} >
                                Search <ArrowRightOutlined />
                            </Button>
                        </div>
                    </div>
                </FloatCard>
            </div>

            <div className='client-list-header' style={{ paddingTop: '25%' }}>
                {searchActive ?
                    <h2 className='client-list-title' style={{ width: '20%' }}> Search results</h2> :
                    <h2 className='client-list-title' style={{ width: '20%' }}>
                        {props.router.query.type ? capitalizeFLetter(props.router.query.type) + ' -' : null} All
                    </h2>
                }
                <Separator size='full' />

            </div>
            <SeachCardGroup cards={items} />
            <SignedInFooter />
            {loading ? <div><h2>Loading</h2></div> : null}
        </div>
    )

}



const mapDispatchToProps = {
    getNotes: getNotes,
    getPerfumes: getPerfumes,
    getBrands: getBrands,
    searchInNotes: searchInNotes,
    searchInPerfumes: searchInPerfumes,
    searchInBrands: searchInBrands
}


export default privateRoute(connect(null, mapDispatchToProps)(SearchType))
