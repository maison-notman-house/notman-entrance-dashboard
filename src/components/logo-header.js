import React from 'react';
import CurrentTime from './current-time';

export default function LogoHeader({mode}) {
    mode = mode? '-' + mode : '';
    return <div className="LogoHeader">
    <img src={'images/notman-logo' + mode + '.svg'} alt="Maison Notman / House House"/>
    <CurrentTime/>
  </div>;
}
