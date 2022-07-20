import { useEffect, useState } from "react";
import { formatQueryParameters, getHotelBatch } from "../../../utils/backendAPI";

const F = (props) => {
    const [s, us] = useState(null);
    useEffect(() => {
        (async () => {
            us(await getHotelBatch(1, 2, 3, 4, 5));
        })();
        console.log(formatQueryParameters(1));
        console.log(getHotelBatch(1, 2, 3, 4, 5));
        console.log("hi");
    }, [])
    return (
        <div>{JSON.stringify(s)}</div>
    )
};

export default F;