import React, {Component, Children} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const INTERVAL = 3500;

export default class ComponentRotater extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayIndex: 1,
            allChildren: props.children
        };
    }

    rotate () {
        console.log('reotate');
        const {children} = this.props;
        var displayIndex = this.state.displayIndex;
        displayIndex++;
        if (displayIndex >= children.length) {
            displayIndex = 0;
        }
        if (displayIndex !== this.state.displayIndex) {
            this.setState({
                displayIndex: displayIndex
            });
        }
    }

    componentDidMount() {
        const interval = this.props.interval || INTERVAL;
        this.intervalTimer = setInterval(this.rotate.bind(this), interval);
    }

    componentWillUnmount() {
        clearInterval(this.intervalTimer);
    }

    render () {
        const {children, interval} = this.props;
        const {displayIndex} = this.state;
        console.log('zzzzzzz');

        console.log('xxx', children);
        const childrenWithProps = Children.map([children[displayIndex]], (child, idx) => {
            return <div>{React.cloneElement(child, { key: idx})}</div>;
        });

        return (
            <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>   
                {childrenWithProps}
            </ReactCSSTransitionGroup>  
        );
    }
}

