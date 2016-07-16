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
//  let title = e.title;
//   if (title && title.length > 60) {
//      title = title.substring(0,60) + '...';
//   }
//   console.log('....... ' + e);
//   console.log('....... ' + title);

  let items = e.items.map(e => {
    return <div><span className="eventname">{createTitle(e.title)}</span> <span className={"roomlabel " + e.tags.join(', ').replace(' ','') } >{e.tags.join(', ') }</span></div>;
  });

  return <div className="EventsCard-day">
    <div className="EventsCard-day-name">
      {e.day}
    </div>

    {items}
  </div>;
}
