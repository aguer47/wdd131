// Product list
const products = [
    "Laptop",
    "Smartphone",
    "Headphones",
    "Smartwatch",
    "Bluetooth Speaker",
    "Gaming Mouse",
    "Mechanical Keyboard"
];

// Populate select
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product");

    if (!productSelect) {
        console.error("Product <select> element not found!");
        return;
    }

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product;
        option.textContent = product;
        productSelect.appendChild(option);
    });
});
