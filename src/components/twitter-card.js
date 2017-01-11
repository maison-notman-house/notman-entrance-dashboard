import React from 'react';
import {Timeline} from 'react-twitter-widgets';

/**
 * Crates a Twitter card for the dashboard
 */
export default class TwitterCardComponent extends React.Component {

    render() {

        return (
            <div className="Card">
                <Timeline
                    dataSource={{
                        sourceType: 'profile',
                        screenName: 'notman'
                    }}
                    options={{
                        username: 'notman',
                        height: '400',
                        chrome: 'nofooter, noborders, transparent, noscrollbar'
                    }}/>
            </div>
        );
    }

}