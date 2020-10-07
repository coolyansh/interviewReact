import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Interviews extends Component{

  constructor(props){
    super(props);
    this.state={
      isLoaded: 0,
      interviews: null,
    }
  }

  componentDidMount(){
    fetch("http://localhost:3001/interviews")
    .then(res => res.json())
    .then( (result) => {
      this.setState({
        isLoaded:1,
        interviews:result
      })
    }).catch((error) => {
      this.setState({
        isLoaded:2,
        interviews:null
      })
    });
  }

  render(){
    if(this.state.isLoaded === 0){
      return(
        <h1>Loading Interviews</h1>
      );
    }
    else if(this.state.isLoaded === 1){
      const interview_list = this.state.interviews.map( (interview) =>{
          return (
            <li key={interview.id}>
              <Link to={`/interviews/${interview.id}`} >
                {interview.interviewer.name} will interview {interview.interviewee.name} <br/><br/>
              </Link>
            </li>
          );
        }
        );
      return(
        <>
        <h1> Interviews List </h1>
        <ul>
            {interview_list}
        </ul>
        </>
      );
    }
    else{
      return(
        <h1>Unable to load Interviews due to some error</h1>
      );
    }
  }
}

export default Interviews;
