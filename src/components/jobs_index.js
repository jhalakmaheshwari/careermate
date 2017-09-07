/**
 * Created by Jhalak on 8/25/2017.
 */
import React, { Component } from 'react';
import { fetchJobs } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import JobDetail from './jobs_detail';
import { fetchJobDetail } from '../actions/index'
import { Link } from 'react-router-dom'
import _ from 'lodash';

class JobsIndex extends Component{




    componentDidMount() {
        this.props.fetchJobs();
    }
    renderJobs(){
        // var mapItems =
        return _.map(this.props.jobs, job => {
            console.log(job.company.toLowerCase().indexOf(document.getElementById('searchinput').value));
            if(document.getElementById('searchinput').value === ''){
                console.log("2nd if");
                return (
                    <li id={job.id} className="list-group-item wordwrap" key={job.id} onClick={(event) => this.getDetail(event, job)}>
                        {job.company} ({job.profile})
                    </li>
                )
            }
            else if(job.company.toLowerCase().indexOf(document.getElementById('searchinput').value) > -1){
                console.log("1st if");
                return (
                    <li id={job.id} className="list-group-item wordwrap" key={job.id} onClick={(event) => this.getDetail(event, job)}>
                        {job.company} ({job.profile})
                    </li>
                );
            }
                return <div></div>
            });
    }


    getDetail(event, result){
        var e1=document.querySelectorAll('li');
        [].forEach.call(e1, function(el) {
            el.classList.remove("active");
        });

        event.target.classList.add('active');
        this.props.fetchJobDetail(result.id);
    }

    logoutFn() {
        console.log('HEY')
        localStorage.clear();
        window.location.href='login';
    }
    render(){

        /*var total_jobs_arr = []
        _.map(this.props.jobs, job => {
            total_jobs_arr.push(job.company);
        });
        this.setState({items: total_jobs_arr});*/
        /*<button className="btn logout" onClick={this.logoutFn()}>Logout</button>*/
        return(
            <div>
                <div className="row">
                    <div className="col-xs-6">
                        <h3 className="pull-left"><span className="jobs">Your Jobs</span>
                            <button className="btn logout" onClick={() => this.logoutFn()}>Logout</button>
                            <h5>
                            <span className="label label-default"> Click on Jobs for information</span>
                            </h5>
                        </h3>
                    </div>
                <Link className="pull-right btn btn-primary" to='/addJob'>Add Job</Link>
                </div>
                <div className="col-xs-4">
                    <form className="navbar-form" role="search">
                        <div className="form-group">
                            <input id="searchinput" type="text" className="form-control" placeholder="Search" onKeyPress={() => this.renderJobs()} />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                    <ul className="list-group">
                        {this.renderJobs()}
                    </ul>
                </div>
                <div className="col-xs-8">
                    <JobDetail />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { jobs: state.jobs };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchJobDetail: fetchJobDetail, fetchJobs: fetchJobs }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsIndex);