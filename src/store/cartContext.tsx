import React from "react";

import { ICartContext } from "../models/Cart";

const CartContext = React.createContext<ICartContext>({
  items: [],
  totalAmount: 0,
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id, isRemoveAll) => {},
  clearAllItems: () => {},
});

export default CartContext;
