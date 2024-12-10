const fs = require('fs');
const jsc = require('jsverify');

// Load the code (your WCSetintsAndStrings.js implementation)
eval(fs.readFileSync('WCSetintsAndStrings.js') + '');

// Function to compare two arrays
function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Test to verify that cocktail shaker sort for integers produces the same results as the built-in sort
const testSortIntegers = jsc.forall("array nat", function(arr) {
    // Make sure that we only work with valid integers
    arr = arr.filter(Number.isInteger); // filter out any non-integer values

    // Make two copies of the array
    var a1 = JSON.parse(JSON.stringify(arr));
    var a2 = JSON.parse(JSON.stringify(arr));

    // Sort using cocktail shaker sort
    cocktailShakerSort(a1);

    // Sort using built-in JavaScript sort
    a2.sort(function(a, b) { return a - b; });

    // Compare both sorted arrays
    return arraysAreEqual(a1, a2);
});

// Test to verify that cocktail shaker sort for strings produces the same results as the built-in sort
const testSortStrings = jsc.forall("array string", function(arr) {
    // Ensure that the strings are valid (no control characters)
    arr = arr.filter(item => typeof item === 'string' && /^[\x20-\x7E]*$/.test(item)); // Only printable ASCII characters

    // Make two copies of the array
    var a1 = JSON.parse(JSON.stringify(arr));
    var a2 = JSON.parse(JSON.stringify(arr));

    // Sort using cocktail shaker sort
    cocktailShakerSortStrings(a1);

    // Sort using built-in JavaScript sort
    a2.sort();

    // Compare both sorted arrays
    return arraysAreEqual(a1, a2);
});

// Test to verify that combineArray produces a mixed array of integers and strings
const testCombineArray = jsc.forall("nat nat nat", function(size, intRangeLow, intRangeHigh) {
    // If the range is invalid, skip this test
    if (intRangeLow > intRangeHigh) {
        return true; // skip invalid case
    }

    const randomArray = combineArray(size, [intRangeLow, intRangeHigh], [2, 10]);

    // Ensure that the array has both integers and strings
    const containsIntegers = randomArray.some(item => typeof item === 'number');
    const containsStrings = randomArray.some(item => typeof item === 'string');

    return containsIntegers && containsStrings;
});

// Test to verify that getIntegers generates an array of unique integers within the given range
const testGetIntegers = jsc.forall("nat nat nat", function(count, min, max) {
    // If the count is greater than the possible range of integers, skip this test
    if (max - min + 1 < count) {
        return true; // skip invalid case
    }

    const result = getIntegers(count, min, max);

    // Ensure the integers are unique
    const uniqueIntegers = new Set(result);
    return uniqueIntegers.size === result.length;
});

// Test to verify that getStrings generates an array of unique strings of the specified length
const testGetStrings = jsc.forall("nat", function(count) {
    const result = getStrings(count);

    // Ensure the strings are unique
    const uniqueStrings = new Set(result);
    return uniqueStrings.size === result.length;
});

// Running the tests
jsc.assert(testSortIntegers);
jsc.assert(testSortStrings);
jsc.assert(testCombineArray);
jsc.assert(testGetIntegers);
jsc.assert(testGetStrings);
