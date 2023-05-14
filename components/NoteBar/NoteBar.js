import React from "react";
import Separator from "../Separator/Separator";
import countries from "../../utils/world_countries";

function NoteBar({ name, value, percentage }) {
    const getName = () => {
        const country = countries.features.find((a) => name === a.id);

        if (country && country.properties.name) return country.properties.name;
        else return name;
    };

    // console.log(percentage())

    return (
        <div style={{ marginBottom: 5 }}>
            <div
                className={"flexRow"}
                style={{ justifyContent: "space-between", marginBottom: 5 }}
            >
                <div
                    className={"flexRow"}
                    style={{
                        justifyContent: "space-between",
                        flexBasis: "47%",
                    }}
                >
                    <div className={"smallText"}>{getName()}</div>
                    <div className={"grayText"}>{value}</div>
                </div>
                <div className={"note_bar_empty"}>
                    <div
                        style={{
                            width: `${value <= 0 ? 0 : percentage()}%`,
                            height: "100%",
                        }}
                        className={"note_bar"}
                    ></div>
                </div>
            </div>

            <Separator size={"full"} />
        </div>
    );
}

export default NoteBar;
