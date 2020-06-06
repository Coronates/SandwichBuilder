import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

class Layout extends Component {
  //Layout is a conttainer but also can be a HOC
  state = {
    showSideDrawer: false,
  };
  sideDrawerCloseHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };
  /*
  when use state in a setState in asynchronous behaviour it will not behave properly, so its better recieve prevState
  */
  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuth={this.props.isAuth}
          clicked={this.toggleSideDrawerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.authe.idToken !== null,
  };
};

export default connect(mapStateToProps)(Layout);
