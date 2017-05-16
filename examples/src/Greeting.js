import React, { Component } from 'react';
import StyleSheet from 'deep-styles';

const styles = StyleSheet.create({
    greeting: {
        color: "red",
        fontSize: 24,

        position: "absolute",
        left: 0,
        top: 0,
    },
});

class Greeting extends Component {
    // And it was super easy for Greeting to implement: just Style.apply() the
    // incoming style prop, along with any other defaults you want to apply.
    // It returns a `className` prop for the stable styles, and a `style` prop
    // for the volatile styles.
    render() {
        return <div {...StyleSheet.apply(styles.greeting, this.props.style)}>
            Hello, world!
        </div>;
    }
}

export default Greeting;
