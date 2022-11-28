import { productsActions } from './products';
import { uiActions } from './ui';

export const fetchProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/products.json');
  
      if (!response.ok) {
        throw Error('Products fetching failed.');
      }

      const data = await response.json();

      return data;
    };

    try {
      const products = await fetchData();
      console.log(products);

      dispatch(productsActions.setProducts(products || []));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed'
      }));
    }
  }
};