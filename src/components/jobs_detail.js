/**
 * Created by Jhalak on 8/25/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDate, updateToDo, updateResume } from '../actions/index'
import { bindActionCreators} from 'redux';
import { fetchJobs } from '../actions';
import _ from 'lodash';

class JobDetail extends Component{

    componentDidMount(){
        // this.props.fetchJobs();
        console.log('SEE')
        this.setState({
           idate: ""
        });
    }

    dateUpdate(event,id){
        this.props.updateDate(id, event.target.value);
        this.setState({
            idate: event.target.value
        });
        document.getElementById(id).click();
    }
    renderDate(jDetail){
        /*this.setState({
            idate: jDetail.interviewdate
        });*/
        console.log(this.state);
        if(this.state !=null){
            if(jDetail.interviewdate == null){
                return (<div>Estimated Interview date <input
                    className="form-control"
                    type="date" onChange={(event) => this.dateUpdate(event, jDetail.id)}/>
                </div>);
                }
            else{
                if(this.state.idate != "")
                    return <div><span>Estimated Interview date: {this.state.idate}</span></div>
                else
                    return <div><span>Estimated Interview date: {jDetail.interviewdate}</span></div>
            }
        }
        return (
            <div>LOADING..</div>
        )
    }

    deleteTodo(event, jDetail){
        let toDoArr = []
        if (jDetail.toDoTasks !== null && jDetail.toDoTasks !== undefined) {
            toDoArr = jDetail.toDoTasks;
        }
        toDoArr.splice(event.target.id, 1);
        console.log(toDoArr)
        this.props.updateToDo(jDetail.id, toDoArr);
        setTimeout(
            function () {
                document.getElementById(jDetail.id).click();
            }
            , 100)
        document.getElementById('todoinput').value = "";
    }

    newTodo(event, jDetail){
        if(event.type === 'keypress') {
            let code = (event.keyCode ? event.keyCode : event.which);
            if (code === 13) {
                let toDoArr = []
                if (jDetail.toDoTasks !== null && jDetail.toDoTasks !== undefined) {
                    toDoArr = jDetail.toDoTasks;
                }
                toDoArr.push(event.target.value);
                console.log(toDoArr)
                this.props.updateToDo(jDetail.id, toDoArr);
                setTimeout(
                    function () {
                        document.getElementById(jDetail.id).click();
                    }
                    , 100)
                event.target.value = "";
            }
        }
        else if(event.type === 'click'){
            let toDoArr = []
            if (jDetail.toDoTasks !== null && jDetail.toDoTasks !== undefined) {
                toDoArr = jDetail.toDoTasks;
            }
            toDoArr.push(document.getElementById('todoinput').value);
            console.log(toDoArr)
            this.props.updateToDo(jDetail.id, toDoArr);
            setTimeout(
                function () {
                    document.getElementById(jDetail.id).click();
                }
                , 100)
            document.getElementById('todoinput').value = "";
        }
    }

    /*calendarClick(){
        console.log('HEY');
        addeventatc.register('button-dropdown-show', function(obj){
            // Console log example
            console.log('button-dropdown-show -> ' + obj.id);
        });
    }*/

    renderToDo(toDoTasks) {
        var inc=0;
        return _.map(toDoTasks.toDoTasks, task => {
            return (
                <li className="list-group-item">
                    {task}
                    <span className="glyphicon glyphicon-remove pull-right" id={inc++} onClick={(event) => this.deleteTodo(event, toDoTasks)}></span>
                </li>
            );
        });
    }

    onSubmitResume(e, jDetail){
        console.log("UPLOAD ");
        e.preventDefault();
        console.log(document.getElementById('resume').files[0]);
        this.props.updateResume(jDetail.id, document.getElementById('resume').files[0]);
        // console.log(values);
    }

    renderDetail(){
            console.log("HEHHEHEHEHE");
            if(this.props.fetchJobDetail.data != null) {
                const jDetail = this.props.fetchJobDetail.data[0];
                return (
                    <div className="indent-outer">
                        <h3 className="col-xs-12 center">{jDetail.company}</h3>
                        <div className="col-xs-12 list-group-item">{this.renderDate(jDetail)}</div>
                        <br />
                            <div className="col-xs-12 col-lg-6 input-group">
                            <input type="text" className="form-control todoinp" id="todoinput" placeholder="Write new Todo and press enter" onKeyPress={(event) => this.newTodo(event, jDetail)} aria-describedby="basic-addon2"/>
                                <span id="basic-addon2"><input className="center btn btn-ss btn-ss-alt btn-xs" type="submit" value="Add To-Do" onClick={(event) => this.newTodo(event, jDetail)} /></span>
                            {jDetail.toDoTasks ?
                            (<ul className="col-xs-12 ulpadding">{this.renderToDo(jDetail)}</ul>)
                            :
                                (<span className="distance-it"><b>No To-Do tasks</b></span>)
                        }
                        </div>
                        <div className="col-xs-12 list-group-item">
                            <form type="submit" onSubmit={ (event) => this.onSubmitResume(event, jDetail) }>
                                <input type="file" id="resume" accept="application/pdf" />
                                <button type="submit">UPLOAD</button>
                            </form>
                        </div>
                    </div>
                )
            }
            return (<div></div>)
        };


    render()
    {
        return (
            <div>{this.renderDetail()}</div>
        )
    }
}

function mapStateToProps(state) {
    return { fetchJobDetail: state.fetchJobDetail };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateDate: updateDate, fetchJobs: fetchJobs, updateToDo: updateToDo, updateResume: updateResume }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);