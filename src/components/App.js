import { Routes, Route } from 'react-router-dom';
import NavBar from "./NavBar";
import User from "./User";
import Login from "./Login";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Semester from "./Semester";
import Home from "./Home";

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = { <Home/> }/>
        <Route path='/login' element = { <Login/> }/>
        <Route path='/course' element = { <Course/> }/>
        <Route path='/enrollment' element = { <Enrollment/> }/>
        <Route path='/semester' element = { <Semester/> }/>
        <Route path='/user' element = { <User/> }/>
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;
