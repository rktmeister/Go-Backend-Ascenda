import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/profile/Login';
import AuthWrapper from './components/authentication/AuthWrapper';
import HotelSearchResults from './components/bookHotel/hotelSearchResults/HotelSearchResults';
import DestinationSearch from './components/bookHotel/destinationSearch/DestinationSearch';
import BookingData from './components/bookHotel/bookingData/BookingData';
import StageHandler from './components/bookHotel/stageHandler/StageHandler';
import HotelRoomDetails from './components/bookHotel/hotelRoomDetails/HotelRoomDetails';
import * as backend from "./utils/backendAPI";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AuthWrapper privateComponent={
              <StageHandler
                stages={[
                  <DestinationSearch />,
                  <HotelSearchResults backendPackage={{
                    getHotelBatch: backend.getHotelBatch,
                  }} />,
                  <HotelRoomDetails />,
                  <BookingData />,
                ]}
              />
            } />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
