import React, { useState, useEffect, useRef } from "react";

const ScrollMenu = (props) => {
    const handleScroll = () => {
        const position = scrollRef.current?.scrollTop;
        console.log("M", position);
        props.onScroll(position);
    };

    useEffect(() => {
        scrollRef.current?.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            scrollRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollRef = useRef(null);

    return (
        <div data-testid="hi" className="scrollMenu" onScroll={handleScroll} ref={scrollRef}>
            {props.items.map(props.itemMapping)}
        </div >
    );
};

export default ScrollMenu;