// Clock - Time Start
const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

// Update time every second
setInterval(() => {
    const currentTime = new Date();

    // Ensure leading zeros for hours, minutes, and seconds
    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);
// Clock- Time End

// Contact Form Validation Start
const nameError = document.getElementById("name_error");
const phoneError = document.getElementById("phone_error");
const emailError = document.getElementById("email_error");
const submitError = document.getElementById("submit_error");

// Validate name field
function validateName() {
    const name = document.getElementById('contact-name').value;
    const nameError = document.getElementById("name_error");

    if (name.trim() === "") {
        nameError.innerHTML = "Name is required";
        return false;
    } else {
        nameError.innerHTML = ""; // Clear error message if input is valid
        return true;
    }
}

// Validate phone field
function validatePhone() {
    const phone = document.getElementById('contact-phone').value.trim();
    const phoneError = document.getElementById("phone_error");

    if (phone === "") {
        phoneError.innerHTML = "Phone No. is required";
        return false;
    }
    if (!phone.match(/^[0-9]+$/)) {
        phoneError.innerHTML = "Only digits are allowed";
        return false;
    }
    if (phone.length !== 10) {
        phoneError.innerHTML = "Phone No. should be 10 digits";
        return false;
    }

    // If phone number contains 10 digits and only digits, it's valid
    phoneError.innerHTML = ""; // Clear error message if input is valid
    return true;
}

// Validate email field
function validateEmail() {
    const email = document.getElementById('contact-email').value.trim();
    const emailError = document.getElementById("email_error");

    if (email === "") {
        emailError.innerHTML = "Email is required";
        return false;
    }
    if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        emailError.innerHTML = "Invalid Email Format";
        return false;
    } else {
        emailError.innerHTML = ""; // Clear error message if input is valid
        return true;
    }
}

// Validate entire form
function validateForm() {
    nameError.innerHTML = "";
    phoneError.innerHTML = "";
    emailError.innerHTML = "";
    submitError.innerHTML = "";

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    // Display error message if any field is invalid
    if (!isNameValid || !isPhoneValid || !isEmailValid) {
        submitError.innerHTML = "Please fill the fields properly";
        return false;
    }

    return true;
}
// Contact Form Validation End

// Blog Adding Start
function addBlog() {
    // Get values from input fields
    const blogTitle = document.querySelector("input[placeholder='Blog Title']").value;
    const blogName = document.querySelector("input[placeholder='Name']").value;
    const blogDesc = document.querySelector("input[placeholder='Blog Description']").value;
    const main = document.getElementById("main_blogs");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // Note: Month indices start from 0

    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const monthText = monthNames[month];

    const day = currentDate.getDate();

    // Check if all fields are filled
    if (blogTitle && blogName && blogDesc) {
        // Create article elements
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const span = document.createElement('span');
        const p = document.createElement('p');
        const removeButton = document.createElement('button');

        // Set content for article elements
        h2.textContent = blogTitle;
        span.textContent = `Published on ${monthText} ${day}, ${year} by ${blogName}`;
        p.textContent = blogDesc;
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove_button');
        removeButton.addEventListener('click', function () {
            main.removeChild(article); // Remove the article element
            saveBlogsToLocalStorage(); // Update blogs in localStorage
        });

        // Append article elements to main section
        article.appendChild(h2);
        article.appendChild(span);
        article.appendChild(p);
        article.appendChild(removeButton);
        main.appendChild(article);

        // Clear input fields after adding article
        document.querySelector("input[placeholder='Blog Title']").value = '';
        document.querySelector("input[placeholder='Name']").value = '';
        document.querySelector("input[placeholder='Blog Description']").value = '';
        saveBlogsToLocalStorage(); // Save blogs to localStorage
    }
    else {
        alert('Please fill all fields properly');
    }
}

// Function to save blogs to localStorage
function saveBlogsToLocalStorage() {
    const main = document.getElementById("main_blogs");
    localStorage.setItem('blogs', main.innerHTML);
}

// Function to load blogs from localStorage
function loadBlogsFromLocalStorage() {
    const main = document.getElementById("main_blogs");
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
        main.innerHTML = savedBlogs;
        const removeButtons = main.querySelectorAll('button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                main.removeChild(button.parentNode); // Remove the article element
                saveBlogsToLocalStorage(); // Update blogs in localStorage
            });
        });
    }
}

// Call function to load blogs from localStorage when the page loads
loadBlogsFromLocalStorage();
// Blog Adding End













// Function to add item to cart
function addToCart(name, price, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Add the item
    cartItems.push({ name, price, quantity });

    // Update cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh cart display after adding item
    displayCartItems();
    // Update cart summary after adding item
    displayCartSummary();
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>Name: ${item.name}</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Function to remove item from cart
function removeFromCart(itemName) {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Find index of item to remove
    const index = cartItems.findIndex(item => item.name === itemName);
    if (index !== -1) {
        cartItems.splice(index, 1); // Remove item from array
        // Update cart items in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Refresh cart display after removing item
        displayCartItems();
        // Update cart summary after removing item
        displayCartSummary();
    }
}

// Function to calculate total price of items in cart
function calculateTotalPrice() {
    let totalPrice = 0;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
}

// Function to display cart summary (total price)
function displayCartSummary() {
    const cartSummaryContainer = document.getElementById('cartSummary');
    const totalPrice = calculateTotalPrice();

    cartSummaryContainer.innerHTML = `<p>Total Price: $${totalPrice}</p>`;
}

// Call functions to initially display cart items and summary
displayCartItems();
displayCartSummary();