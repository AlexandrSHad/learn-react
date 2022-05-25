import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const addCartItemHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const removeCartItemHandler = id => {
    cartCtx.removeItem(id);
  }

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map(item => <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={addCartItemHandler.bind(null, item)}
      onRemove={removeCartItemHandler.bind(null, item.id)}
    />)}
  </ul>

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={cartCtx.hideCart}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={checkoutHandler}>
      Order
    </button>}
  </div>;

  if (!cartCtx.isCartShown) {
    return null;
  }

  return (
    <Modal onClose={cartCtx.hideCart}>
      {hasItems && cartItems}
      {!hasItems && <p className={classes.placeholder}>The cart is empty.</p>}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={cartCtx.hideCart} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;