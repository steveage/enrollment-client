import { Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import User from "./User";
import Login from "./Login";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Semester from "./Semester";
import Home from "./Home";
import { useEffect, useState } from 'react';

function App() {
  const [semesters, setSemesters] = useState([]);
  const semestersUrl = 'http://localhost:3001/semesters';
  
  useEffect(fetchSemesters, []);

  function fetchSemesters() {
    fetchData(semestersUrl, setSemesters);
  }

  function fetchData(url, setDataFunction) {
    fetch(url)
      .then(response => response.json())
      .then(data => setDataFunction(data));
  }

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/login' element = { <Login/> }/>
        <Route path='/course' element = { <Course/> }/>
        <Route path='/enrollment' element = { <Enrollment/> }/>
        <Route path='/semester' element = { <Semester semesters = { semesters } /> }/>
        <Route path='/user' element = { <User/> }/>
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;
