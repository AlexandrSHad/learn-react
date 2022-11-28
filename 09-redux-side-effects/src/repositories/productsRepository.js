export const fetchProducts = async () => {
  const response = await fetch(
    'https://http-hook-7dba9-default-rtdb.europe-west1.firebasedatabase.app/products.json');

  if (!response.ok) {
    throw Error('Products fetching failed.');
  }

  const data = await response.json();

  return data;
};
