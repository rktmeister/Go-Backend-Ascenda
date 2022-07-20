import React, { useState } from "react";
import "../../../App.css";
import "../../../utils/backendAPI";
import { getDestinationsByFuzzyString } from "../../../utils/backendAPI";
import FilterBar from "../common/FilterBar";
import DestinationCard from "./parts/DestinationCard";

function DestinationSearch(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const [filterBarValues, setFilterBarValues] = useState({});
  const [chosenDestination, setChosenDestination] = useState("");

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      const got = await getDestinationsByFuzzyString(
        searchWord,
        // filterBarValues.checkInDate,
        // filterBarValues.checkOutDate,
        // filterBarValues.numberOfRooms
      );
      const newFilter = got.filter((value) => {
        return value.term.toLowerCase().includes(searchWord.toLowerCase());
      });
      console.log("NF", newFilter);
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleFilterBarSubmit = (formData) => {
    setFilterBarValues(formData);
  };

  const finishStage = () => {
    const dataToBePassedOn = {
      ...filterBarValues,
      destination: chosenDestination,
    };
    props.handMeDowns.push(dataToBePassedOn);
    props.finishStage(props.handMeDowns);
  };

  return (
    <div>
      <FilterBar onSubmit={handleFilterBarSubmit} />
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder="Search!"
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <div>Search</div>
            ) : (
              <button id="clearBtn" onClick={clearInput}>Clear</button>
            )}
          </div>
        </div>
        <div style={{ display: "grid" }}>
          {
            filteredData.length !== 0 && (
              filteredData.slice(0, 15).map(
                (value, key) => {
                  console.log("V", value);
                  return (
                    <DestinationCard key={key} value={value} onClick={setChosenDestination} />
                  );
                }
              )
            )
          }
        </div>
        <button onClick={finishStage}>Next Stage</button>
      </div>
    </div>
  );
}

export default DestinationSearch;

