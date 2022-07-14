// const fetch = require('node-fetch');

const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
try {
  const response = await fetch(url);
  const json = await response.json();
  return json;
} catch (error) {
 return error;
}
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}