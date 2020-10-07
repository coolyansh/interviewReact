import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Participants extends Component{

  constructor(props){
    super(props);
    this.state={
      isLoaded: 0,
      participants: null,
    }
  }

  componentDidMount(){
    fetch("http://localhost:3001/participants")
    .then(res => res.json())
    .then( (result) => {
      this.setState({
        isLoaded:1,
        participants:result
      })
    }).catch((error) => {
      this.setState({
        isLoaded:2,
        participants:null
      })
    });
  }

  render(){
    if(this.state.isLoaded === 0){
      return(
        <h1>Loading Participants</h1>
      );
    }
    else if(this.state.isLoaded === 1){
      const participant_list = this.state.participants.map( (participant) =>{
          return (
            <li key={participant.id}>
              <Link to={`/participants/${participant.id}`} >
                {participant.name} : {participant.role} ( {participant.email} )<br/><br/>
              </Link>
            </li>
          );
        }
        );
      return(
        <>
        <h1> Participants List </h1>
        <ul>
            {participant_list}
        </ul>
        </>
      );
    }
    else{
      return(
        <h1>Unable to load Particpants due to some error</h1>
      );
    }
  }
}

export default Participants;
