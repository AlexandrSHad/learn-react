import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const cartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map(item => <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
    />)}
  </ul>

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  return (
    <Modal isShown={cartCtx.isCartShown} onClose={cartCtx.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={cartCtx.hideCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;