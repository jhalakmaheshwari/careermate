/**
 * Created by Jhalak on 8/25/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createJobForUser } from '../actions';
import { connect } from 'react-redux';


class AddJob extends Component{

    renderField(field) {
        /*without constant meta: const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;*/
        const {meta: {touched, error}} = field;
        /*
         The above part is called destructuring properties.
         with const meta: */
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        if (field.label !== "Interview Date") {
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
            return(
                <div className={className}>
                    <label>{ field.label }</label>
                    <input
                        className="form-control"
                        type="date"
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
        console.log(values)
        this.props.createJobForUser(values);
        this.props.history.push('/userdashboard');
    }
    render(){

        if(!localStorage.getItem('userId')){
            this.props.history.push('/login');
        }

        const { handleSubmit } = this.props;
        return (
            <div>
            <form className="login-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <h4 className="col-xs-12">Welcome {localStorage.getItem('userId')}</h4>
                <Field
                    label="Company"
                    name="company"
                    component={this.renderField}
                />
                <Field
                    label="Job Profile"
                    name="profile"
                    component={this.renderField}
                />
                <Field
                    label="Interview Date"
                    name="interviewdate"
                    component={this.renderField}
                />
                <Field
                    label="Job Application Link (you want to save for future)"
                    name="joblink"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary pull-left">Add</button>
                <Link className="btn btn-danger pull-right" to='/userdashboard'>Cancel</Link>
            </form>
            </div>
        )
    }
}

function validate(values) {
//    console.log(values) -> { title: 'whatever', categories: 'the user has', content: 'entered'}
    const errors = {};
    // validate the inputs from 'values' .. name (property) field of the input will be taken as key for errors object.
    if(!values.company){
        errors.company="Enter a company name"
    }
    if(!values.profile){
        errors.profile="Enter a job profile"
    }
    // if errors is empty, the form is fine to submit.
    //if errors has *any* properties, redux form assumes form is invalid
    return errors
}

export default reduxForm({
    validate,
    form: 'PostJobData'
})(
    connect(null, { createJobForUser })(AddJob)
);