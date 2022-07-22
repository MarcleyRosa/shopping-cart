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

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

let totalPrice = 0;

const priceInner = document.querySelector('.total-price');
const cart = document.querySelector('.cart__items');

const cartAdcPrice = (salePrice) => {
  totalPrice += salePrice; 
  priceInner.innerText = Math.round(Math.abs(totalPrice) * 100) / 100;
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', async (e) => {
    const subtrair = Number(e.target.innerHTML.split('$')[1]);
    e.target.remove();
    saveCartItems(cart.innerHTML);
    totalPrice -= subtrair;
    priceInner.innerText = Math.round(Math.abs(totalPrice) * 100) / 100;
  });
  cartAdcPrice(salePrice);
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
  const firstParent = target.parentElement;
  const childParent = firstParent.firstChild.innerText; 
  const { id, title, price } = await fetchItem(childParent);
  const object = { sku: id, name: title, salePrice: price };
  const product = createCartItemElement(object);
  cart.appendChild(product);
};
const buttonClear = () => {
  const button = document.querySelector('.empty-cart');
  const ol = document.querySelector('.cart__items');
  button.addEventListener('click', () => {
    totalPrice = 0;
    saveCartItems(cart.innerHTML);
    priceInner.innerText = Math.round(Math.abs(totalPrice) * 100) / 100;
    while (ol.firstChild) {
     ol.removeChild(ol.firstChild);
    }
  });
};

const adcItens = () => {
  const cartItems = document.querySelector('.items');
  cartItems.addEventListener('click', async (e) => {
    if (e.target.className === 'item__add') {
      await cartElementCreate(e);
      console.log(cart.innerHTML);
      // console.log(typeof JSON.parse(cart.innerHTML));
      saveCartItems(cart.innerHTML);
    }
  });
};

const reloadCart = () => {
  const saveCart = getSavedCartItems();
  console.log(saveCart);
  cart.innerHTML = saveCart;
  cart.addEventListener('click', (e) => {
    e.target.remove(cart);
  });
};

buttonClear();

window.onload = async () => { 
  await createElementSection('computador');
  adcItens();
  const load = document.querySelector('.loading');
  load.remove();
  reloadCart();
};
