import React from 'react';

import LogoHeader from '../logo-header';
import DeviceCard from '../device-card';
import DirectoryCard from '../directory-component';
import Columns from '../columns';
import TwitterCard from '../twitter-card';

export default function render({location, floor, building, lang='en'}) {
    return (
        <div lang={lang}>

            <LogoHeader/>

            <Columns>
                <div className="screenLeft">
                    <DirectoryCard
                        lang={lang}
                        location={location}
                        floor={floor}
                        building={building}/>
                </div>
                <div className="screenRight">
                    <DeviceCard lang={lang}/>
                    <TwitterCard height="500"/>
                </div>
            </Columns>
        </div>
    );
}

