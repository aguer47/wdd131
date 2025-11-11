document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const tempC = 22;
const windKmh = 5;
const tempF = (tempC * 9 / 5) + 32;
document.getElementById("tempF").textContent = tempF.toFixed(0);

function calculateWindChill(t, w) {
    return 13.12 + 0.6215 * t - 11.37 * Math.pow(w, 0.16) + 0.3965 * t * Math.pow(w, 0.16);
}

let windChill = "N/A";
if (tempC <= 10 && windKmh > 4.8) {
    windChill = `${calculateWindChill(tempC, windKmh).toFixed(1)}°C`;
}
document.getElementById("windChill").textContent = windChill;