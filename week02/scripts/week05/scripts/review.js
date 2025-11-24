
let reviewCount = Number(localStorage.getItem("reviewCounter")) || 0;

// Increase count by 1
reviewCount++;

// Save back to localStorage
localStorage.setItem("reviewCounter", reviewCount);

// Display count on the page
document.getElementById("reviewCounter").textContent = reviewCount;
