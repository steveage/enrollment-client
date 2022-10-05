function StudentCard( { student } ) {
    return (
        <div>
            <h4>{ `${ student.first_name } ${ student.last_name }`} </h4>
            <p style = { { 'fontStyle': 'italic' } } > { student.email } </p>
        </div>
    )
}

export default StudentCard;