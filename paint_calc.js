









// Brands / Series / Color / Price
const prices = {
    'Benjamin Moore (Ben) - Matte': {
        "Opulence - matte, (white)": 55.99,
        "Silver Satin - matte, (gray)": 55.99,
        "Canvas - matte, (neutral)": 55.99,
        "Jack Frost - matte (blue)": 55.99,
    },
    'Behr - (Premium Plus) - Matte': {
        "Polar Bear - matte, (white)": 32.98,
        "Platinum - matte, (gray)": 35.98,
        "Dove - matte, (neutral)": 37.98,
        "Charismatic Sky - matte, (blue)": 35.98,
    },
    'Valspar - (Signature) - Matte': {
        "Ultra White - matte (white)": 45.98,
        "Gravity - matte, (gray)": 48.98,
        "Cream in My Coffee - matte, (neutral)": 42.98,
        "Soul Blue - matte, (blue)": 48.98,
    }
};


// Prompt-Sync
const prompt = require('prompt-sync')({ sigint: true });

// calculate area
function calculateArea(width, height) {
    return width * height;
}

// calculate gallons
function calculateGallons(area, coveragePerGallon = 350) {
    return area / coveragePerGallon;
}

// calculate price
function calculatePrice(gallons, pricePerGallon) {
    return gallons * pricePerGallon;
}

// display catalogue
function showCatalogue() {
    console.log('Available Paints and Prices (per gallon):');
    for (const brand in prices) {
        console.log(`\n${brand}:`);
        for (const [color, price] of Object.entries(prices[brand])) {
            console.log(`  ${color}: $${price} per gallon`);
        }
    }
    console.log('');
}


// get user input
function getUserInput(promptText) {
    return prompt(promptText);
}


// regex for closest match
function findClosestMatch(input, options) {
    const regex = new RegExp(input.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
    return options.find(option => regex.test(option)) || null;
}
// Async / Promise
async function getQuote() {
    const system = getUserInput('Would you like to use the Imperial or Metric system? (I/M): ').toUpperCase();
    const conversionFactor = system === 'I' ? 1 : 10.764;  // 1 square meter = 10.764 square feet

    const width = parseFloat(getUserInput(`Enter the width of the wall in ${system === 'I' ? 'feet' : 'meters'}: `));
    const height = parseFloat(getUserInput(`Enter the height of the wall in ${system === 'I' ? 'feet' : 'meters'}: `));
    const area = calculateArea(width, height) * (system === 'I' ? 1 : conversionFactor);

    // let function combined with if for input
    showCatalogue();

    let brand = getUserInput('Enter the brand of paint you want to use: ');
    let color = getUserInput('Enter the color of paint you want to use: ');

    const brandOptions = Object.keys(prices);
    brand = findClosestMatch(brand, brandOptions);
    
    if (!brand) {
        console.log('\nInvalid brand. Please check the catalogue and try again.');
        return;
    }

    const colorOptions = Object.keys(prices[brand]);
    color = findClosestMatch(color, colorOptions);

    if (!color) {
        console.log('\nInvalid color. Please check the catalogue and try again.');
        return;
    }

    const pricePerGallon = prices[brand][color];
    const gallonsNeeded = Math.ceil(calculateGallons(area));
    const totalPrice = calculatePrice(gallonsNeeded, pricePerGallon);

    // display information for paint by brand, color, square feet, gallons, and total cost
    console.log(`\nPaint Brand: ${brand}`);
    console.log(`Paint Color: ${color}`);
    console.log(`Area to Paint: ${area.toFixed(2)} sq ft`);
    console.log(`Gallons of Paint Needed: ${gallonsNeeded}`);
    console.log(`Total Cost: $${totalPrice.toFixed(2)}\n`);
}

getQuote();

