import React, { useContext, useState } from "react";

import { ICartItem } from "../../models/Cart";
import CartContext from "../../store/cartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import Modal from "../UI/Modal/Modal";

import classes from "./Cart.module.css";

interface CartProps {
  onClose: () => void;
}

const Cart = ({ onClose }: CartProps) => {
  const { items, totalPrice, addItem, removeItem } = useContext(CartContext);
  const [isOrder, setIsOrder] = useState<boolean>(false);

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
    setIsOrder(true);
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
      {modalAction}
    </React.Fragment>
  );

  return (
    <Modal onClose={onClose}>
      {cartModalContent}
      {isOrder && hasItem && <Checkout onCancel={onClose} />}
    </Modal>
  );
};

export default Cart;
