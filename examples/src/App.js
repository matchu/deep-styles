import React, { Component } from 'react';
import Style from 'deep-styles';

const styles = Style.sheet({
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
        const volatileMargin = Style.runtime("volatile-margin", {
            marginTop: this.state.marginTop,
        });

        return <div {...Style.apply(
            styles.greeting, styles.greetingOverride, volatileMargin,
        )}>
            Hello, world!
        </div>;
    }
}

export default App;
