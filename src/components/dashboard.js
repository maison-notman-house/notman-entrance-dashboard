import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Panel from './panel';
import LogoHeader from './logo-header';
import EventsCard from './events-card';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.getEvents().then(events => {
      this.setState({events: events})
    });
  }
  
  getEvents() {
    return fetch('https://notman.herokuapp.com/api/events')
      .then(response => response.json());
  }
  
  render() {
      return (
        <div>
        
          <LogoHeader/>
          
          <Panel>
            <span className="strong">Événements Maison Notman</span> &bull; Notman House Events
          </Panel>

          <EventsCard events={this.state.events}/>
          
          <Panel className="footer">
            <span className="strong">Sponsors</span>
          </Panel>
          
        </div>
      );
  }
}