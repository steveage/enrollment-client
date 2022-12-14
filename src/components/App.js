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
  const loginUrl = 'http://localhost:3001/login';

  useEffect( fetchSemesters, [] );
  useEffect( fetchStudents, [] );
  useEffect( fetchTeachers, [] );
  useEffect( fetchCourses, [] );
  useEffect( fetchEnrollments, []);

  function fetchSemesters() {
    getData( semestersUrl, setSemesters );
  }

  function fetchStudents() {
    getData( studentsUrl, setStudents );
  }

  function fetchTeachers() {
    getData( teachersUrl, setTeachers );
  }

  function fetchCourses() {
    getData( coursesUrl, setCourses );
  }

  function fetchEnrollments() {
    getData( enrollmentsUrl, setEnrollments );
  }

  function getData(url, setDataFunction) {
    fetch(url)
      .then(response => response.json())
      .then(data => setDataFunction(data));
  }

  function onSemesterAdded(semester) {
    fetchData( "POST", semestersUrl, semester, semesters, setSemesters );
  }

  function onStudentAdded( student ) {
    fetchData( "POST", studentsUrl, student, students, setStudents );
  }

  function onTeacherAdded( teacher ) {
    fetchData( "POST", teachersUrl, teacher, teachers, setTeachers );
  }

  function onCourseAdded( course ) {
    fetchData( "POST", coursesUrl, course, courses, setCourses );
  }

  function onEnrollmentAdded( enrollment ) {
    fetchData ( "POST",enrollmentsUrl, enrollment, enrollments, setEnrollments );
  }

  function emptyFunction () {

  }

  function onCredentialsCreated( credentials ) {
    fetchData ( "POST", loginUrl, credentials, [], emptyFunction )
  }

  function handleEnrollmentDelete( enrollmentToDelete ) {
    const deleteUrl = `${enrollmentsUrl}/${enrollmentToDelete.id}`;
    fetch(deleteUrl, { method: "DELETE" })
      .then( response => response.json() )

    const updatedEnrollments = enrollments.filter( enrollment => enrollment.id !== enrollmentToDelete.id );
    setEnrollments( updatedEnrollments );
  }

  function handleEnrollmentUpdate( enrollment ) {
    const updateUrl = `${enrollmentsUrl}/${enrollment.id}`;
    const data = { score: enrollment.score };
    fetchData( "PATCH", updateUrl, data, enrollments, setEnrollments );
  }

  function fetchData(action, url, data, dataSet, setDataFunction) {
    const stringData = JSON.stringify(data);
    const settings = {
      method: action,
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
        <Route path='/login' element = { <Login credentialsCreated = { onCredentialsCreated } /> }/>
        <Route path='/enrollment' element = { <Enrollment enrollments = { enrollments } students = { students } courses = { courses } enrollmentAdded = { onEnrollmentAdded } deleteEnrollment = { handleEnrollmentDelete } updateEnrollment = { handleEnrollmentUpdate }/> }/>
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