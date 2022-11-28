export const fetchCartData = async () => {
  const response = await fetch(
    'https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

  if (!response.ok) {
    throw Error('Fetching cart data failed!');
  }

  const data = await response.json();

  return data;
};

export const updateCartData = async (cartData) => {
  const response = await fetch(
    'https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
    {
      method: 'PUT',
      body: JSON.stringify(cartData)
    });

  if (!response.ok) {
    throw Error('Updating cart data failed!');
  }
}
