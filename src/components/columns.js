import React from 'react';

export default function Columns({children}) {
  children = React.Children.toArray(children);

  if (children.length > 4) {
    throw new Error(`Received ${children.length} child elements in Columns component. Maximum is 4.`);
  }

  const style = {
    width: (100 / children.length) + '%',
  };

  let columnElements = children.map((child, i) => {
    // let s = Object.assign({}, style);
    return <div className="Columns-column" style={style} key={i}>{child}</div>
  });

  return <div className="Columns u-cf">
        {columnElements}
    </div>;
}
