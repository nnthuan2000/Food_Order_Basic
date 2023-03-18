import React, { useContext, useState } from "react";

import { ICartItem } from "../../models/Cart";
import CartContext from "../../store/cartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";
import { IUser } from "../../models/User";

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const { items, totalPrice, addItem, removeItem, clearAllItems } = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const hasItem = items.length > 0;
  const totalPriceFormated = `$${Math.abs(totalPrice).toFixed(2)}`;

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

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const confirmHandler = async (user: IUser) => {
    setIsSubmitting(true);
    await fetch("https://react-http-e9233-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", {
      method: "POST",
      body: JSON.stringify({
        orderItems: items,
        user,
      }),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    clearAllItems();
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

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={onClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalPriceFormated}</span>
      </div>

      {isCheckout && hasItem && <Checkout onCancel={onClose} onConfirm={confirmHandler} />}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  const submittedModalContent = (
    <React.Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && <p>Sending orders...</p>}
      {!isSubmitting && isSubmitted && submittedModalContent}
    </Modal>
  );
};

export default Cart;
