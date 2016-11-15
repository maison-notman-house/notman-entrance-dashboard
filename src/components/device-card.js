import React from 'react';

export default class DeviceCardComponent  extends React.Component {

  setDeviceData(idx) {

    this.sourceIdx = 0;
//      if (idx === undefined) {
//          this.sourceIdx++;
//          if (this.sourceIdx >= this.sources.length) {
//              this.sourceIdx = 0;
//          }
//          idx = this.sourceIdx;
//      }

     var scope = this;

     fetch(scope.sources[idx].url).then(response => response.json()).then(function(data) {
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

    this.apiKeysUrl = 'https://notman.herokuapp.com/api/keys';

    this.refreshIntervalSeconds = 15;
    this.sourceIdx = 0;
    this.sources = [{
       id: 'reelyactive',
       name:'Reely Active',
       logo: 'images/logos/reelyactive.svg',
       url: 'https://www.hyperlocalcontext.com/contextat/directory/notman',
       text: value => `${value} occupant${value === 1 ? '' : 's'} in Notman`,
       value: function(deviceData) {
            var deviceCount = 0;

            if (typeof deviceData !== 'undefined') {
                var devices = deviceData.devices;
                var key;
                for (key in devices) {
                    if (devices[key] !== undefined) {
                        var device = devices[key];
                        if (device.nearest && device.url !== 'http://reelyactive.com/products/ra-r436/') {
                            deviceCount++;
                        }
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
  	   text: value => `${value} people in Osmo Café`,
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

    if (!this.state) {
        return  <div className="DeviceCard Card"><div></div></div>;
    }

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="images/house-emojis/hackthehouse-smiling.gif" alt="◉‿◉" />
                    {this.state.device.text(this.state.device.value(this.state.data))}.
                    <div className="deviceVendor">
                        Data provided by <img className="vendorLogo" src={this.state.device.logo} alt={this.state.device.name}/>
                    </div>
                </div>
            </div>;
  }

}
