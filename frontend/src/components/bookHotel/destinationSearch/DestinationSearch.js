// const DestinationSearch = (props) => {
//     return (

//     );
// };

// export default DestinationSearch;
import React, { useState } from "react";
import "../../../App.css";
import "../../../utils/backendAPI";
import { getDestinationsByFuzzyString } from "../../../utils/backendAPI";
// import SearchIcon from "@material-ui/icons/Search";
// import CloseIcon from "@material-ui/icons/Close";
//onClick ={this.getDestinationsByFuzzyString}
//DestinationSearchAPI
function DestinationSearch(props) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    console.log(event);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log(searchWord);
    console.log(getDestinationsByFuzzyString().data);
    const newFilter = getDestinationsByFuzzyString().data.filter((value) => {
      console.log(value);
      console.log(value.name.toLowerCase().includes(searchWord.toLowerCase()));
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    console.log("hi", newFilter);
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

  return (
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
            // <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map(
            (value, key) => {
              return (
                <a className="dataItem" href={value.name} target="_blank">
                  <p>{value.name} </p>
                </a>
              );
            }
          )}
        </div>
      )}
      <button onClick={props.finishStage}>Next Stage</button>
    </div>
  );
}

export default DestinationSearch;

