import React from 'react';
import CurrentTime from './current-time';

export default function LogoHeader() {
  return <div className="LogoHeader">
    <img src="/notman-logo.svg"/>
    <CurrentTime/>
  </div>;
}
