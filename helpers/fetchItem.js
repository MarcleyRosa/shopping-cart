// const fetch = require('node-fetch');

const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
