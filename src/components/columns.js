import React from 'react';

export default function Columns({children}) {
    // `children` is an opaque data structure, needs to be converted to an array.
    children = React.Children.toArray(children);

    if (children.length > 2) {
        throw new Error(`Received ${children.length} child elements in Columns component. Maximum is 2.`);
    }

    let columnElements = children.map(child => <div className="Columns-column" key={child.key}>{child}</div>);

    return <div className="clearfix">
        {columnElements}
    </div>;
}