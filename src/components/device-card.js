import React from 'react';

export default function DeviceCard({deviceData}) {
    var deviceCount = 0;

    if (typeof deviceData !== 'undefined') {
        deviceCount = Object.keys(deviceData.devices).length;
    }

    return  <div className="DeviceCard Card">
                <h3>{deviceCount} device(s) located inside building.</h3>
            </div>;
}