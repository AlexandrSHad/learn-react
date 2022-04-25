import { useReducer, useState } from "react";

import CartContext from "./cart-context";

const cartDataDefaultState = {
  items: [],
  totalAmount: 0,
  totalItemsNumber: 0
};

const cartDataActionTypes = {
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM'
};

const cartDataRaducer = (state, action) => {
  const calcTotalAmount = (items) => items.reduce((total, item) => total + item.amount * item.price, 0);
  const calcTotalItemsNumber = (items) => items.reduce((total, item) => total + item.amount, 0);

  if (action.type === cartDataActionTypes.ADD_CART_ITEM) {
    const updatedItems = [...state.items, action.item];
    
    return {
      items: updatedItems,
      totalAmount: calcTotalAmount(updatedItems),
      totalItemsNumber: calcTotalItemsNumber(updatedItems)
    };
  }
  if (action.type === cartDataActionTypes.REMOVE_CART_ITEM) {
    const updatedItems = state.items.filter(item => item.id !== action.id);

    return {
      items: updatedItems,
      totalAmount: calcTotalAmount(updatedItems),
      totalItemsNumber: calcTotalItemsNumber(updatedItems)
    };
  }

  return cartDataDefaultState;
};

const CartContextProvider = props => {
  const [isCartShown, setIsCartShown] = useState(false);
  const [cartDataState, dispatchCartDataAction] = useReducer(cartDataRaducer, cartDataDefaultState);

  const context = {
    isCartShown,
    showCart: () => setIsCartShown(true),
    hideCart: () => setIsCartShown(false),
    items: cartDataState.items,
    totalAmount: cartDataState.totalAmount,
    totalItemsNumber: cartDataState.totalItemsNumber,
    addItem: (item) => { dispatchCartDataAction({ type: cartDataActionTypes.ADD_CART_ITEM, item }) },
    removeItem: (id) => { dispatchCartDataAction({ type: cartDataActionTypes.REMOVE_CART_ITEM, id }) }
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;