import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class InterviewEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      status: "Initial",
      errors: null,
      interview: null,
      interviewers: [],
      interviewees: [],
      interviewer_id: '',
      interviewee_id: '',
      start_time: '',
      end_time: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:3001/participants')
    .then(response => {
      return response.json()
    })
    .then(data => {
      let interviewers_list=[];
      let interviewees_list=[];
      data.map( participant => {
        if(participant.role === "Interviewer")
          interviewers_list.push({id: participant.id, name: participant.name});
        else
          interviewees_list.push({id: participant.id, name: participant.name});
        return 0;
      });
      this.setState({
        interviewers: interviewers_list,
        interviewees: interviewees_list,
        interviewer_id: (interviewers_list.length > 0)?interviewers_list[0].id.toString():'',
        interviewee_id: (interviewees_list.length > 0)?interviewees_list[0].id.toString():'',
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        status: "Network Error"
      });
    });

    const id = this.props.match.params.id;
    fetch("http://localhost:3001/interviews/"+ id)
    .then(res => res.json())
    .then( (result) => {
      this.setState({
        interviewer_id: result.interviewer_id,
        interviewee_id: result.interviewee_id,
        start_time: result.start_time.substring(0,result.start_time.length-1),
        end_time: result.end_time.substring(0,result.end_time.length-1)
      })
    }).catch((error) => {
      this.setState({
        status: "Network Error"
      })
    });
    console.log(this.state);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(){
    var formData = new FormData();
    formData.append('interviewer_id', this.state.interviewer_id);
    formData.append('interviewee_id', this.state.interviewee_id);
    formData.append('start_time', this.state.start_time);
    formData.append('end_time', this.state.end_time);
    const id = this.props.match.params.id;
    fetch('http://localhost:3001/interviews/'+id, {
      method: 'PATCH',
      body: formData
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
      if(obj.status>=200 && obj.status<300)
      {
        this.setState({
          status: "Success",
          interview: obj.body,
        });
      }
      else {
        this.setState({
          status: "Error",
          errors: obj.body,
        });
      }
    })
    .catch( (error) =>{
      this.setState({
        status: "Network Error",
      });
    })
  }

  render(){
    const form_layout =(
      <div>
        Interviewer :
        <select name="interviewer_id" value={this.state.interviewer_id} onChange={this.handleChange}>
          {this.state.interviewers.map((interviewer) => <option key={interviewer.id} value={interviewer.id}>{interviewer.name}</option>)}
        </select><br/><br/>
        Interviewee :
        <select name="interviewee_id" value={this.state.interviewee_id} onChange={this.handleChange}>
          {this.state.interviewees.map((interviewee) => <option key={interviewee.id} value={interviewee.id}>{interviewee.name}</option>)}
        </select><br/><br/>
        Start Time :
        <input type="datetime-local" name="start_time" value={this.state.start_time} onChange={this.handleChange}></input><br/><br/>
        End Time :
        <input type="datetime-local" name="end_time" value={this.state.end_time} onChange={this.handleChange}></input><br/><br/>
        <button type="button" id="submit_button" name="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
    if(this.state.status === "Initial"){
      return(
        <>
        <h1>Edit Interview</h1>
        {form_layout}
        </>
      );
    }
    else if(this.state.status === "Error"){
      const error_layout = Object.entries(this.state.errors).map( ([key,val]) => {
        return(
          <li>
          {key} : {val}
          </li>
        );
      });

      return(
        <>
        <h1>Edit Interview</h1>
        {form_layout}
        <h3>The following error occured while editing the interview:</h3>
        <ul>
        {error_layout}
        </ul>
        </>
      );
    }
    else if(this.state.status === "Success"){
      return(
        <>
        <h1>Interview was successfully edited.</h1>
        <h3>Details are as follows :</h3><br/>
        <p>
          Interviewer : {this.state.interview.interviewer.name}<br/>
          Interviewee : {this.state.interview.interviewee.name}<br/>
          Start Time : {this.state.interview.start_time}<br/>
          End Time : {this.state.interview.end_time}<br/>
        </p>
        </>
      );
    }
    else {
      return(
        <h1> Network Error. Unable to create Interview.</h1>
      );
    }
  }
}

export default withRouter(InterviewEdit);
