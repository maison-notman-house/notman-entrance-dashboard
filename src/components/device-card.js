import React from 'react';

export default function DeviceCard({deviceData}) {
    var deviceCount = 0;

//     var style = {
//         float: 'right',
//         width: '100px',
//         fontSize: 'small'
//     };

    if (typeof deviceData !== 'undefined') {
        deviceCount = Object.keys(deviceData.devices).length;
    }

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="/devices.png"/>
                    Current occupancy is {deviceCount}.
                    <div className="deviceVendor">

                        Data provided by <img className="vendorLogo" src="/logos/reelyactive.png" />
                    </div>
                </div>
            </div>;
}