// Async awit  used to fetch data because its modern and easy to handle.
async function fetchData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const json = await response.json();
        data = json;
        Selection("men");
    } catch (error) {
        showError('Error Occurred');
    }
}

fetchData();

// using the spread operator [...] to convert the NodeList of switches into an array
const cardDisplay = document.getElementById('card-display');
const switchedData = [...document.querySelectorAll('.category')];

// iterates over each element in the switchedData array and attaches a click event listener t
switchedData.forEach((e) => {
    e.addEventListener('click', (e) => {
        Selection(e.target.id, data);
    });
});
// Function used to select type of persong ex- men women kid
function Selection(id){
    if(id == 'men'){
        markSelect(id)
        cardDisplay.innerHTML = ''
        data.categories[0].category_products.map((e)=>{
            createCard(e)
        })
    }else if(id == 'women'){
        markSelect(id)
        cardDisplay.innerHTML = ''
        data.categories[1].category_products.map((e)=>{
            createCard(e)
        })
    }else if(id == 'kids'){
        markSelect(id)
        cardDisplay.innerHTML = ''
        data.categories[2].category_products.map((e)=>{
            createCard(e)
        })
    }
}

function markSelect(id){
    switchedData.map((e)=>{
        e.classList.remove('selected')
    })
    document.getElementById(id).classList.add('selected')
}
//show error occured
function showError (msg) {
    cardDisplay.innerHTML = `<h2>${msg}</h2>`
}

// Function to create a card element for the given product
const createCard = (product,container=cardDisplay) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const badge = document.createElement('div');
    badge.classList.add('badge');
    badge.textContent = product.badge_text || ''; 
    const image = document.createElement('img');
    image.setAttribute('src', product.image);
    image.setAttribute('alt', product.title);
    product.badge_text && imageContainer.appendChild(badge);
    imageContainer.appendChild(image);
    const description = document.createElement('div');
    description.classList.add('description');
    const title = document.createElement('div');
    title.classList.add('title');
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = product.title;
    const brand = document.createElement('p');
    brand.classList.add('brand');
    brand.textContent = product.vendor;
    title.appendChild(name);
    title.appendChild(document.createTextNode('•'));
    title.appendChild(brand);
    const priceTab = document.createElement('div');

    // Access the price tab functionality using DOM manipulation
    priceTab.classList.add('price-tab');
    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = 'Rs.' + product.price;
    const original = document.createElement('div');
    original.classList.add('original');
    original.textContent = 'Rs.' + product.compare_at_price;

    const discount = document.createElement('div');
    discount.classList.add('discount');
    // the discount percentage is calculated based on the original price and the discounted price
    const discountPercent = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
    discount.textContent = discountPercent + '% Off';
    priceTab.appendChild(price);

    // code helps to adds a bullet point separator and the original price to the price tab section.
    priceTab.appendChild(document.createTextNode('•'));
    priceTab.appendChild(original);

    // Code helps to bullet point separator, and to append discount information to the price tab section
    priceTab.appendChild(document.createTextNode('•'));
    priceTab.appendChild(discount);

    // Helps to add the product title and price information to the product description section.
    description.appendChild(title);
    description.appendChild(priceTab);

    // This part of the code creates a new button element and sets its text content to "Add to Cart".
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';

    //This section appends the image container, product description, and "Add to Cart" button to the card element.
    card.appendChild(imageContainer);
    card.appendChild(description);
    card.appendChild(button);
    container.appendChild(card);
}