const fs = require('fs');
const jsc = require('jsverify');

// Load the code (your WildCardCocktailSort.js implementation)
eval(fs.readFileSync('WildCardCocktailSort.js') + '');

// Function to compare two arrays
function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Test to verify that cocktail shaker sort for integers produces the same results as the built-in sort
const testSortIntegers = jsc.forall("array nat", function(arr) {
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
    const containsIntegers = random