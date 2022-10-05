import { Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import Student from "./Student";
import Teacher from "./Teacher";
import Login from "./Login";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Semester from "./Semester";
import Home from "./Home";
import { useEffect, useState } from 'react';

function App() {
  const [semesters, setSemesters] = useState([]);
  const [students, setStudents] = useState([]);

  const semestersUrl = 'http://localhost:3001/semesters';
  const studentsUrl = 'http://localhost:3001/students';

  useEffect( fetchSemesters, [] );
  useEffect( fetchStudents, [] )

  function fetchSemesters() {
    fetchData( semestersUrl, setSemesters );
  }

  function fetchStudents() {
    fetchData( studentsUrl, setStudents );
  }

  function fetchData(url, setDataFunction) {
    fetch(url)
      .then(response => response.json())
      .then(data => setDataFunction(data));
  }

  function onSemesterAdded(semester) {
    postData( semestersUrl, semester, semesters, setSemesters );
  }

  function onStudentAdded( student ) {
    postData( studentsUrl, student, students, setStudents );
  }

  function postData(url, data, dataSet, setDataFunction) {
    const stringData = JSON.stringify(data);
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: stringData
    }

    fetch( url, settings )
      .then( response => response.json() )
      .then( responseData => setDataFunction( [ ...dataSet, responseData ] ) );
  }

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/login' element = { <Login/> }/>
        <Route path='/course' element = { <Course/> }/>
        <Route path='/enrollment' element = { <Enrollment/> }/>
        <Route path='/semester' element = { <Semester semesters = { semesters } semesterAdded = { onSemesterAdded } /> }/>
        <Route path='/teacher' element = { <Teacher/> }/>
        <Route path='/student' element = { <Student students = { students } studentAdded = { onStudentAdded } /> }/>
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;