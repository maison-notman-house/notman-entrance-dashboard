import React from 'react';

export default function () {
    var url='https://www.youtube.com/embed/wa7uUX0l5ng?autoplay=1&loop=1';
    var width='560';
    var height='315';
    return <div className="VideoPanel">
              <iframe width={width} height={height} src={url} frameborder="0"></iframe>
           </div>;

}
