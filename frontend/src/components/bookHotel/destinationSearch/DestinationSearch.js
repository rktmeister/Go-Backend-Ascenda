import React, { useEffect, useState } from "react";
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
    maxRating: 5,
  };

  const [filterBarValues, setFilterBarValues] = useState(defaultStartingFilterValues);
  const [chosenDestination, setChosenDestination] = useState("");

  let searchBuffer;
  const bufferedSearch = () => {
    clearTimeout(searchBuffer);

    searchBuffer = setTimeout(async () => {
      if (wordEntered === "") {
        setFilteredData([]);
      } else {
        const got = await props.backendPackage.getDestinationsByFuzzyString(
          wordEntered,
          nav
        );
        const newFilter = got.filter((value) => {
          //console.log(value.term, searchWord);
          return value.term.toLowerCase().includes(wordEntered.toLowerCase());
        });
        console.log("NF", newFilter);
        setFilteredData(newFilter);

        if (props.test) {
          console.log("AAAAAAAAAAAAAAAAAAAA");
          const testNewFilter = props.testData.filter((value) => {
            return value.term.toLowerCase().includes(wordEntered.toLowerCase());
          });

          setFilteredData(testNewFilter);
        }
      }
    }, 100);
  };

  useEffect(() => {
    bufferedSearch();
    return (() => clearTimeout(searchBuffer));
  }, [wordEntered]);

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

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

    if (props.test) {
      props.testGetSelected(d);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="column col-lg-6">
          <FilterShow
            currentFilterData={filterBarValues}
            choice={chosenDestination.term}
          />
          <FilterBar
            onSubmit={handleFilterBarSubmit}
            prior={defaultStartingFilterValues}
            test={props.test}
            testBoolForBackend={props.testBoolForBackend}
          />
        </div>
        <div className="search col-lg-6 d-flex">
          <div className="column col-12">
            <div className="searchInputs col-12">
              <input
                id="destinationInput"
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
            <div id="destinationMenu" style={{ display: "grid" }}>
              {
                filteredData.length !== 0 && (
                  filteredData.map(
                    (value, key) => {
                      console.log("K", key);
                      return (
                        <DestinationCard key={key} value={value} onClick={handleChoice} />
                      );
                    }
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
      <button id="submitButton" className="btn btn-primary btn-lg col-12 align-items-end" onClick={finishStage}>Next Stage</button>
    </div>
  );
}

export default DestinationSearch;

