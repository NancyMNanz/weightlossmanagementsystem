import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import AddWeight from './Dashboard/AddWeight';
import WeightList from './Dashboard/WeightList';
import EditWeight from './Dashboard/EditWeight';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<WeightList />} />
        <Route path="/add-weight" element={<AddWeight />} />
        <Route path="/edit-weight/:id" element={<EditWeight />} />
      </Routes>
    </Router>
  );
};

export default App;
