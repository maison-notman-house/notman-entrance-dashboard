import React from 'react';

export default function Banner({children, size=1, className=''}) {
    const style = {
        height: 120 * size
    }; 
 
    return <div className={"Banner " + className} style={style}>
    {children}
  </div>;
}
