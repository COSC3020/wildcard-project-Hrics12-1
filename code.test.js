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
    if (intRangeLow > intRangeHigh) {
        return true; // skip invalid case
    }

    const randomArray = combineArray(size, [intRangeLow, intRangeHigh], [2, 10]);

    // Ensure that the array has both integers and strings
    const containsIntegers = randomArray.some(item => typeof item === 'number');
    const containsStrings = randomArray.some(item => typeof item === 'string');

    return containsIntegers && containsStrings;
});

// Test to ensure that getRandomInts produces values within the specified range
const testGetRandomInts = jsc.forall("nat nat", function(min, max) {
    if (min > max) return true; // skip invalid case
    const randomInt = getRandomInts(min, max);
    return randomInt >= min && randomInt <= max;
});

// Test to ensure getRandomString generates a string of the correct length
const testGetRandomString = jsc.forall("nat", function(length) {
    const randomString = getRandomString(length);
    return randomString.length === length;
});

// Test to ensure getIntegers generates the correct number of unique integers within a given range
const testGetIntegers = jsc.forall("nat nat nat", function(count, min, max) {
    if (count < 1 || min > max) return true; // skip invalid case
    const integers = getIntegers(count, min, max);
    return integers.length === count && integers.every(i => i >= min && i <= max && Number.isInteger(i)) && new Set(integers).size === integers.length;
});

// Test to ensure getStrings generates the correct number of unique strings
const testGetStrings = jsc.forall("nat", function(count) {
    if (count < 1) return true; // skip invalid case
    const strings = getStrings(count);
    return strings.length === count && strings.every(s => typeof s === 'string') && new Set(strings).size === strings.length;
});

// Performance Test (similar to your second script)
const testPerformance = jsc.forall("nat", function(size) {
    const intRange = [1, 50];
    const strLengthRange = [1, 1];

    // Generate a random array for testing
    const randomArray = combineArray(size, intRange, strLengthRange);

    const { integers, strings } = sortArrayByType(randomArray);

    let startTime = performance.now();
    cocktailShakerSort(integers);
    let endTime = performance.now();
    console.log(`Time to sort integers (size ${size}): ${(endTime - startTime).toFixed(3)} ms`);

    startTime = performance.now();
    cocktailShakerSortStrings(strings);
    endTime = performance.now();
    console.log(`Time to sort strings (size ${size}): ${(endTime - startTime).toFixed(3)} ms`);

    return true;
});

// Run the tests
jsc.run(testSortIntegers);
jsc.run(testSortStrings);
jsc.run(testCombineArray);
jsc.run(testGetRandomInts);
jsc.run(testGetRandomString);
jsc.run(testGetIntegers);
jsc.run(testGetStrings);
jsc.run(testPerformance);
