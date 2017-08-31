/**
 * Created by Jhalak on 8/25/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios'

class LoginUser extends Component {
    componentDidMount(){
        this.state = {};
    }

    renderField(field){
        const {meta : {touched, error} } = field;
        /*
         The above part is called destructuring properties.
         with const meta: */
        const className=`form-group ${touched && error ? 'has-danger': ''}`;
        if(field.label !== "Password") {
            return (
                <div className={className}>
                    <label>{ field.label }</label>
                    <input
                        className="form-control"
                        type="email"
                        {...field.input}
                        /* we dont have to wire action listeners because of the field.input property*/
                    />
                    <div className="text-help">
                        { touched ? error : '' }
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className={className}>
                    <label>{ field.label }</label>
                    <input
                        className="form-control"
                        type="password"
                        {...field.input}
                        /* we dont have to wire action listeners because of the field.input property*/
                    />
                    <div className="text-help">
                        { touched ? error : '' }
                    </div>
                </div>
            )
        }
    }

    onSubmit(values) {
        // this === components
        // this.props.createUser(values);
        //var props=this.props;
        console.log(values);
        axios.post('http://127.0.0.1:4000/checkvaliduser',{
            userId: values.userId,
            pwd: values.password
        }).then(function (response) {
            if(response.status === 200){
                localStorage.setItem("userId",values.userId);
                document.getElementById("errorResponse").style.display = "none";
                window.location.href = '/userdashboard';
            }
            else{
                document.getElementById("errorResponse").style.display = "block";
            }
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        });

    }

    render() {
        const {handleSubmit} = this.props;
        const errorMessage = "The username and password does not match";
        return (
            <form className="login-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) } noValidate>
                <span className="alert alert-danger" id="errorResponse">{errorMessage}</span>
                <Field
                    label="Email"
                    name="userId"
                    component={this.renderField}
                />
                <Field
                    label="Password"
                    name="password"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="btn btn-danger" to='/register'>Register</Link>
            </form>
        )
    }
}

function validate(values) {
//    console.log(values) -> { title: 'whatever', categories: 'the user has', content: 'entered'}
    const errors = {};
    // validate the inputs from 'values' .. name (property) field of the input will be taken as key for errors object.
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    console.log(re.test(values.userId));
    if(!values.userId || re.test(values.userId) === false){
        errors.userId="Enter a valid email";
    }
    if(!values.password){
        errors.password="Enter password";
    }

    // if errors is empty, the form is fine to submit.
    //if errors has *any* properties, redux form assumes form is invalid
    return errors
}

export default reduxForm({
    validate,
    form: 'CheckLoginForm'
})(LoginUser);