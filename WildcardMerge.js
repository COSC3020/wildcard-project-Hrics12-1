//I used versions of my mergesort exercise for the sorting of ints and strings

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


function mergesort(array) {
    if (array.length < 2) {
        return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = mergesort(array.slice(0, mid));
    const right = mergesort(array.slice(mid));

    return merge(left, right);
}


function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}


function mergesortStrings(array) {
    if (array.length < 2) {
        return array;
    }

    const mid = Math.floor(array.length / 2);
    const left = mergesortStrings(array.slice(0, mid));
    const right = mergesortStrings(array.slice(mid));

    return mergeStrings(left, right);
}


function mergeStrings(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].localeCompare(right[rightIndex]) < 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}


module.exports = {
    combineArray,
    sortArrayByType,
    mergesort,
    mergesortStrings
};

