// This is for updating the version on the js and css so that it will actually load everytime instead of just being blank and lame.

// Generate a version number (timestamp)
const version = new Date().getTime();

// Get the CSS file and update its href
const cssFile = document.getElementById("css-file");
cssFile.href = `styles/styles.css?v=${version}`;

// Get the JS file and update its src
const jsFile = document.getElementById("js-file");
jsFile.src = `scripts/main.js?v=${version}`;