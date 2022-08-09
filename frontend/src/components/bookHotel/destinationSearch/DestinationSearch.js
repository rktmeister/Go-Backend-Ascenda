import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../App.css";
import "../../../utils/backendAPI";
import FilterBar from "../common/FilterBar";
import FilterShow from "../common/FilterShow";
import DestinationCard from "./parts/DestinationCard";

function DestinationSearch(props) {
  const nav = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [readyToProceed, setReadyToProceed] = useState(false);

  const defaultStartingFilterValues = {
    numberOfRooms: 1,
    checkInDate: "2022-08-29",
    checkOutDate: "2022-08-31",
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    maxRating: 10,
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
          searchWord,
          nav
        );
      

      

      
      const newFilter = got.filter((value) => {
        //console.log(value.term, searchWord);
        return value.term.toLowerCase().includes(searchWord.toLowerCase());
      });
      console.log("NF", newFilter);
      setFilteredData(newFilter);


      if(props.test){
       
        const testNewFilter = props.testData.filter((value) => {
          return value.term.toLowerCase().includes(searchWord.toLowerCase());
        });

        setFilteredData(testNewFilter);
      }
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


    if(props.test){
      props.testGetSelected(d);
    }
  };

  return (
    <div>
      <FilterBar
        onSubmit={handleFilterBarSubmit}
        prior={defaultStartingFilterValues}
        test = {props.test}
        testBoolForBackend = {props.testBoolForBackend}
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
              filteredData.map( //slice(0, 15).map(
                (value, key) => {
                  //console.log("V", value);
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

