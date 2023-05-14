
const Ingredient = (props) => {
    const { ingredientData } = props;
    return (
        <div className="ingredient">
            <div className="ingredient-title client-list-title">{ ingredientData.note }</div>
            <div className="ingredient-value">
                <span>{ ingredientData.percentage }</span>
                <div className="ingredient-percent">
                    <div className="process" style={{width: `${ingredientData.percentage}%`}}></div>
                    <div className="non-process"></div>
                </div>
            </div>
        </div>
    )
}
export default Ingredient;