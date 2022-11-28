import { fetchProducts } from '../repositories/productsRepository';
import { productsActions } from './products';
import { uiActions } from './ui';

export const fetchProductsApiCall = () => {
  return async (dispatch) => {
    try {
      const products = await fetchProducts();

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
