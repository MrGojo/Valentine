let noClicks = 1;
const maxNoClicks = 4;
const minNoScale = 0.65;
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order
const gifs = ["assets/images/togepi-happy.gif", "assets/images/togepi-sad-1.gif", "assets/images/togepi-sad-2.gif", "assets/images/togepi-crying.gif"];
// array of messages
const buttonMessages = ["Are you sure??", "Pookie please", "Pookie PLEASE", "You can't do this to me!"];

// Add these new constants at the top
const padding = 20; // Padding from viewport edges

// Function to get a random position that ensures button visibility
function getRandomPosition(element, imageHeight) {
    const buttonRect = element.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const padding = isMobile ? 30 : 20;
    
    // Adjust boundaries for mobile
    const maxX = window.innerWidth - buttonRect.width - (padding * 2);
    const minY = window.innerHeight * 0.5; // Start from middle of screen
    const maxY = window.innerHeight * 0.8; // Don't go below 80% of screen height
    
    return {
        x: Math.max(padding * 2, Math.random() * maxX),
        y: Math.min(Math.random() * (maxY - minY) + minY, maxY)
    };
}

// no button clicked
noButton.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
        gifElement.src = gifs[noClicks % maxNoClicks];
    }

    noButton.textContent = buttonMessages[noClicks % maxNoClicks];

    // Adjust no button width and scale
    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;
    
    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // Make the no button jump to a random position
    const valentineText = document.querySelector('h1');
    const textBottom = valentineText.getBoundingClientRect().bottom;
    const newPos = getRandomPosition(noButton, textBottom);
    noButton.style.position = 'absolute';
    noButton.style.left = `${newPos.x}px`;
    noButton.style.top = `${newPos.y}px`;

    // Yes button growth logic
    yesScale += (window.innerWidth < 768) ? 0.15 : 0.2; // Slower growth on mobile
    
    // Inverse image and text scaling
    const shrinkScale = 1 / yesScale;
    
    // Scale and move image
    gifElement.style.transform = `scale(${shrinkScale})`;
    
    // Scale and move valentine text
    valentineText.style.transform = `scale(${shrinkScale})`;
    
    // Move yes button up as it grows to stay in view
    const upwardShift = (window.innerWidth < 768) 
        ? 30 * (1 - shrinkScale) // Less shift for vertical layout
        : 100 * (1 - shrinkScale);
    yesButton.style.position = 'absolute';
    yesButton.style.left = '50%';
    yesButton.style.transform = `translate(-50%, -${upwardShift}px) scale(${yesScale})`;
    
    noClicks++;
});

// Update initial positioning
window.addEventListener('load', () => {
    const valentineText = document.querySelector('h1');
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Stack buttons vertically
        yesButton.style.position = 'relative';
        yesButton.style.transform = 'none';
        
        noButton.style.position = 'relative';
        noButton.style.transform = 'none';
        
        // Ensure buttons are centered
        yesButton.style.left = '0';
        noButton.style.left = '0';
    }
    
    // Set initial transforms
    gifElement.style.transform = 'scale(1)';
    valentineText.style.transform = 'scale(1)';
});
