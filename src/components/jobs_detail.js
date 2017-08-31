/**
 * Created by Jhalak on 8/25/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDate, updateToDo } from '../actions/index'
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
                    return this.state.idate
                else
                    return jDetail.interviewdate
            }
        }
        return (
            <div>LOADING..</div>
        )
    }

    newTodo(event, jDetail){
        let code = (event.keyCode ? event.keyCode : event.which);
        console.log(code);
        if(code === 13) {
            let toDoArr = []
            if(jDetail.toDoTasks != null){
                toDoArr = jDetail.toDoTasks;
            }
            toDoArr.push(event.target.value);
            console.log(toDoArr)
            this.props.updateToDo(jDetail.id,toDoArr);
            setTimeout(
                function () {
                    document.getElementById(jDetail.id).click();
                }
            , 100)
            event.target.value="";
        }
    }

    renderToDo(toDoTasks) {
        return _.map(toDoTasks, task => {
            return (
                <li className="list-group-item">
                    {task}
                </li>
            );
        });
    }

    renderDetail(){
            console.log("HEHHEHEHEHE");
            if(this.props.fetchJobDetail.data != null) {
                const jDetail = this.props.fetchJobDetail.data[0];
                return (
                    <div className="row">
                        <h3 className="col-xs-12 list-group-item">{jDetail.company}</h3>
                        <div className="col-xs-12 list-group-item">About</div>
                        <div className="col-xs-12 list-group-item">{this.renderDate(jDetail)}</div>
                        <div className="col-xs-12 list-group-item"><span className="glyphicon glyphicon-plus">Add to-do task</span>
                        </div>
                        <div className="col-xs-12">
                            <input type="text" placeholder="Write new Todo and Enter" onKeyPress={(event) => this.newTodo(event, jDetail)}/>
                        {jDetail.toDoTasks ?
                            (<ul className="col-xs-12 list-group-item">{this.renderToDo(jDetail.toDoTasks)}</ul>)
                            :
                            (<span>No To-Do tasks</span>)
                        }
                        </div>

                    </div>
                )
            }
            return (<div>LOADING</div>)
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
    return bindActionCreators({ updateDate: updateDate, fetchJobs: fetchJobs, updateToDo: updateToDo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);