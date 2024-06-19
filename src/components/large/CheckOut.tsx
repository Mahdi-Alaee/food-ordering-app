import withSectionHeader from "@/HOFs/withSectionHeader"
import FoodBox from "../small/FoodBox"

function CheckOut(){
    return (
        // foods container
        <div className="grid grid-cols-3 gap-4">
            <FoodBox />
            <FoodBox />
            <FoodBox />
            <FoodBox />
            <FoodBox />
            <FoodBox />
        </div>
    )
}

export default withSectionHeader(CheckOut)