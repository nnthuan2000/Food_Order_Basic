import React, { useContext } from "react";

import CartContext from "../../store/cartContext";
import CartItem from "./CartItem";

import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const { items, totalAmount } = useContext(CartContext);

  const hasItem = items.length > 0;
  const totalAmountFormated = `$${totalAmount.toFixed(2)}`;

  const cartItems = (
    <ul>
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmountFormated}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
