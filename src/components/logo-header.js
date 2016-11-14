import React from 'react';
import CurrentTime from './current-time';

export default function LogoHeader() {
    return <div className="LogoHeader">
    <img src="images/notman-logo.svg" alt="Maison Notman / House House"/>
    <CurrentTime/>
  </div>;
}
