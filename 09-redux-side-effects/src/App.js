import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { storeCartData } from './store/cart';

let isInitialization = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.cart.showCart);
  const cartItems = useSelector(state => state.cart.items);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    if (isInitialization) {
      isInitialization = false;
      return;
    }

    dispatch(storeCartData({ items: cartItems }));
  }, [cartItems, dispatch]);

  return (
    <>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
