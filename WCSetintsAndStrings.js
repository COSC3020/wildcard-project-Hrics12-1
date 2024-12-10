function getRandomInts(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result; 
}
function getIntegers(count, min, max) {
    const integers = [];
    while (integers.length < count) {
        const randomInt = getRandomInts(min, max);
        if (!integers.includes(randomInt)) {
            integers.push(randomInt);
        }
    }
    return integers;
}
 
function getStrings(count) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const availableChars = characters.split('');
    const selectedChars = [];

    while (selectedChars.length < count) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        const selectedChar = availableChars.splice(randomIndex, 1)[0];
        selectedChars.push(selectedChar);
    }

    return selectedChars;
}
function combineArray(size, intRange, strLengthRange) {
    const randomArray = [];
    
    const integers = getIntegers(26, intRange[0], intRange[1]);
    
    const strings = getStrings(26);
    
    randomArray.push(...integers);
    randomArray.push(...strings);
    
    return randomArray.sort(() => Math.random() - 0.5);
}

function sortArrayByType(array) {
    const integers = [];
    const strings = [];

    array.forEach(item => {
        if (typeof item === 'number') {
            integers.push(item);
        } else if (typeof item === 'string') {
            strings.push(item);
        }
    });

    return { integers, strings };
}
function cocktailShakerSort(arr) {
    let swapped;
    let start = 0;
    let end = arr.length - 1;

    do {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        
        end--;

        for (let i = end; i > start; i--) {
            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;
            }
        }

        
        start++;

    } while (swapped);
    
    return arr;
}

// Cocktail Shaker Sort function for strings (alphabetical order)
function cocktailShakerSortStrings(arr) {
    let swapped;
    let start = 0;
    let end = arr.length - 1;

    do {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (arr[i].localeCompare(arr[i + 1]) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        end--;

        for (let i = end; i > start; i--) {
            if (arr[i].localeCompare(arr[i - 1]) < 0) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;
            }
        }

        start++;

    } while (swapped);
    
    return arr;
}

const arraySize = 52; 
const intRange = [1, 50]; 
const strLengthRange = [1, 1]; 

const randomArray = combineArray(arraySize, intRange, strLengthRange);
console.log(randomArray);
console.log("\n");

const { integers, strings } = sortArrayByType(randomArray);

let startTime = performance.now(); 
const sortedIntegers = cocktailShakerSort(integers);
let endTime = performance.now(); 
console.log(`Total time to sort integers: ${(endTime - startTime).toFixed(3)} ms`);
console.log('Integers:', sortedIntegers);
console.log("\n");

startTime = performance.now(); 
const sortedStrings = cocktailShakerSortStrings(strings);
endTime = performance.now(); 
console.log(`Total time to sort strings: ${(endTime - startTime).toFixed(3)} ms`);
console.log('Strings:', sortedStrings);
