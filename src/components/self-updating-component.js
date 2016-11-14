import React from 'react';

export default class SelfUpdatingComponent extends React.Component {

    update() {

    }

    render() {
        return <div></div>;
    }

    componentDidMount() {
        this.refreshTimer = setInterval(() => this.update());
    }

    componentDidUnmount() {
        clearInterval(this.refreshTimer);
    }

}
