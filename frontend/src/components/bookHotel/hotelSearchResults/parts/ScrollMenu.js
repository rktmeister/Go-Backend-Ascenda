import React, { useState, useEffect, useRef, cloneElement, createRef } from "react";

const ScrollMenu = (props) => {
    const [currentItems, setCurrentItems] = useState(props.items);
    const [exhausted, setExhausted] = useState(false);

    const getNormalizedDifference = () => {
        try {
            const position = scrollRef.current?.scrollTop;
            const extent = position + props.height;
            //console.log(Array.from(refs.values()));
            const sumChildHeight = Array.from(refs.values()).map(r => r.clientHeight).reduce((a, b) => a + b, 0);
            const total = Math.max(props.height, sumChildHeight);
            const difference = total - extent;
            const normalizedDifference = difference / total;
            // console.log(
            //     "POSITION: ", position, "\n",
            //     "EXTENT:", extent, "\n",
            //     "SUMCHILDHEIGHT:", sumChildHeight, "\n",
            //     "TOTAL:", total, "\n",
            //     "DIFFERENCE:", difference, "\n",
            //     "NORMALIZED:", normalizedDifference, "\n"
            // );
            return normalizedDifference;
        } catch (e) {
            //console.log(e);
        }
    };

    // let thing = setInterval(() => {
    //     console.log(props.items, currentItems);
    // }, 50);

    useEffect(() => {
        console.log("HIT", props.items);
        setCurrentItems(props.items);
    }, [props.items])

    let loadDelay;

    const loadRoutine = () => {
        console.log("loading");
        clearTimeout(loadDelay);

        loadDelay = setTimeout(() => {
            if (props.haveMore()) {
                const more = props.getMore();
                if (more === undefined || more === null) return;
                const newCurrentItems = currentItems.concat([more]);
                console.log("GOT:", more);
                //console.log("havemore");
                setCurrentItems((currentItems) => currentItems.concat([more]));
            } else {
                console.log("exhausted");
                setExhausted(true);
            }
        }, 50);
    }

    const delay = async (delay = 1000, callback = () => { }) => {

        const delayPromise = ms => new Promise(res => setTimeout(res, ms));
        await delayPromise(delay);

        callback();
    }

    useEffect(() => {
        scrollRef.current?.removeEventListener('scroll', handleScroll);

        setTimeout(() => scrollRef.current?.addEventListener('scroll', handleScroll, { passive: true }), 1000);

    }, [currentItems]);

    const handleScroll = () => {
        //scrollRef.current?.removeEventListener('scroll', handleScroll);
        const normalizedDifference = getNormalizedDifference();
        //console.log("ND", normalizedDifference, exhausted);
        if (normalizedDifference < 0.2) {
            loadRoutine();
        }

        //setTimeout(() => scrollRef.current?.addEventListener('scroll', handleScroll, { passive: true }), 1000);
    };

    useEffect(() => {
        scrollRef.current?.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            scrollRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const refs = new Map();

    // const refs = new Map(
    //     props.items
    //         .map(props.itemMapping)
    //         .map((mappedItem) => [mappedItem.key, createRef(null)])
    // );


    //Array.from({ length: props.items.length }, () => createRef());

    const scrollRef = useRef(null);

    if (currentItems) {
        return (
            <div data-testid="hi" style={{ overflow: "scroll", height: props.height }} onScroll={handleScroll} ref={scrollRef}>
                <button onClick={() => console.log(refs, refs["1"])}>test</button>
                <button onClick={handleScroll}>test2</button>
                <button onClick={() => console.log(currentItems, props.items)}>examine</button>
                <button data-testid="loadButton" onClick={loadRoutine}>load</button>
                <button onClick={() => console.log(props.items, currentItems)}>stop</button>
                Total count: {currentItems.length}
                {
                    currentItems.map(props.itemMapping).map((mappedItem) => {
                        //console.log(mappedItem.key, typeof mappedItem.key);
                        return cloneElement(mappedItem, { ref: (ref) => refs.set(mappedItem.key, ref) })
                    })
                }
            </div >
        );
    } else {
        return (
            <div></div>
        )
    }
};

export default ScrollMenu;