import React from 'react';

export default function EventsCard({events}) {

    events = events || [];

    return <div className="EventsCard Card">
      {events.map(createDay)}
    </div>;
}


function createTitle(title) {
   if (title && title.length > 50) {
     title = title.substring(0,50) + '...';
   }
   return title;
}

function createDay(e) {

  let items = e.items.map(e => {
    return <div> <span className={"roomlabel " + e.tags.join(', ').replace(' ','') } >{e.tags.join(', ') }</span> <span className="eventname">{createTitle(e.title)}</span></div>;
  });

  return <div className="EventsCard-day">
    <h3>
      {e.day}
    </h3>

    {items}
  </div>;
}
