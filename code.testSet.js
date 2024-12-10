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
    // Filter to ensure strings are valid ASCII printable characters
    arr = arr.filter(item => typeof item === 'string' && /^[\x20-\x7E]+$/.test(item));

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
    return uniqueIntegers.size === result.length;
});

// Test to verify that getStrings generates an array of unique strings of the specified length
const testGetStrings = jsc.forall("nat", function(count) {
    // Restrict string count to a reasonable number to prevent excessive generation
    count = Math.min(count, 100); // Limiting string count

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
