import React from 'react';
import CurrentTime from './current-time';

export default function LogoHeader({screenId}) {
    const imageUrl = `https://screens.notman.org/locations/${screenId}/notman-logo.svg`;
    return <div className="LogoHeader">
    <img src={imageUrl} alt="Maison Notman / House House"/>
    <CurrentTime/>
  </div>;
}
