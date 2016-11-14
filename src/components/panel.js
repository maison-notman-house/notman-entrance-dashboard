import React from 'react';
import classNames from 'classnames';

export default function Panel({className, children}) {
    return (
      <div className={classNames('Panel', className)}>
        {children}
      </div>
    );
}
