import React, { Component } from 'react';
import {StyleSheet, css, rule} from 'deep-styles';

const styles = StyleSheet.create({
    greeting: {
        color: "red", // will be overridden by greetingOverride
        marginLeft: 10,
        marginTop: 10, // will be overridden by volatileMargin
    },
    greetingOverride: {
        color: "blue",
    },
});

class App extends Component {
    state = {marginTop: 0}

    componentDidMount() {
        this._interval = setInterval(() => {
            this.setState(({marginTop}) => ({marginTop: marginTop + 1}));
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const volatileMargin = rule("volatile-margin", {
            marginTop: this.state.marginTop,
        });

        return <div {...css(
            styles.greeting, styles.greetingOverride, volatileMargin,
        )}>
            Hello, world!
        </div>;
    }
}

export default App;
