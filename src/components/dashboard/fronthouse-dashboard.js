import React from 'react';

import LogoHeader from '../logo-header';
import SponsorsPanel from '../sponsors-panel';
import TwitterCard from '../twitter-card';

export default function render({lang='en'}) {
    return (
        <div lang={lang}>
            <LogoHeader/>
            <SponsorsPanel lang={lang}/>
            <TwitterCard height="500"/>
        </div>
    );
}

