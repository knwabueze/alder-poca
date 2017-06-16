import React, { Component } from 'react'

export default function lazyLoad(importComponent) {

    class AsyncComponent extends Component {
        constructor(props) {
            super(props);

            this.state = {
                component: null
            }
        }

        async componentWillMount() {
            const { default: component } = await importComponent();

            this.setState({
                component
            })
        }

        render() {
            const { component: C } = this.state;
            const { ...props } = this.props;
            
            return !!C ? <C {...props} /> : null;
        }
    }

    return AsyncComponent;
}