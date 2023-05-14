export const capitalizeFLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}



// Calculating closest color logic

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Eucledian distance
export const distance = (hex1, hex2) => {
    var RGB1 = hexToRgb(hex1)
    var RGB2 = hexToRgb(hex2)
    return (Math.sqrt(Math.pow((RGB1.r - RGB2.r), 2) + Math.pow((RGB1.g - RGB2.g), 2) + Math.pow((RGB1.b - RGB2.b), 2)))
}

export const closestColorsDuet = (hex) => {
    let distanceTable = []
    PrimaryColorsBase.map(baseColor => {
        distanceTable.push(distance(hex, baseColor))
    })

    return {
        "primary": PrimaryColorsBase[distanceTable.indexOf(Math.min(...distanceTable))],
        "secondary": SecondaryColorsBase[distanceTable.indexOf(Math.min(...distanceTable))]
    }
}

const PrimaryColorsBase = [
    "#D94646",
    "#F38F37",
    "#1F2A56",
    "#874825",
    "#CFB992",
    "#1D1E1E",
    "#32462F",
    "#D0DB8D",
    "#552B32"
]

const SecondaryColorsBase = [
    "#FCDFDF",
    "#EDF6F8",
    "#EDF6F8",
    "#F6F1EB",
    "#F4F4F4",
    "#E5E5E5",
    "#F5FAF4",
    "#F9FAF2",
    "#FCF0F2"
]





