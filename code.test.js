const fs = require('fs');
const jsc = require('jsverify');

// Load the code (your WildCardCocktailSort.js implementation)
eval(fs.readFileSync('WildCardCocktailSort.js') + '');

// Function to compare two arrays
function arraysAreEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

// Test to verify that cocktail shaker sort for integers produces the same results as the built-in sort
test('cocktailShakerSort sorts integers correctly', async () => {
  await jsc.checkForall("array nat", function(arr) {
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
});

// Test to verify that cocktail shaker sort for strings produces the same results as the built-in sort
test('cocktailShakerSortStrings sorts strings correctly', async () => {
  await jsc.checkForall("array string", function(arr) {
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
});

// Test to verify that combineArray produces a mixed array of integers and strings
test('combineArray returns an array with mixed integers and strings', async () => {
  await jsc.checkForall("nat nat nat", function(size, intRangeLow, intRangeHigh) {
    // Ensure the size is within reasonable limits
    size = Math.min(size, 100);  // Limiting size to 100 to avoid excessive array size

    // Skip invalid cases where the range is incorrect
    if (intRangeLow > intRangeHigh || intRangeLow < 0 || intRangeHigh < 0) {
      return true; // Skip this test case
    }

    // Generate a combined array
    const randomArray = combineArray(size, [intRangeLow, intRangeHigh], [2, 10]);

    // Ensure the array contains both integers and strings
    const containsIntegers = randomArray.some(item => typeof item === 'number');
    const containsStrings = randomArray.some(item => typeof item === 'string');

    return containsIntegers && containsStrings;
  });
});
