const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dataHelper = text => {
    console.log(`${text}`);
    return app();
};

const app = () => {
    rl.question(`Hello. Enter 10 words or digits deviding them in spaces: `, answer => {
        if (answer === 'exit') return rl.close();

        if (!answer) return dataHelper('The field cannot be empty!');

        const data = answer.split(' ');

        if (data.length <= 1) return dataHelper('Please enter more than 1 value');

        if (data.length > 10)
            return dataHelper(`You cannot enter more than 10 values, your values ${data.length}`);

        return howToSortData(data);
    });
    7;
};

const sortByAlphabet = data => data.filter(item => isNaN(item)).sort((a, b) => a.localeCompare(b));

const sortToIncremeant = data => {
    const result = data.filter(item => !isNaN(item)).sort((a, b) => a - b);
    if (result.length === 0)
        return console.log('There are no numbers in your data, sorting is not possible!');

    return result;
};

const sortToDecremeant = data => {
    const result = data.filter(item => !isNaN(item)).sort((a, b) => b - a);

    if (result.length === 0)
        return console.log('There are no numbers in your data, sorting is not possible!');

    return result;
};

const sortToWordLettersCount = data =>
    data.filter(item => isNaN(item)).sort((a, b) => a.length - b.length);

const sortByUniqueWords = data =>
    data.filter((item, index, array) => isNaN(item) && array.indexOf(item) === index);

const sortByUniqueValues = data =>
    data.filter((item, index, array) => array.indexOf(item) === index);

const options = {
    1: sortByAlphabet,
    2: sortToIncremeant,
    3: sortToDecremeant,
    4: sortToWordLettersCount,
    5: sortByUniqueWords,
    6: sortByUniqueValues,
};

const howToSortData = data => {
    rl.question(
        `\nWhat would you like to see in the output:
         \n1. Sort words alphabetically
         \n2. Show numbers from lesser to greater
         \n3. Show numbers from bigger to smaller
         \n4. Display words in ascending order by number of letters in the word
         \n5. Show only unique words
         \n6. Display only unique values from the set of words and numbers entered by the user
         \nAdditional commands "exit", "restart"
         \nPlease enter the desired sort number:`,
        answer => {
            if (answer === '') {
                console.log('\nYou did not enter a sort number!');
                return howToSortData(data);
            }
            if (answer === 'exit') return rl.close();

            if (answer === 'restart') return app();

            if (!options[answer]) {
                console.log('\nThere is no such sort number!');
                return howToSortData(data);
            }

            if (options[answer]) {
                console.log('Result: ', options[answer](data).join(' '));
                return howToSortData(data);
            }
        }
    );
};

app();
