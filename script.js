const text = "Full Stack Developer";
const typingElement = document.querySelector(".typewriter");
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Speed of typing
    } else {
        // Optional: Erase and restart (Loop)
        setTimeout(() => {
            typingElement.innerHTML = "";
            index = 0;
            typeWriter();
        }, 3000); // Wait 3 seconds before restarting
    }
}

// Start animation when page loads
window.onload = typeWriter;
