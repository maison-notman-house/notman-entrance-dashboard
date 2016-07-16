import React from 'react';

export default function EventsCard({events}) {
  
    events = events || [];
    
    return <div className="EventsCard Card">
      {events.map(createDay)}
    </div>;
}

function createDay(e) {
  let items = e.items.map(e => {
    return <div><span className="strong">{e.title}</span> {e.tags.join(', ') }</div>;
  });
  
  return <div className="EventsCard-day">
    <div className="EventsCard-day-name">
      {e.day}
    </div>
    
    {items}
  </div>;
}
