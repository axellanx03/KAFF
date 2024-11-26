document.getElementById('signIn').addEventListener('click', function() {
    window.location.href = 'sign-in.html'; // Redirect to the sign-in page
});

document.getElementById('joinNow').addEventListener('click', function() {
    alert("Join now functionality not implemented.");
});

const addToCartButtons = document.querySelectorAll('.order-button');
const cartButton = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const cartItemsList = document.getElementById('cartItemsList');

// Array to hold cart items
let cartItems = [];

// Show cart button when an item is added
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        // Check if the user is logged in
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            // Redirect to the sign-in page with a query parameter
            window.location.href = 'sign-in.html?message=Please%20sign%20in%20to%20add%20items%20to%20your%20cart.'; // Redirect to sign-in page with message
            return; // Exit the function
        }

        const productName = button.parentElement.querySelector('h2').innerText; // Get product name
        const productImage = button.parentElement.querySelector('img').src; // Get product image
        const productPrice = parseFloat(button.parentElement.querySelector('p').innerText.replace('₱', '')); // Get product price
        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++; // Increase quantity if item already exists
        } else {
            cartItems.push({ name: productName, quantity: 1, image: productImage, price: productPrice }); // Add new item with quantity 1, image, and price
        }

        cartButton.style.display = 'flex'; // Show the cart button
        updateCartNotificationCount(); // Update notification count
    });
});

// Show cart panel when cart icon is clicked
cartButton.addEventListener('click', function() {
    cartPanel.style.display = 'block'; // Show the cart panel
    updateCartItems(); // Update the cart items list
});

// Function to update the cart items list
function updateCartItems() {
    cartItemsList.innerHTML = ''; // Clear the current list
    let totalPrice = 0; // Initialize total price

    cartItems.forEach((item, index) => {
        const li = document.createElement('li'); // Create a new list item

        // Create a container for the item details
        const itemContainer = document.createElement('div');
        itemContainer.style.display = 'flex';
        itemContainer.style.alignItems = 'center';

        // Create an image element for the product
        const img = document.createElement('img');
        img.src = item.image; // Assuming item.image contains the image URL
        img.alt = item.name; // Set alt text
        img.style.width = '50px'; // Set a fixed width for the image
        img.style.height = '50px'; // Set a fixed height for the image
        img.style.marginRight = '10px'; // Space between image and text

        // Create a span for the product name
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name; // Set the text to the product name

        // Create a span for the product price
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `₱${item.price.toFixed(2)}`; // Display the price formatted to 2 decimal places
        priceSpan.style.marginRight = '10px'; // Space between price and quantity controls
        priceSpan.style.marginLeft = 'auto'; // Push price to the right

        // Create quantity controls
        const quantityContainer = document.createElement('div');
        quantityContainer.style.display = 'flex';
        quantityContainer.style.alignItems = 'center';
        quantityContainer.style.marginLeft = '10px'; // Space between price and quantity controls

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.className = 'quantity-button';
        minusButton.style.margin = '0 5px';
        minusButton.onclick = () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateCartItems(); // Update the cart display
                updateCartNotificationCount(); // Update the notification count
            } else {
                // Remove the item from the cart if quantity is 1
                cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
                updateCartItems(); // Update the cart display
                updateCartNotificationCount(); // Update the notification count
            }
        };

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.className = 'quantity-button';
        plusButton.style.margin = '0 5px';
        plusButton.onclick = () => {
            item.quantity++;
            updateCartItems(); // Update the cart display
        };

        // Append buttons and quantity display to the container
        quantityContainer.appendChild(minusButton);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(plusButton);

        // Append image, name, price, and quantity to the item container
        itemContainer.appendChild(img);
        itemContainer.appendChild(nameSpan);
        itemContainer.appendChild(priceSpan); // Add price span
        itemContainer.appendChild(quantityContainer);

        // Append the item container to the list item
        li.appendChild(itemContainer);
        cartItemsList.appendChild(li); // Append the item to the list

        // Calculate total price
        totalPrice += item.price * item.quantity; // Calculate total price for the item
    });

    // Display total price below the items
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total: ₱${totalPrice.toFixed(2)}`; // Format total price
    totalPriceElement.style.color = '#5C4033'; // Set total price color to brown
    totalPriceElement.style.textAlign = 'right'; // Align total price to the right
}

// Function to update the cart notification count
function updateCartNotificationCount() {
    const notificationCount = document.getElementById('cartNotificationCount');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    notificationCount.textContent = totalItems > 0 ? totalItems : ''; // Show count if greater than 0
}

// Change the event listener for the back to menu text
document.getElementById('backToMenu').addEventListener('click', function() {
    cartPanel.style.display = 'none'; // Close the cart panel
});

// Add this code to handle the checkout button click
document.getElementById('checkoutButton').addEventListener('click', function() {
    window.location.href = 'checkout.html'; // Redirect to the checkout page
});

document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    let index = 0;

    function showNextProduct() {
        if (index < products.length) {
            products[index].classList.add('visible'); // Add visible class to fade in
            index++;
            setTimeout(showNextProduct, 300); // Adjust the delay as needed (300ms)
        }
    }

    showNextProduct(); // Start showing products
});

// Show search panel when search icon is clicked
document.getElementById('searchIcon').addEventListener('click', function() {
    document.getElementById('searchPanel').style.display = 'block'; // Show search panel
});

// Close search panel when close button is clicked
document.getElementById('closeSearch').addEventListener('click', function() {
    document.getElementById('searchPanel').style.display = 'none'; // Hide search panel
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase(); // Get the search query
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    // List of products (you can replace this with dynamic data if needed)
    const products = [
        { name: "Red Velvet Cookie", price: "₱90" },
        { name: "Chocolate Chip Cookie", price: "₱90" },
        { name: "Match Cream Cheese Cookie", price: "₱90" },
        { name: "S'mores Cookie", price: "₱110" },
        { name: "Brookie(Brownies x Cookie)", price: "₱110" },
        { name: "Oatmeal Walnut Cookie", price: "110" },
        { name: "Raspberry Oatmeal Walnut Cookie", price: "₱110" },
        { name: "Biscoff Cookie", price: "₱110" },
        { name: "Coffee Grinder", price: "₱1200" },
        { name: "Arabica Coffee Beans", price: "₱450" },
        { name: "Coffee Tumbler", price: "₱300" },
        { name: "Coffee Subscription", price: "₱1500" },
        { name: "Coffee Filter Paper", price: "₱100" },
        { name: "Coffee Scale", price: "₱1000" },
        { name: "Cold Brew Maker", price: "₱1200" },
        { name: "Vanilla Coffee Syrup", price: "₱250" },
        { name: "Coffee Creamer", price: "₱150" },
        { name: "Specialty Coffee Beans Gift Set", price: "₱600" }
    ];

    // Filter products based on the search query
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

    // Display filtered results
    filteredProducts.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price}`;
        li.onclick = () => {
            // Optionally, you can add functionality to add the item to the cart or navigate to its details
            alert(`You selected: ${product.name}`);
        };
        resultsContainer.appendChild(li);
    });
});
