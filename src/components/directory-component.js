import React from 'react';
import Card from './card';


function createRooms(entry) {
    return (<li key={entry.room}>
        <span className="room">{entry.room}</span>
        <span className="organization">{entry.occupant}</span>
        </li>);
}

export default function DirectoryCard({
    count = 23,
    lang = 'en',
    location = 'entrance'
}) {

    var occupants = [
        { room: 101, occupant: 'Organisation 1'},
        { room: 102, occupant: 'Organisation 2'},
        { room: 103, occupant: 'Organisation 3'},
        { room: 104, occupant: 'Organisation 4'},
        { room: 105, occupant: 'Organisation 5'},
        { room: 106, occupant: 'Organisation 6'},
        { room: 107, occupant: 'Organisation 7'},
        { room: 108, occupant: 'Organisation 8'},
        { room: 109, occupant: 'Organisation 9'},
        { room: 110, occupant: 'Organisation 10'},
        { room: 111, occupant: 'Organisation 11'},
        { room: 112, occupant: 'Organisation 12'}
    ];
    

    return (
        <Card size="7">
            <h2>Directory ({location})</h2>
            <ul className="directory">
                {occupants.map(e => {
                    return createRooms(e);
                })}                
            </ul>
        </Card>
    );
}