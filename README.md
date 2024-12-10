# Wildcard Project

You have a cool idea for an algorithms project? Use this repository. Make sure
to explain what problem you're solving, how you're doing it, and that you test
your code.

This was my thanksgiving break project

I'm not really sure what real world problem this solves but I was reading about variants to bubble sort. I thought the "Cocktail Shaker Sort" had a cool name so I started messing around with it over Thanksgiving break. I looked up some youtube videos on it and thought it looked neat how it is bidirectional. All this does is make an array with 100,000 elements. The array is combined by giving each element a 50% chance to be an integer with a value between 1-100 or a string with any variation of capital or lowercase letters between 2-10 characters long. It then splits the first array into 2 arrays if the element is either a integer or string. Then each of those arrays get sorted using the cocktail shaker sort algorithm. Ints from least to greatest and strings in alphabetical order. Each time one of the sort functions is called I used the preformance now method to start and stop before and after the sorting takes place to record how long the sort takes. I think the time complexity of the cocktail sort on the integers would just be $n$ if the array was sorted already but would have a worst case time of $O(n^2)$ if you had to go across the whole array and swap all the ints in both directions. For the string sorting I am a little confused. I think it would also take $O(n^2)$ time like the integers but would have some amount of time/energy multiplied by $O(n^2)$ because the length of the strings varies between 2 and 10 characters. I don't know how I would figure that out because I would assume the work multiplied would have to be the average length of all the strings. The issue is the amount of strings varies and the range of characters per string varies.


https://dev.to/hariseldon27/localecompare-and-sorting-in-javascript-1god

https://www.geeksforgeeks.org/cocktail-sort/

https://youtu.be/VVyGnL9WG2A?feature=shared

https://www.javatpoint.com/cocktail-sort


These are the times of the sorts from array size 100 to 1,000,000 elements. When I cut the allowable string length in half, from 2-10 characters to 1-5 characters, the sorting went around 1.5x faster. This shows what I thought, and when the strings have a longer length it is another multiple of work being done. Because obviously scanning 10 chars is longer then scanning 5. I plan on trying some other tests with this after I finish the TSP asignments. I want to do a set amount of Ints and Strings, mainly only have 26 ints to sort, all one number long, and have 26 strings but only allowing them to be one character long. Both with shuffled unique values. I would assume they would take pretty much the same time to sort. Then I'm going to run it with merge sort and blow this "Cocktail sort" out of the water.

So as I expected the MergeSort function blew the cocktail sort out of the water. As seen in the graph "Using Merge" it sorted it's portion of the million elements in 504 milliseconds. The cocktail sort took around 31 minutes. My test where I had a fixed set of Ints and strings where both were set to 26, single characters with no duplicates. Still showed the strings took almost 51 times longer then the Integers to sort. 

FULL DISCLOSURE! ChatGPT did 100% of the test code. I could not figure it out as you can see and I just copied and pasted what it gave me. I hope these tests are right because I am braindead 

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."
![Screenshot (13)](https://github.com/user-attachments/assets/b5e20d8e-0e1d-44d0-ad8d-27b6e32f1767)
![graph](https://github.com/user-attachments/assets/8e985c70-5e68-4b71-8a2a-fb84dbdf3aa4)
![Screenshot (179)](https://github.com/user-attachments/assets/19be024a-800d-4f7d-9762-c7da35c50f3f)
![Screenshot (180)](https://github.com/user-attachments/assets/3be7f078-c636-4004-931a-0ea0f97636e2)
