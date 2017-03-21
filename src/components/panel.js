import React from 'react';
import classNames from 'classnames';

export default function Panel({id, className, children}) {

    return (
      <div className={classNames('Panel', className)} id={id}>
        {children}
      </div>
    );
}
