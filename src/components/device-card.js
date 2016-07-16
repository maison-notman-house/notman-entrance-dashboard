import React from 'react';

export default function DeviceCard({deviceData}) {
    var deviceCount = 0;

    var style = {
        float: 'right',
        width: '100px',
        fontSize: 'small'
    };

    if (typeof deviceData !== 'undefined') {
        deviceCount = Object.keys(deviceData.devices).length;
    }

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="/devices.png"/>
                    Current occupancy is {deviceCount}.
                    <div style={style}>
                        <br /><br /><br /><br />
                        Data provided by <img src="/logos/reelyactive.png" width="50%" height="50%" />
                    </div>
                </div>
            </div>;
}