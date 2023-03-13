import React from "react";

import { ICartContext } from "../models/ICart";

const CartContext = React.createContext<ICartContext>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
