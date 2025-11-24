// Get previous count
let reviewCount = Number(localStorage.getItem("reviewCounter")) || 0;

// Increase count
reviewCount++;


localStorage.setItem("reviewCounter", reviewCount);

// Display it
document.getElementById("reviewCounter").textContent = reviewCount;
