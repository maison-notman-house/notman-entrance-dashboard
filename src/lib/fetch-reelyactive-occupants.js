
const NOTMAN_REELYACTIVE_URL = 'https://www.hyperlocalcontext.com/contextat/directory/notman';
import {filter} from 'lodash';

module.exports = function fetchReelyActiveOccupants() {
    const options = {
        headers: {'Accept': 'application/json'}
    };
    return fetch(NOTMAN_REELYACTIVE_URL, options).then(response => {
        console.log('GETTING RESPONSE', response);
        return response.json();
    }).then(response => {
        console.log(response);
        const devices = response.devices;
        if (!devices) throw new Error('Unable to get reelyActive occupants');
    
        const filteredDevices = filter(devices, device => {
            return device.url && !device.url.endsWith('RA-R432/');
        });
    
        return filteredDevices;
    });
};