import React from 'react';

export default function DeviceCard({deviceData}) {
    var deviceCount = 0;

    if (typeof deviceData !== 'undefined') {
        deviceCount = Object.keys(deviceData.devices).length;
    }

    return  <div className="DeviceCard Card">
        <div>
            <img className="DeviceCard--icon" src="/devices.png"/>
            {deviceCount} device(s) located inside building.</div>
    </div>;
}