import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './components/profile/Login';
import AuthWrapper from './components/authentication/AuthWrapper';
import HotelSearchResults from './components/bookHotel/hotelSearchResults/HotelSearchResults';
import DestinationSearch from './components/bookHotel/destinationSearch/DestinationSearch';
import BookingData from './components/bookHotel/bookingData/BookingData';
import StageHandler from './components/bookHotel/stageHandler/StageHandler';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthWrapper privateComponent={
            <div>
              <StageHandler
                stages={[
                  <DestinationSearch />,
                  <HotelSearchResults
                    filterArray={[
                      ({ id }) => 97 <= id.charCodeAt(0) && id.charCodeAt(0) <= 122,
                      ({ name }) => name.length > 4,
                    ]}
                  />

                ]}
              />
            </div>
          } />} />
          <Route path="/buy" element={<BookingData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
