import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };
  /*toggleSideDrawerHandler = () => {
    const oldSideDrawer = this.state.showSideDrawer;
    this.setState({
      showSideDrawer: !oldSideDrawer
    });
  };
  when use state in a setState in asynchronous behaviour it will not behave properly, so its better recieve prevState
  */
  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <>
        <Toolbar clicked={this.toggleSideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
