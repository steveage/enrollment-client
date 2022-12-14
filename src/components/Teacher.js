import { useState } from 'react';
import TeacherCard from './TeacherCard';

function Teacher( { teachers, teacherAdded } ) {
    const emptyTeacher = {
        first_name: '',
        last_name: '',
        email: '',
        role: 'teacher'
    };
    const [ formData, setFormData ] = useState( emptyTeacher );

    function handleSubmit( event ) {
        event.preventDefault();
        teacherAdded( formData );
        setFormData( emptyTeacher );
    }

    function handleChange( event ) {
        setFormData({ ...formData, [ event.target.name ]: event.target.value } );
    }
    
    const teacherListUi = teachers.map( teacher => <li key = { teacher.id } ><TeacherCard key = { teacher.id } teacher = { teacher } /></li>);

    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <label>
                    First Name:
                    <input type = { 'text' } name = 'first_name' value = { formData.first_name } onChange = { handleChange } />
                </label>
                <label>
                    Last Name:
                    <input type = { 'text' } name = 'last_name' value = { formData.last_name } onChange = { handleChange } />
                </label>
                <label>
                    Email:
                    <input type = { 'email' } name = 'email' value = { formData.email } onChange = { handleChange } />
                </label>
                <button type = { 'submit' }>Add Teacher</button>
            </form>
            <h3>School's Teachers</h3>
            <ul> { teacherListUi } </ul>
        </div>
    )
}

export default Teacher;