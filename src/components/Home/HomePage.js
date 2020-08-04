import React from "react";
import "./home.css";

export default class HomePage extends React.Component {
  state = {
    fontColor: {
      color: "#000000",
    },
  };

  componentDidMount() {
    this.setState({
      fontColor: {
        ...this.state.fontColor,
        color: "#FFFFFF",
      },
    });
  }

  render() {
    return (
      <div className="home__background__container">
        <h1 className={this.state.fontColor.color}>Flat 101</h1>
        <h2 className={this.state.fontColor.color}>React.js</h2>
      </div>
    );
  }
}
