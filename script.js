// const { fetchProducts } = require("./helpers/fetchProducts");
// const { fetchItem } = require("./helpers/fetchItem");

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

let totalPrice = 0;
const cartItemClickListener = () => {
  // const li = document.querySelector('.cart__item');
  // li.remove();
};
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  const priceInner = document.querySelector('.total-price');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', () => {
    const lis = document.querySelector('.cart__item');
    const subtrair = Number(lis.innerHTML.split('$')[1]);
    lis.remove();
    totalPrice -= subtrair;
    priceInner.innerText = Math.abs(totalPrice.toFixed(2));
  });
  totalPrice += salePrice; 
  priceInner.innerText = Math.abs(totalPrice.toFixed(2));
  return li;
};

const createElementSection = async (item) => {
  const items = document.querySelector('.items');
  const data = await fetchProducts(item);
  data.results.forEach(({ id, title, thumbnail }) => {
    const object = { sku: id, name: title, image: thumbnail };
    const product = createProductItemElement(object);
    items.appendChild(product);
  });
};

const cartElementCreate = async ({ target }) => {
  const cart = document.querySelector('.cart__items');
  const firstParent = target.parentElement;
  const childParent = firstParent.firstChild.innerText; 
  const { id, title, price } = await fetchItem(childParent);
  const object = { sku: id, name: title, salePrice: price };
  const product = createCartItemElement(object);
  cart.appendChild(product);
};
const buttonClear = () => {
  const priceInner = document.querySelector('.total-price');
  const button = document.querySelector('.empty-cart');
  const ol = document.querySelector('.cart__items');
  button.addEventListener('click', () => {
    totalPrice = 0;
    priceInner.innerText = totalPrice.toFixed(2);
    while (ol.firstChild) {
     ol.removeChild(ol.firstChild);
    }
  });
};
buttonClear();
const adcItens = () => {
  const cartItems = document.querySelector('.items');
  cartItems.addEventListener('click', (e) => {
    if (e.target.className === 'item__add') {
      cartElementCreate(e);
    }
  });
};

window.onload = () => { 
  createElementSection('computador');
  cartElementCreate();
  adcItens();
};

// const round = (num, places) => {
// if (!(` ${num}`).includes('e')) {
// return +(Math.round(num + "e+" + places)  + "e-" + places);
// } else {
// const arr = (` ${num}`).split('e');
// let sig = '';
// if (+arr[1] + places > 0) {
// sig = '+';
// };
//  return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places);
// };
// };

// console.log(round(10.51824, 2));

// console.log(round(1.005, 2)); // 1.01
