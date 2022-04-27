import { useReducer, useState } from "react";

import CartContext from "./cart-context";

const cartDataDefaultState = {
  items: [],
  totalAmount: 0,
  totalItemsNumber: 0
};

const cartDataActionTypes = {
  UPSERT_CART_ITEM: 'UPSERT_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM'
};

const cartDataRaducer = (state, action) => {
  const calcTotalAmount = (items) => items.reduce((total, item) => total + item.amount * item.price, 0);
  const calcTotalItemsNumber = (items) => items.reduce((total, item) => total + item.amount, 0);

  if (action.type === cartDataActionTypes.UPSERT_CART_ITEM) {
    let updatedItems;

    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingItemIndex];

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }
    
    return {
      items: updatedItems,
      totalAmount: calcTotalAmount(updatedItems),
      totalItemsNumber: calcTotalItemsNumber(updatedItems)
    };
  }

  if (action.type === cartDataActionTypes.REMOVE_CART_ITEM) {
    let updatedItems;

    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    const existingItem = state.items[existingItemIndex];

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1
      }
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

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
    addItem: (item) => { dispatchCartDataAction({ type: cartDataActionTypes.UPSERT_CART_ITEM, item }) },
    removeItem: (id) => { dispatchCartDataAction({ type: cartDataActionTypes.REMOVE_CART_ITEM, id }) }
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;