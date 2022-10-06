function TeacherCard( { teacher } ) {
    return (
        <div>
            <h4>{ `${ teacher.first_name } ${ teacher.last_name }`} </h4>
            <p style = { { 'fontStyle': 'italic' } } > { teacher.email } </p>
        </div>
    )
}

export default TeacherCard;