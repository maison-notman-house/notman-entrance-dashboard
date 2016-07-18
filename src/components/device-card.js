import React from 'react';

export default function DeviceCard({deviceData}) {
    var deviceCount = 0;

    if (typeof deviceData !== 'undefined') {
        deviceCount = Object.keys(deviceData.devices).length;
    }

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="/house-emojis/hackthehouse-smiling.gif"/>
                    Current building occupancy is {deviceCount}.
                    <div className="deviceVendor">

                        Data provided by <img className="vendorLogo" src="/logos/reelyactive.png" />
                    </div>
                </div>
            </div>;
}