// script.js
const contourMap = document.getElementById("contourMap");

// Generate and animate contour lines
function generateContourLines() {
    for (let i = 0; i < 10; i++) {
        const contourLine = document.createElement("div");
        contourLine.className = "contour-line";
        contourLine.style.bottom = i * 10 + "%";
        contourMap.appendChild(contourLine);
    }
}

// Initialize animation
generateContourLines();

// Animate contour lines
function animateContourLines() {
    const lines = document.querySelectorAll(".contour-line");
    lines.forEach((line, index) => {
        line.style.left = Math.sin(performance.now() / 1000 + index) * 20 + "px";
    });
    requestAnimationFrame(animateContourLines);
}

animateContourLines();
