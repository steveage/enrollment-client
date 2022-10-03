import SemesterCard from './SemesterCard';

function Semester( { semesters } ) {
    const semesterListUi = semesters.map( semester => <li key = {semester.id}
    ><SemesterCard key = { semester.id } semester = { semester } /></li>)

    return (
        <div>
            <h3>School's semesters:</h3>
            <ul> { semesterListUi } </ul>
        </div>
    )
}

export default Semester;