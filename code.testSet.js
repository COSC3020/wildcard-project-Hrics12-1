const fs = require('fs');
const jsc = require('jsverify');

// Load the code (your WCSetintsAndStrings.js implementation)
eval(fs.readFileSync('WCSetintsAndStrings.js') + '');

// Helper function to compare arrays
function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Test case to verify cocktail shaker sort for integers produces the same result as built-in sort
const testSortIntegers = jsc.forall("array nat", function(arr) {
    // Filter to ensure the array has only integers and limit its size to 100
    arr = arr.filter(Number.isInteger).slice(0, 100);

    // Sort using cocktail shaker sort
    const a1 = JSON.parse(JSON.stringify(arr));
    const a2 = JSON.parse(JSON.stringify(arr));
    cocktailShakerSort(a1);

    // Sort using built-in JavaScript sort
    a2.sort((a, b) => a - b);

    // Compare both arrays
    return arraysAreEqual(a1, a2);
});

// Test case to verify cocktail shaker sort for strings produces the same result as built-in sort
const testSortStrings = jsc.forall("array string", function(arr) {
    // Filter out any non-string values and ensure valid strings
    arr = arr.filter(item => typeof item === 'string' && /^[A-Za-z]+$/.test(item));

    // Sort using cocktail shaker sort
    const a1 = JSON.parse(JSON.stringify(arr));
    const a2 = JSON.parse(JSON.stringify(arr));
    cocktailShakerSortStrings(a1);

    // Sort using built-in JavaScript sort
    a2.sort();

    // Compare both arrays
    return arraysAreEqual(a1, a2);
});

// Test case to verify that combineArray produces a mixed array of integers and strings
const testCombineArray = jsc.forall("nat nat nat", function(size, intRangeLow, intRangeHigh) {
    size = Math.min(size, 100);  // Limit size to 100 for performance
    if (intRangeLow > intRangeHigh) {
        return true; // Skip invalid case
    }

    const randomArray = combineArray(size, [intRangeLow, intRangeHigh], [2, 10]);

    // Ensure array contains both integers and strings
    const containsIntegers = randomArray.some(item => typeof item === 'number');
    const containsStrings = randomArray.some(item => typeof item === 'string');

    return containsIntegers && containsStrings;
});

// Test case to verify getIntegers generates unique integers within a given range
const testGetIntegers = jsc.forall("nat nat nat", function(count, min, max) {
    if (max - min + 1 < count) {
        return true; // Skip invalid case
    }

    const result = getIntegers(count, min, max);

    // Ensure the integers are unique
    const uniqueIntegers = new Set(result);
    return uniqueIntegers.size === result.length;
});

// Run all tests
jsc.assert(testSortIntegers);
jsc.assert(testSortStrings);
jsc.assert(testCombineArray);
jsc.assert(testGetIntegers);
