import React from "react"

const CartContext = React.createContext({
  isCartShown: false,
  showCart: () => {},
  hideCart: () => {}
});

export default CartContext;