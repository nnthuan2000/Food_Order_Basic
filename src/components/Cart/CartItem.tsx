import { ICartItem } from "../../models/Cart";

import classes from "./CartItem.module.css";

interface CartItemProps extends ICartItem {
  onAdd: () => void;
  onRemove: () => void;
}

const CartItem = ({ name, price, amount, onAdd, onRemove }: CartItemProps) => {
  const priceFormated = `$${price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{priceFormated}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
