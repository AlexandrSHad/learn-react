import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from './ProductItem';
import { productsActions } from '../../store/products';
import classes from './Products.module.css';

const dummyProducts = [
  {
    id: 1,
    title: 'Test product',
    description: 'This is a first product - amazing!',
    price: 6.00
  },
  {
    id: 2,
    title: 'Another product',
    description: 'This is another very cool product!',
    price: 15.00
  },
  {
    id: 3,
    title: 'Expensive product',
    description: 'The most expensive product!',
    price: 5999.00
  }
];

const Products = (props) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(productsActions.setProducts(dummyProducts));
  }, [dispatch]);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
      {products.map(product =>
        <ProductItem key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
      )}
      </ul>
    </section>
  );
};

export default Products;
