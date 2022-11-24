import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

/*
TODO:
[-] toggle shopping cart on the page clicking My Cart button
[-] add item to the cart clicking Add to Cart button on product card
[-] if item is a part of a cart just increase the quantity
[-] (optional) add more prosucts
[-] inrease/decrease quantity by +/- buttons on the cart
[-] if the quantity is 1 and clicking - button remove the product at all
*/

function App() {
  const showCart = useSelector(state => state.cart.showCart);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
