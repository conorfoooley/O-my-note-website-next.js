import React from "react";
import ReactCarousel from "react-multi-carousel";
import SearchCard from "../SearchCard/SearchCard";
import { Skeleton } from "antd";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Carousel = ({ cards }) => {
    return (
        <div style={{ position: "relative" }}>
            {cards && cards.length > 4 ? (
                <div className="left-overlay" />
            ) : null}
            <Skeleton loading={!cards} active={!cards}>
                <ReactCarousel
                    responsive={responsive}
                    infinite
                    draggable
                    className="client-list-header"
                    centerMode={true}
                >
                    {cards &&
                        cards.map((card) => (
                            <SearchCard
                                key={card.type === "note" ? card.id : card.pk}
                                card={card}
                            />
                        ))}
                </ReactCarousel>
            </Skeleton>

            {cards && cards.length > 4 ? (
                <div className="right-overlay" />
            ) : null}
        </div>
    );
};

export default Carousel