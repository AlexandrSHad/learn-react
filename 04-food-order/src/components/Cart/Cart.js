import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';

const Cart = () => {
  const cartCtx = useContext(CartContext);

  const cartItems = <ul className={classes['cart-items']}>{[{ id: 'c1', name: 'Sushi', amount: 2, price: 16.34}].map(item =>
    <li>{item.name}</li>
  )}</ul>

  return (
    <Modal isShown={cartCtx.isCartShown} onClose={cartCtx.hideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={cartCtx.hideCart}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;