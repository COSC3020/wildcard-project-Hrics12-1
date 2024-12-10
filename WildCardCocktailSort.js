
function getRandomInts(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 
function combineArray(size, intRange, strLengthRange) {
    const randomArray = [];

    for (let i = 0; i < size; i++) {
        if (Math.random() < 0.5) { 
            const int = getRandomInts(intRange[0], intRange[1]);
            randomArray.push(int);
        } else {
            const strLength = getRandomInts(strLengthRange[0], strLengthRange[1]);
            const str = getRandomString(strLength);
            randomArray.push(str);
        }
    }

    return randomArray;
}

// Function to sort into two arrays for integers and strings
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

        // Left to right
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }

        // Decrease the end point, as the last element is now sorted
        end--;

        // Right to left
        for (let i = end; i > start; i--) {
            if (arr[i] < arr[i - 1]) {
                // Swap elements
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;
            }
        }

        // Increase the start point
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

module.exports = {
    combineArray,
    sortArrayByType,
    cocktailShakerSort,
    cocktailShakerSortStrings
};

