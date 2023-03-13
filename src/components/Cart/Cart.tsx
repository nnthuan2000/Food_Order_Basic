import React, { useContext } from "react";

import CartContext from "../../store/cartContext";
import CartItem from "./CartItem";

import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";
import { ICartItem } from "../../models/Cart";

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const { items, totalPrice, addItem, removeItem } = useContext(CartContext);

  const hasItem = items.length > 0;
  const totalPriceFormated = `$${totalPrice.toFixed(2)}`;

  const addItemToCartHandler = (item: ICartItem) => {
    addItem({
      ...item,
      amount: 1,
    });
  };

  const removeItemFromCartHandler = (id: string, isRemoveAll: boolean) => {
    removeItem(id, isRemoveAll);
  };

  const removeAllItemFromCartHandler = (id: string, isRemoveAll: boolean) => {
    removeItem(id, isRemoveAll);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={addItemToCartHandler.bind(null, item)}
          onRemove={removeItemFromCartHandler.bind(null, item.id, false)}
          onRemoveAll={removeAllItemFromCartHandler.bind(null, item.id, true)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalPriceFormated}</span>
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
