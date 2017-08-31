/**
 * Created by Jhalak on 8/25/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import axios from 'axios';

class RegisterUser extends Component{
    componentDidMount(){
        this.state = {};
    }

    renderField(field){

        /*without constant meta: const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;*/
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
                        type="text"
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
        const request = axios.post("http://127.0.0.1:4000/createuser",{
            values: values
        }).then(function (response) {
            if(response.status === 200){
                localStorage.setItem('userId', values.userId);
                window.location.href = '/userdashboard';
            }
        });
    }


    render() {
        const { handleSubmit } = this.props;

            return (
                <form className="login-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Field
                        label="Name"
                        name="name"
                        component={this.renderField}
                    />
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className="btn btn-danger" to='/'>Cancel</Link>
                </form>
            )
    }
}

function validate(values) {
//    console.log(values) -> { title: 'whatever', categories: 'the user has', content: 'entered'}
    const errors = {};
    // validate the inputs from 'values' .. name (property) field of the input will be taken as key for errors object.
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\],;:\s@\"]{2,})$/i;
    if(!values.name){
        errors.name="Enter a name"
    }
    if(!values.userId || re.test(values.userId) === false){
        errors.userId="Enter a valid email"
    }
    if(!values.password){
        errors.password="Enter password"
    }


    // if errors is empty, the form is fine to submit.
    //if errors has *any* properties, redux form assumes form is invalid
    return errors
}


export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(RegisterUser);
