import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, storeCartData } from './store/cart-actions';

let isInitialization = true;

function App() {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialization) {
      isInitialization = false;
      return;
    }

    if (cartData.changed) {
      dispatch(storeCartData({ items: cartData.items }));
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
