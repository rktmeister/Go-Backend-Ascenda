import React, { useState } from "react";
import "../../../App.css";
import "../../../utils/backendAPI";
import FilterBar from "../common/FilterBar";
import FilterShow from "../common/FilterShow";
import DestinationCard from "./parts/DestinationCard";

function DestinationSearch(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [readyToProceed, setReadyToProceed] = useState(false);

  const defaultStartingFilterValues = {
    numberOfRooms: 1,
    checkInDate: "2022-08-29",
    checkOutDate: "2022-08-31",
    minPrice: 0,
    maxPrice: 9999999,
  };

  const [filterBarValues, setFilterBarValues] = useState(defaultStartingFilterValues);
  const [chosenDestination, setChosenDestination] = useState("");

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      const got = await props.backendPackage.getDestinationsByFuzzyString(
        searchWord
      );
      const newFilter = got.filter((value) => {
        console.log(value.term, searchWord);
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
    if (readyToProceed) {
      const dataToBePassedOn = {
        filterData: filterBarValues,
        destination: chosenDestination,
      };
      props.handMeDowns.push(dataToBePassedOn);
      props.finishStage(props.handMeDowns);
    } else {
      alert("Select a location!");
    }
  };

  const handleChoice = (d) => {
    setReadyToProceed(true);
    console.log("DDD", d);
    setChosenDestination(d);
  };

  return (
    <div>
      <FilterBar
        onSubmit={handleFilterBarSubmit}
        prior={defaultStartingFilterValues}
      />
      <div className="search">
        <div className="searchInputs">
          <input
            data-testid="fuzzyInput"
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
                    <DestinationCard key={key} value={value} onClick={handleChoice} />
                  );
                }
              )
            )
          }
        </div>
        <FilterShow
          currentFilterData={filterBarValues}
          choice={chosenDestination.term}
        />
        <button onClick={finishStage}>Next Stage</button>
      </div>
    </div>
  );
}

export default DestinationSearch;

