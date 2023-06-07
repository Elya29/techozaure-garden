document.addEventListener("DOMContentLoaded", function() {
    // const body = document.body
    const popContainer = document.querySelector('#pop-container')
    const clicks = document.querySelector('#clicks');

    // Cut window in 2 parts
    const halfWindow = window.innerHeight / 2

    // Preload SVG path for performances concerns
    const treeSVGs = [];
    const starSVGs = [];

    for (let i = 1; i <= 6; i++) {
        treeSVGs.push(`./assets/trees/tree${i}.svg`);
        starSVGs.push(`./assets/stars/star${i}.svg`);
    }

    clicks.addEventListener('click', function (event) {
        // Define the clicked area to handle top and bottom behavior
        const clickedInTopViewport = (event.clientY < halfWindow)
        
        // Create an iterator to randomize the trees and stars svgs 🌲⭐
        const iterator = Math.floor(Math.random() * (6 - 1) + 1)

        // Create the container and set its styles.
        const newSvgContainer = document.createElement('div')
        clickedInTopViewport ? newSvgContainer.classList.add("stars") : newSvgContainer.classList.add("trees");
        // Dirty trick to play both grow and wind animations on the trees :
        setInterval(() => {
            newSvgContainer.classList.contains('trees') ? newSvgContainer.classList.add("wind") : '';
        }, 3000)
        newSvgContainer.style.position = 'absolute'
        newSvgContainer.style.overflow = 'hidden'
        newSvgContainer.style.left = `${event.clientX}px`
        newSvgContainer.style.top = `${event.clientY}px`
        newSvgContainer.style.width = clickedInTopViewport ? '15px' : '51px'
        newSvgContainer.style.height = '98px'

        // Create the SVG object, and set its data depending on the cliked area to draw a tree or a star 🌲⭐
        const svgElement = document.createElement('object')
        svgElement.setAttribute('type', 'image/svg+xml')
        svgElement.style.width = '100%';
        svgElement.style.height = '100%';

        const svgPath = clickedInTopViewport ? starSVGs[iterator - 1] : treeSVGs[iterator - 1];
        svgElement.setAttribute('data', svgPath)

        // Send it to the DOM, yay!
        newSvgContainer.appendChild(svgElement)
        popContainer.appendChild(newSvgContainer)
    });
})


/**
 * Draw a rainbow every 2 minutes, because it makes me happy 🌈
 * And you should be happy too.
 */
const rainbow = document.getElementById("rainbow")
const toggleRainbow = () => rainbow.classList.contains('show') ? rainbow.classList.remove('show') : rainbow.classList.add("show")
setInterval(toggleRainbow, 60000);