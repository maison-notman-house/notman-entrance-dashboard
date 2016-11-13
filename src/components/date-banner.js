import React from 'react';
import moment from 'moment';
import capitalize from 'capitalize';

import Banner from './banner';



export default function DateBanner({lang}) {
  const date = moment();
  
  // Why capitalize? Because in french, the weekday is lowercase by default.
  const dateString = capitalize(date.locale(lang).format('dddd, DD MMMM'));
  const time = capitalize(date.locale(lang).format(' HH:mm'));
  return <Banner>
  	 <div>
  	 	<img src="../images/notman-logo.svg"/>
  	 </div>
     <div>
      	{time} 
     </div>
     <div style={{textAlign: 'right', fontSize: '40px', lineHeight: '60px'}}>
        {dateString}
     </div>

  </Banner>
}