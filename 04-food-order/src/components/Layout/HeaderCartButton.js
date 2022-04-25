import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
  const cartCtx = useContext(CartContext);

  return (
    <button className={classes.button} onClick={cartCtx.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCtx.totalItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;