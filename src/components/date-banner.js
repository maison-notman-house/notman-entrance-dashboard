import React from 'react';
import moment from 'moment';
import capitalize from 'capitalize';

import Banner from './banner';



export default function DateBanner({lang}) {
  const date = moment();
  
  // Why capitalize? Because in french, the weekday is lowercase by default.
  const dateString = capitalize(date.locale(lang).format('dddd, DD MMMM'));
  return <Banner>
  	  <div><img src="../images/notman-logo.svg"/></div> 

      <div style={{textAlign: 'center', fontSize: '60px', lineHeight: '60px'}}>
        {dateString}
      </div>
  </Banner>
}