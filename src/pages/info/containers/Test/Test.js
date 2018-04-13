import React from 'react';
class Test extends React.Component {
    componentWillMount() {
        console.log('Info componentWillMount');
    }
    componentDidMount() {
        console.log('Info componentDidMount');
    }

    render() {

        return <div className="ts">I am Info</div>
    }
}

export default Test;
