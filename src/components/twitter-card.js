import React from 'react';
import {Timeline} from 'react-twitter-widgets';

/**
 * Crates a Twitter card for the dashboard
 */
export default class TwitterCardComponent extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    
    render() {
        var height = this.props.height || 400;
        
        return (
            <div className="Card TwitterCard">
                <Timeline
                    dataSource={{
                        sourceType: 'profile',
                        screenName: 'notman'
                    }}
                    options={{
                        username: 'notman',
                        height: `${height}`,
                        chrome: 'nofooter, noborders, transparent, noscrollbar'
                    }}/>
            </div>
        );
    }

}