import React from 'react';
import './card.css';

export default React.createClass({
  
  render() {
    const style = {
      height: (this.props.size || 1) * 120,
    };
    
    return (
      <div className={"Card " + this.props.className} style={style}>
        {this.props.children}
      </div>
    );
  }
});
