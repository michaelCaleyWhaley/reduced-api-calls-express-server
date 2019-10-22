import React, { Component } from "react";
import Head from "./CustomHead";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <Head />
        {children}
      </>
    );
  }
}

export default Layout;
