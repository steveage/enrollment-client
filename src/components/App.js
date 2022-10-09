import NavBar from "./NavBar";
import Student from "./Student";
import Teacher from "./Teacher";
import Login from "./Login";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Semester from "./Semester";
import Home from "./Home";
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [ semesters, setSemesters ] = useState([]);
  const [ students, setStudents ] = useState([]);
  const [ teachers , setTeachers ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ enrollments, setEnrollments ]  = useState([]);

  const semestersUrl = 'http://localhost:3001/semesters';
  const studentsUrl = 'http://localhost:3001/students';
  const teachersUrl = 'http://localhost:3001/teachers';
  const coursesUrl = 'http://localhost:3001/courses';
  const enrollmentsUrl = 'http://localhost:3001/enrollments';

  useEffect( fetchSemesters, [] );
  useEffect( fetchStudents, [] );
  useEffect( fetchTeachers, [] );
  useEffect( fetchCourses, [] );
  useEffect( fetchEnrollments, []);

  function fetchSemesters() {
    fetchData( semestersUrl, setSemesters );
  }

  function fetchStudents() {
    fetchData( studentsUrl, setStudents );
  }

  function fetchTeachers() {
    fetchData( teachersUrl, setTeachers );
  }

  function fetchCourses() {
    fetchData( coursesUrl, setCourses );
  }

  function fetchEnrollments() {
    fetchData( enrollmentsUrl, setEnrollments );
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

  function onTeacherAdded( teacher ) {
    postData( teachersUrl, teacher, teachers, setTeachers );
  }

  function onCourseAdded( course ) {
    postData( coursesUrl, course, courses, setCourses );
  }

  function onEnrollmentAdded( enrollment ) {
    postData ( enrollmentsUrl, enrollment, enrollments, setEnrollments );
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
        <Route path='/enrollment' element = { <Enrollment enrollments = { enrollments } students = { students } courses = { courses } enrollmentAdded = { onEnrollmentAdded }/> }/>
        <Route path='/semester' element = { <Semester semesters = { semesters } semesterAdded = { onSemesterAdded } /> }/>
        <Route path='/teacher' element = { <Teacher teachers = { teachers } teacherAdded = { onTeacherAdded } /> }/>
        <Route path='/student' element = { <Student students = { students } studentAdded = { onStudentAdded } /> }/>
        <Route path='/course' element = { <Course courses = { courses } semesters = { semesters } teachers = { teachers } courseAdded = { onCourseAdded } /> }/>
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;