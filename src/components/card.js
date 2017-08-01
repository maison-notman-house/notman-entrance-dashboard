import React from 'react';
import './card.css';

export default React.createClass({

    render() {
        const {className=''} = this.props;
        const style = {
            height: (this.props.size || 1) * 120
        };

        return (
            <div className={"Card " + className} style={style}>
                {this.props.children}
            </div>
        );
    }
});
