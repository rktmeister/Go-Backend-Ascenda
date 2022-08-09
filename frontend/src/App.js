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
import GeneralWrapper from "./components/mainDisplay/GeneralWrapper";
import CreateAccountPage from "./components/profile/CreateAccountPage";
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
          <Route path="/signUp" element={<CreateAccountPage
            backendPackage={{
              attemptCreateAccount: backend.attemptCreateAccount,
            }}
          />} />
          <Route path="/login" element={<Login
            backendPackage={{
              attemptLogin: backend.attemptLogin,
            }}
          />} />
          <Route path="/" element={<GeneralWrapper
            backendPackage={{
              testIsLoggedIn: backend.testIsLoggedIn,
              logOut: backend.logOut,
            }}
          />}>
            <Route path="authed" element={<AuthWrapper />}>
              {/* <Route path="profile" element={<ProfilePage />} /> */}
              <Route path="book" element={
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
                      testIsLoggedIn: backend.testIsLoggedIn,
                      sendSuccessfulPayment: backend.sendSuccessfulPayment,
                      getStripePrice: backend.getStripePrice,
                    }} />,
                  ]} />
              } />
              <Route path="paymentSuccess" element={<div>yay</div>} />
              <Route path="paymentFailure" element={<div>nuu</div>} />
              <Route path="hello" element={<div>hello there lol</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
