import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
  const [isBtnHighligthed, setIsBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    
    setIsBtnHighlighted(true);

    const timer = setTimeout(() => setIsBtnHighlighted(false), 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const btnClasses = `${classes.button} ${isBtnHighligthed ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={cartCtx.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCtx.totalItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;