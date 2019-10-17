import React from 'react';
import {withFormik, Form, Field} from "formik";
import axios from "axios";
import * as Yup from "yup";




const UserForm = ( { values, touched, errors}) => {


return (

    <div className = "user-form">
        <Form>
            <Field type ="text" name = "name" placeholder = "name" />
            {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
            <Field type ="text" name = "email" placeholder = "email" />
            {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
            <Field type ="password" name = "password" placeholder = "password" />
            {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
            <label className = "checkbox-container">
               
                Terms of Service
                <Field type = "checkbox" name = "terms" checked = {values.terms}/>
            </label>
            <button type= "submit">Submit!</button>


        </Form>




    </div>
)

}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms}){

        return {
            name: name || "",
            email: email || "",
            password: password || "",
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
            .catach(err => console.log(err.response));
    }


})(UserForm);

export default FormikUserForm;