// Import the scripts from the current directory
const { combineArray, sortArrayByType, cocktailShakerSort, cocktailShakerSortStrings } = require('./WCSetintsAndStrings');
const { combineArray: combineArrayWC, sortArrayByType: sortArrayByTypeWC, cocktailShakerSort: cocktailShakerSortWC, cocktailShakerSortStrings: cocktailShakerSortStringsWC } = require('./WildCardCocktailSort');
const { combineArray: combineArrayWM, sortArrayByType: sortArrayByTypeWM, mergesort, mergesortStrings } = require('./WildcardMerge');

// Test WCSetintsAndStrings.js functionality
describe('WCSetintsAndStrings.js', () => {
    test('combines array of integers and strings correctly', () => {
        const arraySize = 52;
        const intRange = [1, 50];
        const strLengthRange = [1, 1];

        const randomArray = combineArray(arraySize, intRange, strLengthRange);
        expect(randomArray.length).toBe(arraySize);

        const { integers, strings } = sortArrayByType(randomArray);
        expect(integers.length + strings.length).toBe(arraySize);
    });

    test('cocktail shaker sort works on integers', () => {
        const integers = [10, 30, 20, 40, 50, 60];
        const sortedIntegers = cocktailShakerSort(integers);
        expect(sortedIntegers).toEqual([10, 20, 30, 40, 50, 60]);
    });

    test('cocktail shaker sort works on strings', () => {
        const strings = ['C', 'A', 'B', 'E', 'D'];
        const sortedStrings = cocktailShakerSortStrings(strings);
        expect(sortedStrings).toEqual(['A', 'B', 'C', 'D', 'E']);
    });
});

// Test WildCardCocktailSort.js functionality
describe('WildCardCocktailSort.js', () => {
    test('combines array of integers and strings correctly', () => {
        const arraySize = 52;
        const intRange = [1, 50];
        const strLengthRange = [1, 1];

        const randomArray = combineArrayWC(arraySize, intRange, strLengthRange);
        expect(randomArray.length).toBe(arraySize);

        const { integers, strings } = sortArrayByTypeWC(randomArray);
        expect(integers.length + strings.length).toBe(arraySize);
    });

    test('cocktail shaker sort works on integers', () => {
        const integers = [10, 30, 20, 40, 50, 60];
        const sortedIntegers = cocktailShakerSortWC(integers);
        expect(sortedIntegers).toEqual([10, 20, 30, 40, 50, 60]);
    });

    test('cocktail shaker sort works on strings', () => {
        const strings = ['C', 'A', 'B', 'E', 'D'];
        const sortedStrings = cocktailShakerSortStringsWC(strings);
        expect(sortedStrings).toEqual(['A', 'B', 'C', 'D', 'E']);
    });
});

// Test WildcardMerge.js functionality
describe('WildcardMerge.js', () => {
    test('combines array of integers and strings correctly', () => {
        const arraySize = 52;
        const intRange = [1, 50];
        const strLengthRange = [1, 1];

        const randomArray = combineArrayWM(arraySize, intRange, strLengthRange);
        expect(randomArray.length).toBe(arraySize);

        const { integers, strings } = sortArrayByTypeWM(randomArray);
        expect(integers.length + strings.length).toBe(arraySize);
    });

    test('mergesort works on integers', () => {
        const integers = [10, 30, 20, 40, 50, 60];
        const sortedIntegers = mergesort(integers);
        expect(sortedIntegers).toEqual([10, 20, 30, 40, 50, 60]);
    });

    test('mergesort works on strings', () => {
        const strings = ['C', 'A', 'B', 'E', 'D'];
        const sortedStrings = mergesortStrings(strings);
        expect(sortedStrings).toEqual(['A', 'B', 'C', 'D', 'E']);
    });
});
