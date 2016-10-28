import React from 'react';
import Moment from 'moment';

export default class DeviceCardComponent  extends React.Component {

  setDeviceData(idx) {

     if (idx === undefined) {
         this.sourceIdx++;
         if (this.sourceIdx >= this.sources.length) {
             this.sourceIdx = 0;
         }
         idx = this.sourceIdx;
     }

     var scope = this;

     var data = fetch(scope.sources[idx].url).then(response => response.json()).then(function(data) {
        return data;
     }).then(function(data) {
         scope.setState({
            device:  scope.sources[idx],
            data: data,
            lastUpdated: new Date()
         });
     }).catch(function(error) {
         scope.setState({
            device:  scope.sources[idx],
            data: undefined,
            lastUpdated: new Date()
         });
     });

  }

  update() {

  }

  componentWillMount() {

//    this.refreshIntervalMinutes = 1;
    this.apiKeysUrl = 'https://notman.herokuapp.com/api/keys';

    this.refreshIntervalSeconds = 15;
    this.sourceIdx = 0;
    this.sources = [{
       id: 'reelyactive',
       name:'Reely Active',
       logo: 'images/logos/reelyactive.svg',
       url: 'https://www.hyperlocalcontext.com/contextat/directory/notman',
       text: value => `${value} ghost${value == 1 ? '' : 's'} haunting the house`,
       value: function(deviceData) {
            var deviceCount = 0;
            var i=0;

            if (typeof deviceData !== 'undefined') {
                var devices = deviceData.devices;
                var key;
                for (key in devices) {
                    var device = devices[key];
                    if (device.nearest && device.url !== 'http://reelyactive.com/products/ra-r436/') {
                        deviceCount++;
                    }
                }
            } else {
                deviceCount = -1;
            }
            return deviceCount;
       }
       }
       , {
       id: 'myseat',
  	   name:'mySeat',
  	   logo: 'images/logos/myseat.png',
  	   // TODO fetch key from somewhere
  	   url: 'https://notman.herokuapp.com/api/myseat/chairs',
  	   text: value => `${value} undead in Osmo Café`,
  	   value: function(deviceData) {
  	        // Note that id_geometry = 0 should not be ignored. It simply means the
  	        // device has not been linked to the map. Which was indicated as
  	        // being the case for the sensors in the Osmo Café
            var seated = 0;
            if (typeof deviceData !== 'undefined') {
                try {
                    if (deviceData && deviceData.Error.length === 0) {
                        var i, chairs = deviceData.Content.Chairs;
                        for (i=0; i<chairs.length; i++) {
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
  	   }];

       this.setDeviceData(0);
  }


  componentDidMount() {
      window.setInterval(function () {
         this.setDeviceData();
      }.bind(this), (this.refreshIntervalSeconds * 1000));

  }

  render() {

    var lastUpdated = '';
    var lang = 'en';

    if (this.state && this.state.lastUpdated) {
        var time = Moment(this.state.lastUpdated).locale(lang).format('HH:mm');
        var date = Moment(this.state.lastUpdated).locale(lang).format('DD MMMM YYYY');

        lastUpdated = `Last updated at: ${time} on ${date}`;
    }

    if (!this.state) {
        return  <div className="DeviceCard Card"><div></div></div>;
    }

    var imgStyle = {
        width: '100px'
    };

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="images/halloween2016/ghost-151064.svg" style={imgStyle} />
                    {this.state.device.text(this.state.device.value(this.state.data))}.

                    <div className="deviceVendor">

                        Data provided by <img className="vendorLogo" src={this.state.device.logo} />
                    </div>
                </div>
            </div>;
  }

}
