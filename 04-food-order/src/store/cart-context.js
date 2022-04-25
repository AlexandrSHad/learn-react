import React from "react"

const CartContext = React.createContext({
  isCartShown: false,
  showCart: () => {},
  hideCart: () => {},
  items: [],
  totalAmount: 0,
  totalItemsNumber: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});

export default CartContext;