import React, { useMemo, useState } from "react";
import AvgCompletionTimePerType4 from "./predetermined/AvgCompletionTimePerType4";
import LicensePlateMoreThanOnce7 from "./predetermined/LicensePlateMoreThanOnce7";
import MostCommonServicePerZip3 from "./predetermined/MostCommonServicePerZip3";
import MostCommonTypeInBox5 from "./predetermined/MostCommonTypeInBox5";
import PolicesDistrictsWithPotRodent12 from "./predetermined/PolicesDistrictsWithPotRodent12";
import PremisesBaited9 from "./predetermined/PremisesBaited9";
import PremisesGarbage10 from "./predetermined/PremisesGarbage10";
import PremisesRats11 from "./predetermined/PremisesRats11";
import SecondCommonColor8 from "./predetermined/SecondCommonColor8";
import Top5ssa6 from "./predetermined/Top5ssa6";
import TotalRequestsPerDate2 from "./predetermined/TotalRequestsPerDate2";
import TotalRequestsPerType1 from "./predetermined/TotalRequestsPerType1";

const PredeterminedQueries = props => {
    const [activeItems, setActiveItems] = useState(Array(12).fill(false));
    let T = <></>;
    const data = useMemo(() => [
        `1. Find the total requests per type that were created within a specified time range and sort
        them in a descending order.`,
        `2. Find the total requests per day for a specific request type and time range.`,
        `3. Find the most common service request per zipcode for a specific day.`,
        `4. Find the average completion time per service request for a specific date range.`,
        `5. Find the most common service request in a specified bounding box (as designated by GPS-
            coordinates) for a specific day.`,
        `6. Find the top-5 Special Service Areas (SSA) with regards to total number of requests per day
        for a specific date range (for service requests types that SSA is available: abandoned vehicles,
        garbage carts, graffiti removal, pot holes reported)`,
        `7. Find the license plates (if any) that have been involved in abandoned vehicle complaints more
        than once.`,
        `8. Find the second most common color of vehicles involved in abandoned vehicle complaints.`,
        `9. Find the rodent baiting requests where the number of premises baited is less than a specified
        number.`,
        `10. Find the rodent baiting requests where the number of premises with garbage baited is less than a specified
        number.`,
        `11. Find the rodent baiting requests where the number of premises with rats baited is less than a specified
        number.`,
        `12. Find the police districts that have handled “pot holes” requests with more than one number
        of potholes on the same day that they also handled “rodent baiting” requests with more than
        one number of premises baited, for a specific day.`
    ], []);

    const comps = useMemo(() => [
        TotalRequestsPerType1,
        TotalRequestsPerDate2,
        MostCommonServicePerZip3,
        AvgCompletionTimePerType4,
        MostCommonTypeInBox5,
        Top5ssa6,
        LicensePlateMoreThanOnce7,
        SecondCommonColor8,
        PremisesBaited9,
        PremisesGarbage10,
        PremisesRats11,
        PolicesDistrictsWithPotRodent12,
    ],[]);

    const setActiveItem = id => setActiveItems(() => activeItems.map((_, i) => i === id));
    
    

    return <>
        <div className="predeterminedqueries__navbar">
            {data.map((text, index) => <p key={text} onClick={() => setActiveItem(index)} className={`predeterminedqueries__navbar--item ${activeItems[index] ? "predeterminedqueries__navbar--item-active" : ""}`}>{text}</p>)}
        </div>
        {activeItems.some(v => v) ? (T = comps[activeItems.findIndex(v => v)], <T {...props}></T>) : undefined}
    </>
}


export default PredeterminedQueries;