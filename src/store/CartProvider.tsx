import React, { useReducer } from "react";

import { ICartItem, ICarts, ICartContext } from "../models/Cart";

import CartContext from "./cartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

type Action = { type: "ADD"; payload: ICartItem } | { type: "REMOVE"; payload: string; isRemoveAll: boolean };

type Reducer<T, U> = (state: T, action: U) => T;

const cartStateDefault: ICarts = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartReducer: Reducer<ICarts, Action> = (state, action) => {
  const itemsCopy = [...state.items];
  if (action.type === "ADD") {
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

    const updatedTotalAmount = state.totalAmount + action.payload.amount;
    const updatedTotalPrice = state.totalPrice + action.payload.amount * action.payload.price;

    return {
      items: itemsCopy,
      totalAmount: updatedTotalAmount,
      totalPrice: updatedTotalPrice,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = itemsCopy.findIndex((item) => item.id === action.payload);
    const existingCartItem = itemsCopy[existingCartItemIndex];
    if (action.isRemoveAll) {
      const updatedTotalAmount = state.totalAmount - existingCartItem!.amount;
      const updatedTotalPrice = state.totalPrice - existingCartItem!.amount * existingCartItem!.price;
      const updatedItems = itemsCopy.splice(existingCartItemIndex, 1);
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        totalPrice: updatedTotalPrice,
      };
    } else {
      const updatedTotalAmount = state.totalAmount - 1;
      const updatedTotalPrice = state.totalPrice - existingCartItem.price;
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = itemsCopy.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
        itemsCopy[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems || itemsCopy,
        totalAmount: updatedTotalAmount,
        totalPrice: updatedTotalPrice,
      };
    }
  }
  return cartStateDefault;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, cartStateDefault);

  const addItemToCartHandler = (item: ICartItem) => {
    console.log("add");
    dispatchCartAction({ type: "ADD", payload: item });
  };

  const removeItemFromCartHandler = (id: string, isRemoveAll: boolean = false) => {
    console.log("remove");
    dispatchCartAction({ type: "REMOVE", payload: id, isRemoveAll: isRemoveAll });
  };

  const cartContext: ICartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
