import React from 'react';

export default function () {
    var url='https://www.youtube.com/embed/videoseries?list=PLB_zXfvmsSV3GcUfZSIOL0wcCoQgBy_0w';
    // Enhance the URL with the appropriate parameters. See:
    //   https://developers.google.com/youtube/player_parameters
    url += '&autoplay=1&loop=1&cc_load_policy=1&controls=0&iv_load_policy=3';
    var width='660';
    var height='375';
    return <div className="VideoPanel">
              <iframe width={width} height={height} src={url} frameborder="0"></iframe>
           </div>;

}
