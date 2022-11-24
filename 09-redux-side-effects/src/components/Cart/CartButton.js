import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';
import { cartActions } from '../../store/cart';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const itemCount = useSelector(state => state.cart.items.length);

  const clickHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default CartButton;
