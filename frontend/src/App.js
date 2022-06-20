import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './components/profile/Login';
import AuthWrapper from './components/authentication/AuthWrapper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<AuthWrapper privateComponent={
            <div>hello</div>
          } />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
