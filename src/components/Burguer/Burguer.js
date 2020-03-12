import React from "react";
import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";
import styles from "./Burguer.module.css";

const Burguer = props => {
  //ingredients are not an array, are an object, so map function cant help with dynamic props
  /*let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      //tranform string value into an array wich contains the value number of components, use spread and array function
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurguerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);*/

    let transformedIngredients = Object.keys(props.ingredients).map(igKey=>{
      return [...Array(props.ingredients[igKey])].map((_,index)=>{
        return <BurguerIngredient key={igKey+index} type={igKey}/>
      });
    }).reduce((arr, el)=>{
      return arr.concat(el);
    })

  //console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some Ingredients!</p>;
  }
  return (
    <div className={styles.Burguer}>
      <BurguerIngredient type="bread-top" />
      {transformedIngredients}
      <BurguerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burguer;
