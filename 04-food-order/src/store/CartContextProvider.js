import { useState } from "react";

import CartContext from "./cart-context";

const CartContextProvider = props => {
  const [isCartShown, setIsCartShown] = useState(false);

  const context = {
    isCartShown,
    showCart: () => setIsCartShown(true),
    hideCart: () => setIsCartShown(false)
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;