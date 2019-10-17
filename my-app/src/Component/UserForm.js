import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from "formik";
import axios from "axios";
import * as Yup from "yup";
import { setUseProxies } from 'immer';
import styled from "styled-components";


const UserForm = ( { values, touched, errors, status }) => {

    const FieldWrapper = styled.section`
    display: flex;
    flex-direction: column
    align-items: center;
    color: red;
    `;
    



    const [user, setUser] = useState([]);
    useEffect(() => {
        status && setUser(user => [...user, status])
    }, [status])



return (

    <div className = "user-form">
        <Form className ="main-form">
            <div className ="field-cont">
            <Field className ="textbox" type ="text" name = "name" placeholder = "name" />
            {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
            <Field className ="textbox" type ="text" name = "email" placeholder = "email" />
            {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
            <Field className ="textbox" type ="password" name = "password" placeholder = "password" />
            {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
            <Field component="select" className="options" name="role">
            <option>Choose an role</option>
            <option value="leader">Leader</option>
            <option value="follower">Follower</option>
            <option value="reviewer">Reviewer</option>
            </Field>
            
            
            <label className = "checkbox-container">
               
                Terms of Service
                <Field type = "checkbox" name = "terms" checked = {values.terms}/>
            </label>
            <button type= "submit">Add User!</button>
            </div>
        </Form>
         {user.map(person => (
                <div className = "output">
                <p>Name: {person.name}</p>
                <p>Email: {person.email}</p>
                <p>Role: {person.role}</p>
                </div>
              
           
        ))} 



    </div>
)

}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, role, terms}){

        return {
            name: name || "",
            email: email || "",
            password: password || "",
            role:role || "",
            terms: terms || false

        };
    },
    validationSchema: Yup.object().shape({
        name: (Yup.string().required(), Yup.string().min("2")), 
        email: (Yup.string().required(), Yup.string().min("2")),
        password: (Yup.string().required(), Yup.string().min("6"))
    }),

    handleSubmit(values, {setStatus}) {
        axios.post('https://reqres.in/api/users', values)
            .then(res => {console.log(res); console.log(values); setStatus(res.data); })
            .catch(err => console.log(err.response));
    }


})(UserForm);

export default FormikUserForm;