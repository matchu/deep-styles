// @flow
import React, {Component} from "react";
import {StyleSheet, CSS} from "deep-styles-css";

import Greeting from "./Greeting.js";

class App extends Component {
    state = {mouseX: -999, mouseY: -999}

    componentDidMount() {
        window.addEventListener("mousemove", this._handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove", this._handleMouseMove);
    }

    _handleMouseMove = (e: MouseEvent) => {
        this.setState({mouseX: e.clientX, mouseY: e.clientY});
    }

    render() {
        const {mouseX, mouseY} = this.state;

        return <div {...CSS.apply(styles.container)}>

            {/* Look, it behaves just like normal `style`! */}
            <Greeting
                style={{
                    left: mouseX + 10,
                    top: mouseY + 10,
                }}
            />

            {/* It also accepts style classes! */}
            <Greeting
                style={styles.bigGreeting}
            />

            {/* You can compose classes! */}
            <Greeting
                style={[styles.bigGreeting, styles.blueGreeting]}
            />

            {/* You can even compose classes with computed `style`s! */}
            <Greeting
                style={[styles.smallGreeting, {
                    left: mouseX + 10,
                    top: mouseY - 10,
                }]}
            />

        </div>;
    }
}

const styles = StyleSheet.create({
    container: {
        background: "#eee",
        minWidth: "100%",
        minHeight: "100%",
        position: "absolute",
    },

    bigGreeting: {
        color: "black",
        fontSize: 30,
    },

    blueGreeting: {
        color: "blue",
        top: "50%",
    },

    smallGreeting: {
        fontSize: 12,
    },
});

export default App;
