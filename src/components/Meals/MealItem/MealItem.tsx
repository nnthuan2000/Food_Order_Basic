import React, { useContext, useCallback } from "react";

import CartContext from "../../../store/cartContext";
import MealItemForm from "./MealItemForm";

import { IMeal } from "../../../models/Meal";

import classes from "./MealItem.module.css";

const MealItem = ({ id, name, description, price }: IMeal) => {
  const { addItem } = useContext(CartContext);

  const priceFormated = `$${price.toFixed(2)}`;

  const addToCartHandler = useCallback(
    (id: string, amount: number) => {
      addItem({
        id: id,
        name: name,
        amount: amount,
        price: price,
      });
    },
    [addItem, name, price]
  );

  return (
    <li className={classes.meal}>
      <div className="">
        <h3>{name}</h3>
        <div className={classes.description}>description</div>
        <div className={classes.price}>{priceFormated}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddMealToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default React.memo(MealItem);
