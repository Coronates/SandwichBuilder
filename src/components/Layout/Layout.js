import React from "react";
import styles from './Layout.module.css'

const Layout = props => {
  return (
    <>
      <div>Toolbar, sideDrawer, backdrop</div>
      <main className={styles.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
