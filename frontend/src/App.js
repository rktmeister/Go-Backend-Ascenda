import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './components/profile/Login';
import AuthWrapper from './components/authentication/AuthWrapper';
import HotelSearchResults from './components/bookHotel/hotelSearchResults/HotelSearchResults';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AuthWrapper privateComponent={
            <div><HotelSearchResults filterArray={[
              ({ id }) => 97 <= id.charCodeAt(0) && id.charCodeAt(0) <= 122,
              ({ name }) => name.length > 4,
            ]} /></div>
          } />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
