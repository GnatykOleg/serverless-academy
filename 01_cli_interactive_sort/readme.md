First task is to write a small CLI application without any external dependencies that expects the
user to enter a few words or numbers separated by a space. Next, the program should ask how to sort
the user's input.

The complete flow should look like this:

1. Wait for user’s input
2. Ask what the user would like to see in the output - what operation to do with words and numbers,
   namely:
    - а. Sort words alphabetically
    - b. Show numbers from lesser to greater
    - c. Show numbers from bigger to smaller
    - d. Display words in ascending order by number of letters in the word
    - e. Show only unique words
    - f. Display only unique values from the set of words and numbers entered by the user
    - g. To exit the program, the user need to enter `exit`, otherwise the program will repeat
      itself again and again, asking for new data and suggesting sorting
