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

  const handleFilter = (event) => {
    console.log(event);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log(searchWord);
    console.log(getDestinationsByFuzzyString().data);
    const newFilter = getDestinationsByFuzzyString().data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
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
      chosenDestination,
    };
    props.finishStage(dataToBePassedOn);
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

