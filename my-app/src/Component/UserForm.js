import React from 'react';
import {withFormik, Form, Field} from "formik";




const UserForm = ( { values, handleChange }) => {


return (

    <div className = "user-form">
        <Form>
            <Field type ="text" name = "name" placeholder = "name" />
            <Field type ="text" name = "email" placeholder = "email" />
            <Field type ="password" name = "password" placeholder = "password" />
            <label className = "checkbox-container">
               
                Terms of Service
                <Field type = "checkbox" name = "terms" checkd = {values.terms}/>
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

        }
    }




})(UserForm);

export default FormikUserForm;