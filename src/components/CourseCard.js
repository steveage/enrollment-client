function CourseCard( { course } ) {
    return (
        <div>
            <h3>{ course.name }</h3>
            <p>{ course.code } - {course.section }</p>
            <p>{ course.semester.year } { course.semester.period }</p>
            <p>{ course.teacher.first_name } { course.teacher.last_name }</p>
        </div>
    )
}

export default CourseCard;