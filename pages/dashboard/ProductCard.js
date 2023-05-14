import { Button } from "antd";
import { ArrowRightOutlined, PropertySafetyFilled } from "@ant-design/icons";
import { usePalette } from "react-palette";
import Router from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./dashboard";
import { URI } from "../../constants/uri";

const ProductCard = ({ card }) => {
    const funcProductId = useContext(UserContext);
    // console.log("card",card);
    // console.log(card.image);
    // const IMAGE_URL =
    //     cad && card.image && card.image.length > 0 ? card.image : null;
    // const NOTE_IMG =
    //     card.featured_image && card.featured_image.image
    //         ? card.featured_image.image
    //         : null;
    // const { data, loading, error } = usePalette(NOTE_IMG || IMAGE_URL);r
    // const colors = data.darkVibrant
    //     ? closestColorsDuet(data.darkVibrant)
    //     : { primary: "#CFB992", secondary: "#F4F4F4" };
    const colors = { primary: "#CFB992", secondary: "#F4F4F4" };

    return (
        <div key={card.id} className="search-card">
            <div
                className="search-card-header"
                style={{ backgroundColor: colors.primary || null }}
            >
                <img
                    className="search-card-header-image"
                    src={URI+card.image}
                    alt=""
                />
            </div>
            <div
                className="search-card-body"
                style={{ backgroundColor: colors.secondary || null }}
            >
                {/* <div className="search-card-body-type">
                    {card.type && card.type === "note"
                        ? "INGREDIENT"
                        : card.type}
                </div> */}
                <div className="search-card-body-title">
                    {/* {card.type === "note" ? card.name : card.title} */}
                    {card.product}
                </div>
                <div className="search-card-body-description">
                    Rank {card.rank}
                </div>
                <Button
                    onClick={() => {
                        // Router.push(
                        //     '/ada/note/12'
                        // );
                        funcProductId(card.id)
                    }}
                    type="link"
                    htmlType="submit"
                    className="search-card-body-button"
                >
                    DISCOVER MORE <ArrowRightOutlined />
                </Button>
            </div>
        </div>
    );
};


export default ProductCard