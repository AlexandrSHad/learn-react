import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartDataApiCall, storeCartDataApiCall } from './store/cart-actions';
import { fetchProductsApiCall } from './store/products-actions';

let isInitialization = true;

function App() {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchProductsApiCall());
    dispatch(fetchCartDataApiCall());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialization) {
      isInitialization = false;
      return;
    }

    if (cartData.changed) {
      dispatch(storeCartDataApiCall({ items: cartData.items }));
    }
  }, [cartData, dispatch]);

  return (
    <>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />}
      <Layout>
        {cartData.showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
