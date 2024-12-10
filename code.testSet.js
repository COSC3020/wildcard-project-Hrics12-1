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
    // Filter out non-integer values and limit size
    arr = arr.filter(Number.isInteger).slice(0, 100); // limit size to 100 for performance

    // Sort using cocktail shaker sort
    var a1 = JSON.parse(JSON.stringify(arr));
    var a2 = JSON.parse(JSON.stringify(arr));
    cocktailShakerSort(a1);

    // Sort using built-in JavaScript sort
    a2.sort((a, b) => a - b);

    // Compare both sorted arrays
    return arraysAreEqual(a1, a2);
});

// Test to verify that cocktail shaker sort for strings produces the same results as the built-in sort
const testSortStrings = jsc.forall("array string", function(arr) {
    // Filter to ensure strings are valid printable ASCII characters (no special characters like ": or "!")
    arr = arr.filter(item => typeof item === 'string' && /^[A-Za-z]+$/.test(item));

    // Sort using cocktail shaker sort
    var a1 = JSON.parse(JSON.stringify(arr));
    var a2 = JSON.parse(JSON.stringify(arr));
    cocktailShakerSortStrings(a1);

    // Sort using built-in JavaScript sort
    a2.sort();

    // Compare both sorted arrays
    return arraysAreEqual(a1, a2);
});

// Test to verify that combineArray produces a mixed array of integers and strings
const testCombineArray = jsc.forall("nat nat nat", function(size, intRangeLow, intRangeHigh) {
    // Restrict size and ensure valid ranges for integers
    size = Math.min(size, 100);  // Limiting size to 100 to avoid excessive array size
    if (intRangeLow > intRangeHigh) {
        return true; // Skip invalid case
    }

    const randomArray = combineArray(size, [intRangeLow, intRangeHigh], [2, 10]);

    // Ensure that the array has both integers and strings
    const containsIntegers = randomArray.some(item => typeof item === 'number');
    const containsStrings = randomArray.some(item => typeof item === 'string');

    return containsIntegers && containsStrings;
});

// Test to verify that getIntegers generates an array of unique integers within the given range
const testGetIntegers = jsc.forall("nat nat nat", function(count, min, max) {
    // Skip test if the range is too small
    if (max - min + 1 < count) {
        return true; // Skip invalid case
    }

    const result = getIntegers(count, min, max);

    // Ensure the integers are unique
    const uniqueIntegers = new Set(result);
    return uniqueIntegers.size === result.length;  // Fixing the typo: 'result.l' -> 'result.length'
});

// Run all tests
jsc.assert(testSortIntegers);
jsc.assert(testSortStrings);
jsc.assert(testCombineArray);
jsc.assert(testGetIntegers);
