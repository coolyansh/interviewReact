import React, { Component } from 'react';
import {withRouter } from 'react-router-dom';

class ParticipantEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      status: "Initial",
      errors: null,
      participant: null,
      name: '',
      role: 'Interviewer',
      email: '',
    }
    this.fileInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    fetch("http://localhost:3001/participants/"+ id)
    .then(res => res.json())
    .then( (result) => {
      this.setState({
        name: result.name,
        email: result.email,
        role: result.role
      })
    }).catch((error) => {
      this.setState({
        status: "Network Error"
      });
      console.log(error);
    });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(){
    var formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('role', this.state.role);
    if(this.fileInput.current.files.length > 0){
      formData.append('resume', this.fileInput.current.files[0]);
    }
    const id = this.props.match.params.id;
    fetch('http://localhost:3001/participants/'+id, {
      method: 'PATCH',
      body: formData
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(obj => {
      if(obj.status>=200 && obj.status<300)
      {
        this.setState({
          status: "Success",
          participant: obj.body,
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
        Name : <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/><br/><br/>
        Email : <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/><br/><br/>
        Role :
        <select name="role" value={this.state.role} onChange={this.handleChange}>
          <option value="Interviewer">Interviewer</option>
          <option value="Interviewee">Interviewee</option>
        </select>
        <br/><br/>
        Resume :
        <input type="file" name="resume" ref={this.fileInput}/><br/><br/>
        <button type="button" id="submit_button" name="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
    if(this.state.status === "Initial"){
      return(
        <>
        <h1>Edit Participant</h1>
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
        <h1>Edit Participant</h1>
        {form_layout}
        <h3>The following error occured while editing the participant:</h3>
        <ul>
        {error_layout}
        </ul>
        </>
      );
    }
    else if(this.state.status === "Success"){
      return(
        <>
        <h1>Participant was successfully edited.</h1>
        <h3>Details are as follows :</h3><br/>
        <p>
          Name : {this.state.participant.name}<br/>
          Role : {this.state.participant.role}<br/>
          Email : {this.state.participant.email}<br/>
        </p>
        </>
      );
    }
    else {
      return(
        <h1> Network Error. Unable to edit Participant.</h1>
      );
    }
  }
}

export default withRouter(ParticipantEdit);
