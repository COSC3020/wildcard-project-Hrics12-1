const {
  getRandomInts,
  getRandomString,
  combineArray,
  sortArrayByType,
  cocktailShakerSort,
  cocktailShakerSortStrings,
} = require('./yourFileName'); // Make sure the correct file name is used.

describe('Utility Functions', () => {

  // Test getRandomInts function
  test('getRandomInts returns an integer within the specified range', () => {
    const min = 1;
    const max = 10;
    const result = getRandomInts(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  // Test getRandomString function
  test('getRandomString returns a string of correct length', () => {
    const length = 5;
    const result = getRandomString(length);
    expect(result.length).toBe(length);
    expect(typeof result).toBe('string');
  });

  // Test combineArray function
  test('combineArray returns an array with mixed integers and strings', () => {
    const size = 10;
    const intRange = [1, 100];
    const strLengthRange = [3, 5];
    const result = combineArray(size, intRange, strLengthRange);
    
    expect(result.length).toBe(size);
    const integers = result.filter(item => typeof item === 'number');
    const strings = result.filter(item => typeof item === 'string');
    
    expect(integers.length + strings.length).toBe(size);
  });

  // Test sortArrayByType function
  test('sortArrayByType separates integers and strings correctly', () => {
    const mixedArray = [3, 'hello', 5, 'world', 2, 'apple'];
    const result = sortArrayByType(mixedArray);

    expect(result.integers).toEqual([3, 5, 2]);
    expect(result.strings).toEqual(['hello', 'world', 'apple']);
  });

  // Test cocktailShakerSort function for integers
  test('cocktailShakerSort sorts integers correctly', () => {
    const unsortedArray = [5, 3, 8, 1, 2];
    const result = cocktailShakerSort(unsortedArray);

    expect(result).toEqual([1, 2, 3, 5, 8]);
  });

  // Test cocktailShakerSortStrings function for strings
  test('cocktailShakerSortStrings sorts strings alphabetically', () => {
    const unsortedArray = ['banana', 'apple', 'cherry', 'date'];
    const result = cocktailShakerSortStrings(unsortedArray);

    expect(result).toEqual(['apple', 'banana', 'cherry', 'date']);
  });

});

