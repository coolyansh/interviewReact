import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Participants from './Participants'
import ParticipantDetail from './ParticipantDetail'
import ParticipantEdit from './ParticipantEdit'
import NewParticipant from './NewParticipant'
import Interviews from './Interviews'
import InterviewDetail from './InterviewDetail'
import InterviewEdit from './InterviewEdit'
import NewInterview from './NewInterview'
import PageNotFound from './PageNotFound'

class Main extends Component{
  render(){
    return(
      <>
      <Header/><br/>
      <Switch>
        <Route exact path="/participants">
          <Participants/>
        </Route>
        <Route exact path="/participants/:id">
          <ParticipantDetail/>
        </Route>
        <Route exact path="/participants/:id/edit">
          <ParticipantEdit/>
        </Route>
        <Route path="/participant_new">
          <NewParticipant/>
        </Route>
        <Route exact path="/">
          <Interviews/>
        </Route>
        <Route exact path="/interviews/:id">
          <InterviewDetail/>
        </Route>
        <Route exact path="/interviews/:id/edit">
          <InterviewEdit/>
        </Route>
        <Route path="/interview_new">
          <NewInterview/>
        </Route>
        <Route path="*">
         <PageNotFound/>
        </Route>
      </Switch>
      <Footer/><br/>
      </>
    );
  }
}

export default Main;
