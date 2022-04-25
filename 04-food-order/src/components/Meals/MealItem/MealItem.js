import { useContext } from 'react';

import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';

import classes from './MealItem.module.css';

const MealItem = props => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;
  
  const addToCartHandler = (enteredAmount) => {
    const item = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: enteredAmount
    };

    cartCtx.addItem(item);
  };

  return (
    <li className={classes.meal}>
      <div>
        <div>{props.name}</div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;