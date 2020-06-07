import React from "react";
import SandwichIngredient from "./SandwichIngredient/SandwichIngredient";
import styles from "./Sandwich.module.css";
import { withRouter } from "react-router-dom";

const Sandwich = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <SandwichIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    });
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some Ingredients!</p>;
  }
  return (
    <div className={styles.Sandwich}>
      <SandwichIngredient type="bread-top" />
      {transformedIngredients}
      <SandwichIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Sandwich);
