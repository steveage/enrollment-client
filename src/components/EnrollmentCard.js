function EnrollmentCard( { enrollment } ) {
    return (
        <div>
            <h3> { enrollment.user.first_name } { enrollment.user.last_name } </h3>
            <h4> { enrollment.course.code } - { enrollment.course.section }: { enrollment.course.name } </h4>
            <p style = { { 'fontStyle': 'italic' } } > { enrollment.score } </p>
        </div>
    )
}

export default EnrollmentCard;