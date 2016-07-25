import React from 'react';

export default function EventsCard({events}) {

    events = events || [];

    return <div className="EventsCard Card">
      {events.map(createDay)}
    </div>;
}

function locationForDisplay (room) {
   const locationMap = {
      'cafe': 'osmo café',
      'big room': 'big room',
      'glass door room': 'glass door',
      'glass door': 'glass door'
   };
   if (locationMap[room]) {
       return locationMap[room];
   }

   return room;
}

function createDay(e) {

  let items = e.items.map((e,idx) => {
    return <div className="event" key={e.date + '-' + idx}> <span className={"roomlabel " + e.tags.join(', ').replace(' ','') } >{locationForDisplay(e.tags.join(', ')) }</span> <span className="eventtime">{e.start}</span> <span className="eventname">{e.title}</span></div>;
  });

  return <div className="EventsCard-day" key={e.date}>
    <div className="EventsCard-day-name">
      {e.day}
    </div>

    {items}
  </div>;
}
