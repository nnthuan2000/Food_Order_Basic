import React, { useState } from "react";

import CartProvider from "./store/CartProvider";
import Header from "./components/Layouts/Header";
import Cart from "./components/Cart/Cart";

function App() {
  const [isShowingCart, setIsShowingCart] = useState<boolean>(false);

  const showCartHandler = () => setIsShowingCart(true);
  const hideCartHandler = () => setIsShowingCart(false);

  return (
    <CartProvider>
      {isShowingCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
    </CartProvider>
  );
}

export default App;
