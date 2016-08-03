import React from 'react';
import Moment from 'moment';

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
            data: data,
            lastUpdated: new Date()
         });
     });

  }

  update() {

  }

  localise(key, lang, params) {
     if (this.localised && this.localised[lang] && this.localised[lang][key]) {
        if (typeof this.localised[lang][key] === 'function') {
            return this.localised[lang][key].apply(this, params);
        } else {
            return this.localised[lang][key];
        }
     } else {
        return key;
     }
  }

  componentWillMount() {

    this.refreshIntervalMinutes = 1;
  	this.sourceIdx = 0;
  	this.sources = [{
  	   name:'Reely Active',
  	   logo: '/logos/reelyactive.png',
  	   url: 'https://www.hyperlocalcontext.com/contextat/directory/notman',
  	   text: value => `Occupants detected via Bluetooth: ${value}`,
  	   textLocalised: {
  	      en: value => `Occupants detected via Bluetooth: ${value}`,
  	      fr: value => `Occupants détectés via Bluetooth: ${value}`
  	   },
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
            }
            return deviceCount;
  	   }
  	   }];

       this.localised = {
           'en': {
              'dataprovided': 'Data provided by',
              'lastupdate':  (time,date) => `Last updated at: ${time} on ${date}`,
              'timeformat': 'HH:mm',
              'dateformat': 'DD MMMM YYYY'
           },
           'fr': {
              'dataprovided': 'Données fournies par',
              'lastupdate': (time,date) => `Derniere mis-a-jour: ${time}, le ${date}`,
              'timeformat': 'HH:mm',
              'dateformat': 'DD MMMM YYYY'
           }
       };

       this.setDeviceData();
  }


  componentDidMount() {
         window.setInterval(function () {
          this.setDeviceData();
        }.bind(this), (this.refreshIntervalMinutes * 60 * 1000));
  }


  render() {

    var lastUpdated = '';
    var lang = 'en';
    var displayText = 'no device data';


    if (this.state && this.state.lastUpdated) {
        var time = Moment(this.state.lastUpdated).locale(lang).format('HH:mm');
        var date = Moment(this.state.lastUpdated).locale(lang).format('DD MMMM YYYY');

        lastUpdated = this.localise('lastupdate',lang, [time, date]);
    }

    if (!this.state) {
        return  <div className="DeviceCard Card"><div></div></div>;
    }

    displayText = this.state.device.text;

    if (this.state.device.textLocalised && this.state.device.textLocalised[lang]) {
        displayText = this.state.device.textLocalised[lang];
    }

    if (typeof displayText === 'function') {
        displayText = displayText(this.state.device.value(this.state.data));
    }

    return  <div className="DeviceCard Card">
                <div>
                    <img className="DeviceCard--icon" src="/house-emojis/hackthehouse-smiling.gif"/>
                    {displayText}

                    <div className="deviceVendor">
                        {this.localise('dataprovided',lang)} <img className="vendorLogo" src={this.state.device.logo} />
                        <div className="lastUpdated">{lastUpdated}</div>
                    </div>
                </div>
            </div>;
  }

}