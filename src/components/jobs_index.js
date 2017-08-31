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
            return (
                <li id={job.id} className="list-group-item wordwrap" key={job.id} onClick={(event) => this.getDetail(event, job)}>
                    {job.company} ({job.profile})
                </li>
            );
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


    render(){

        return(
            <div>
                <div className="row"><h3 className="col-xs-6 pull-left">Your Jobs</h3>
                <Link className="pull-right btn btn-primary" to='/addJob'>Add Job</Link></div>
                <div className="col-xs-4">
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