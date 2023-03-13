import React, { useReducer } from "react";

import { ICartItem, ICarts, ICartContext } from "../models/ICart";

import CartContext from "./cartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

type Action = { type: "ADD"; payload: ICartItem } | { type: "REMOVE"; payload: string };

type Reducer<T, U> = (state: T, action: U) => T;

const cartStateDefault: ICarts = {
  items: [],
  totalAmount: 0,
};

const cartReducer: Reducer<ICarts, Action> = (state, action) => {
  if (action.type === "ADD") {
    const itemsCopy = [...state.items];
    const existingCartItemIndex = itemsCopy.findIndex((item) => item.id === action.payload.id);
    if (existingCartItemIndex !== -1) {
      const existingCartItem = itemsCopy[existingCartItemIndex];
      itemsCopy[existingCartItemIndex] = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
    } else {
      itemsCopy.push(action.payload);
    }

    const updatedTotalAmount = state.totalAmount + action.payload.amount * action.payload.price;

    return {
      items: itemsCopy,
      totalAmount: updatedTotalAmount,
    };
  } else {
  }
  return cartStateDefault;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, cartStateDefault);

  const addItemToCartHandler = (item: ICartItem) => {
    dispatchCartAction({ type: "ADD", payload: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", payload: id });
  };

  const cartContext: ICartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
