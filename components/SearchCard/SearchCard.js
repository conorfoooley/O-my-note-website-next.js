import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { usePalette } from "react-palette";
import Router from "next/router";

import NoteImage from "../../assets/images/fakeNotePhoto.jpg";

import { closestColorsDuet } from "../../utils/helpers";

const SearchCard = ({ card }) => {
    // console.log(card);
    console.log("card.image",card.image);
    const IMAGE_URL =
        card && card.image && card.image.length > 0 ? card.image : null;
    const NOTE_IMG =
        card.featured_image && card.featured_image.image
            ? card.featured_image.image
            : null;
    const { data, loading, error } = usePalette(NOTE_IMG || IMAGE_URL);
    const colors = data.darkVibrant
        ? closestColorsDuet(data.darkVibrant)
        : { primary: "#CFB992", secondary: "#F4F4F4" };

    return (
        <div key={card.id} className="search-card">
            <div
                className="search-card-header"
                style={{ backgroundColor: colors.primary || null }}
            >
                <img
                    className="search-card-header-image"
                    src={NOTE_IMG || IMAGE_URL || NoteImage}
                    alt=""
                />
            </div>
            <div
                className="search-card-body"
                style={{ backgroundColor: colors.secondary || null }}
            >
                <div className="search-card-body-type">
                    {card.type && card.type === "note"
                        ? "INGREDIENT"
                        : card.type}
                </div>
                <div className="search-card-body-title">
                    {card.type === "note" ? card.name : card.title}
                </div>
                {/*<div className="search-card-body-description">*/}
                {/*    {card.profile}*/}
                {/*</div>*/}

                <Button
                    onClick={() => {
                        Router.push(
                            `/ada/${card.type}/${
                                card.type == "note" ? card.id : card.pk
                            }`
                        );
                    }}
                    type="link"
                    htmlType="submit"
                    className="search-card-body-button"
                >
                    READ MORE <ArrowRightOutlined />
                </Button>
            </div>
        </div>
    );
};


export default SearchCard