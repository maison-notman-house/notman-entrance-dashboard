import React from 'react';

export default function () {
    var url='/videos/background-video.mp4';

    return <video width="1920" height="1080" className="backgroundvideo" autoPlay="autoplay" loop="loop">
         <source src={url} type="video/mp4" />
         Your browser does not support the video tag.
       </video>;

}
