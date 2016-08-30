import React from 'react';
import CurrentTime from './current-time';

export default function LogoHeader() {
  return <div className="LogoHeader">
    <img src="images/notman-logo.svg"/>
    <CurrentTime/>
  </div>;
}
