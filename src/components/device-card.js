import React from 'react';

export default class DeviceCardComponent  extends React.Component {

  setDeviceData() {

     this.sourceIdx++;
     if (this.sourceIdx >= this.sources.length) {
         this.sourceIdx = 0;
     }

     // TODO improve this promise code

     var scope = this;
     var idx = this.sourceIdx;
     var data = fetch(scope.sources[idx].url).then(response => response.json()).then(function(data) {
        return data;
     }).then(function(data) {
         scope.setState({
            device:  scope.sources[idx],
            data: data
         });
     });

  }

  update() {

  }

  componentWillMount() {

     // TODO ideally we should be able to do something like:
     //    'Current building occupancy is ${value}'

  	this.sourceIdx = 0;
  	this.sources = [{
  	   name:'Reely Active',
  	   logo: '/logos/reelyactive.png',
  	   url: 'https://www.hyperlocalcontext.com/contextat/directory/notman',
  	   text: value => `Current building occupancy is ${value}`,
  	   value: function(deviceData) {
            var deviceCount = 0;
            if (typeof deviceData !== 'undefined') {
                deviceCount = Object.keys(deviceData.devices).length;
            }
            return deviceCount;
  	   }
  	   }];

       this.setDeviceData();
  }


  componentDidMount() {
         window.setInterval(function () {
          this.setDeviceData();
        }.bind(this), 30000);
  }

  render() {

    if (!this.state) {
        return  <div className="DeviceCard Card"><div></div></div>;
    }

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="/house-emojis/hackthehouse-smiling.gif"/>
                    {this.state.device.text(this.state.device.value(this.state.data))}.
                    <div className="deviceVendor">

                        Data provided by <img className="vendorLogo" src={this.state.device.logo} />
                    </div>
                </div>
            </div>;
  }

}