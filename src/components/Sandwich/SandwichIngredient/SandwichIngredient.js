import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./SandwichIngredient.module.css";

class SandwichIngredient extends Component {
  render() {
    let ingredient = null;
    switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={styles.BreadBottom}></div>;
        break;
      case "bread-top":
        ingredient = (
          <div className={styles.BreadTop}>
          </div>
        );
        break;
      case "jam":
        ingredient = <div className={styles.Jam}></div>;
        break;
      case "cheese":
        ingredient = <div className={styles.Cheese}></div>;
        break;
      case "tomato":
        ingredient = <div className={styles.Tomato}></div>;
        break;
      case "salad":
        ingredient = <div className={styles.Salad}></div>;
        break;
      default:
        ingredient = null;
        break;
    }
    return ingredient;
  }
}
SandwichIngredient.propTypes={
    type: PropTypes.string.isRequired,
}

export default SandwichIngredient;
