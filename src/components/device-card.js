import React from 'react';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        'providedBy': 'Data provided by'
    },
    fr: {
        'providedBy': 'Données fournis par'
    }
});

export default class DeviceCardComponent extends React.Component {

    setDeviceData(idx) {

        this.sourceIdx = 0;

        if (idx === undefined) {
            // this.sourceIdx++;
            // if (this.sourceIdx >= this.sources.length) {
            //     this.sourceIdx = 0;
            // }
            idx = this.sourceIdx;
        }

        var lang = 'en';
        if (this.props.lang) {
            lang = this.props.lang;
        }

        var scope = this;
        fetch(scope.sources[this.sourceIdx].url)
            .then(response => response.json())
            .then(function (data) {
                return data;
            })
            .then(function (data) {
                scope.setState({device: scope.sources[idx], data: data, lastUpdated: new Date(), lang: lang});
            })
            .catch(function (error) {
                
                scope.setState({device: scope.sources[idx], data: undefined, lastUpdated: new Date(), lang: lang});
            });

    }

    update() {}

    componentWillReceiveProps(nextProps) {
        strings.setLanguage(nextProps.lang);
        this.setState(
            Object.assign(this.state, { lang: nextProps.lang})
        );
    }

    componentWillMount() {        
        this.apiKeysUrl = 'https://notman.herokuapp.com/api/keys';

        this.refreshIntervalSeconds = 15;
        this.sourceIdx = 0;
        this.sources = [
            {
                id: 'reelyactive',
                name: 'Reely Active',
                logo: 'images/logos/reelyactive.svg',
                url: 'https://notman.herokuapp.com/api/reelyactive/devices',
                text: {
                    en: value => `${value} occupant${value === 1?'':'s'} in Notman`,
                    fr: value => `${value} occupant${value === 1?'':'s'} dans Notman`
                },
                value: function (deviceData) {
                    var deviceCount = 0;

                    if (typeof deviceData !== 'undefined') {
                        var devices = deviceData.devices;
                        var key;
                        for (key in devices) {
                            if (devices[key] !== undefined) {
                                var device = devices[key];
                                // only count 'mobile' devices
                                if(!device.fixedDevice) {
                                    deviceCount++;
                                } 
                            }
                        }
                    } else {
                        deviceCount = -1;
                    }
                    return deviceCount;
                }
            }, {
                id: 'myseat',
                name: 'mySeat',
                logo: 'images/logos/myseat.png',
                // TODO fetch key from somewhere
                url: 'https://notman.herokuapp.com/api/myseat/chairs',
                text: {
                    en: value => `${value} people in Osmo Café`,
                    fr: value => `${value} personnes dans Café Osmo `
                },
                value: function (deviceData) {
                    // Note that id_geometry = 0 should not be ignored. It simply means the device
                    // has not been linked to the map. Which was indicated as being the case for the
                    // sensors in the Osmo Café
                    var seated = 0;
                    if (typeof deviceData !== 'undefined') {
                        try {
                            if (deviceData && deviceData.Error.length === 0) {
                                var i,
                                    chairs = deviceData.Content.Chairs;
                                for (i = 0; i < chairs.length; i++) {
                                    if (chairs[i].status === 1) {
                                        seated++;
                                    }
                                }
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    } else {
                        seated = '??';
                    }

                    return seated;
                }
            }
        ];

        this.setDeviceData(0);
    }

    componentDidMount() {
        window
            .setInterval(function () {
                this.setDeviceData();
            }.bind(this), (this.refreshIntervalSeconds * 1000));
    }

    render() {

        if (!this.state) {
            return <div className="DeviceCard Card">
                <div></div>
            </div>;
        }

        var value = 'n/a';
        if (this.state.device) {
            var txtFn = this.state.device.text[strings.getLanguage()];
            value = txtFn(this.state.device.value(this.state.data));
        }

        var deviceLogo = '';
        var deviceName = '';
        if (this.state && this.state.device) {
            deviceLogo = this.state.device.logo;
            deviceName = this.state.device.name;
        }

        return <div className="DeviceCard Card">
            <div>
                <img
                    className="DeviceCard--icon"
                    src="images/house-emojis/hackthehouse-smiling.gif"
                    alt="◉‿◉"/> {value}.
                <div className="deviceVendor">
                    {strings.providedBy}
                    <img
                        className="vendorLogo"
                        src={deviceLogo}
                        alt={deviceName}/>
                </div>
            </div>
        </div>;
    }
}
