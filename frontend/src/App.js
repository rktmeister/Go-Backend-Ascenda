import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AuthWrapper from './components/authentication/AuthWrapper';
import BookingData from './components/bookHotel/bookingData/BookingData';
import DestinationSearch from './components/bookHotel/destinationSearch/DestinationSearch';
import HotelRoomDetails from './components/bookHotel/hotelRoomDetails/HotelRoomDetails';
import HotelSearchResults from './components/bookHotel/hotelSearchResults/HotelSearchResults';
import HotelCard from "./components/bookHotel/hotelSearchResults/parts/HotelCard";
import ScrollMenu from './components/bookHotel/hotelSearchResults/parts/ScrollMenu';
import StageHandler from './components/bookHotel/stageHandler/StageHandler';
import Login from './components/profile/Login';
import * as backend from "./utils/backendAPI";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={
            <ScrollMenu
              height={500}
              items={Array.from({ length: 20 }, (_, i) => ({
                uid: i,
                price: 1,
                rating: 1,
                term: "hi",
              }))}
              // items={[
              //   {
              //     uid: 1,
              //     price: 1,
              //     rating: 1,
              //     term: "hi",
              //   },
              //   {
              //     uid: 2,
              //     price: 1,
              //     rating: 1,
              //     term: "hi",
              //   },
              //   {
              //     uid: 3,
              //     price: 1,
              //     rating: 1,
              //     term: "hi",
              //   },
              //   {
              //     uid: 4,
              //     price: 1,
              //     rating: 1,
              //     term: "hi",
              //   },
              //   {
              //     uid: 5,
              //     price: 1,
              //     rating: 1,
              //     term: "hi",
              //   }
              // ]}
              itemMapping={(item) => {
                return (
                  <HotelCard key={item.uid} item={item} height={`10rem`} onClick={(e) => console.log(e)} />
                );
              }}
              haveMore={() => true}
              getMore={() => ({
                uid: Math.random() * 100,
                price: 1,
                rating: 1,
                term: "hi",
              })}
            />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AuthWrapper privateComponent={
              <StageHandler
                stages={[
                  <DestinationSearch backendPackage={{
                    getDestinationsByFuzzyString: backend.getDestinationsByFuzzyString,
                  }} />,
                  <HotelSearchResults backendPackage={{
                    getHotelBatch: backend.getHotelBatch,
                  }} />,
                  <HotelRoomDetails backendPackage={{
                    getHotelRoomBatch: backend.getHotelRoomBatch,
                  }} />,
                  <BookingData backendPackage={{
                    sendSuccessfulPayment: backend.sendSuccessfulPayment,
                    getStripePrice: backend.getStripePrice,
                  }} />,
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
