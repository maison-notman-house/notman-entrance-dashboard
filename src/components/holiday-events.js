import React from 'react';

export default class HolidayEventsCard extends React.Component {

    render() {
        var style = {
            'font-weight': 'bold'
        };

        return <div className="EventsCard Card">
            <h3>Osmo Café & Notman House</h3>
            <ul>
                <li>
                    <span style={style}>Closes:</span>
                    Friday, 23 December 2016 @ 17h00 (5pm)</li>
                <li>
                    <span style={style}>Reopens:</span>
                    Monday, 2 January 2017</li>
            </ul>
        </div>;
    }

}