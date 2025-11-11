// Hamburger Toggle
const hamButton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.textContent = hamButton.textContent === "☰" ? "X" : "☰";
});

// Footer  Content
const today = new Date();

document.getElementById("currentyear").textContent = today.getFullYear();


document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
