const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dataHelper = text => {
    console.log(text);
    return app();
};

const app = () => {
    rl.question(`\nHello. Enter 10 words or digits deviding them in spaces: `, inputData => {
        if (inputData === 'exit') return rl.close();

        if (!inputData) return dataHelper('\nThe field cannot be empty!');

        const inputDataToArray = inputData.split(' ');

        if (inputDataToArray.length <= 1) return dataHelper('\nPlease enter more than 1 value');

        if (inputDataToArray.length > 10)
            return dataHelper(
                `\nYou cannot enter more than 10 values, your values ${inputDataToArray.length}`
            );

        return howToSortData(inputDataToArray);
    });
};

const arrayToFilterAndSort = ({ data, fooFilter, fooSort, word }) => {
    const arrayToFilter = data.filter(fooFilter);

    const result = fooSort ? arrayToFilter.sort(fooSort) : arrayToFilter;

    return result.length
        ? result
        : console.log(`\nThere are no ${word} in your data, sorting is not possible!`);
};

const options = {
    1: (sortByAlphabet = data =>
        arrayToFilterAndSort({
            data,
            fooFilter: item => isNaN(item),
            fooSort: (a, b) => a.localeCompare(b),
            word: 'words',
        })),
    2: (sortToIncremeant = data =>
        arrayToFilterAndSort({
            data,
            fooFilter: item => !isNaN(item),
            fooSort: (a, b) => a - b,
            word: 'numbers',
        })),
    3: (sortToDecremeant = data =>
        arrayToFilterAndSort({
            data,
            fooFilter: item => !isNaN(item),
            fooSort: (a, b) => b - a,
            word: 'numbers',
        })),
    4: (sortToWordLettersCount = data =>
        arrayToFilterAndSort({
            data,
            fooFilter: item => isNaN(item),
            fooSort: (a, b) => a.length - b.length,
            word: 'words',
        })),
    5: (sortByUniqueWords = data =>
        arrayToFilterAndSort({
            data,
            fooFilter: (item, index, array) => isNaN(item) && array.indexOf(item) === index,
            fooSort: null,
            word: 'words',
        })),
    6: (sortByUniqueValues = data =>
        arrayToFilterAndSort({
            data,
            fooFilter: (item, index, array) => array.indexOf(item) === index,
            fooSort: null,
            word: '',
        })),
};

const howToSortData = inputDataArray => {
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
        sortNumber => {
            if (!sortNumber) {
                console.log('\nYou did not enter a sort number!');
                return howToSortData(inputDataArray);
            }
            if (sortNumber === 'exit') return rl.close();

            if (sortNumber === 'restart') return app();

            if (!options[sortNumber]) {
                console.log('\nThere is no such sort number!');
                return howToSortData(inputDataArray);
            }

            if (options[sortNumber]) {
                options[sortNumber](inputDataArray) &&
                    console.log(`\nResult: ${options[sortNumber](inputDataArray).join(' ')}`);
                return howToSortData(inputDataArray);
            }
        }
    );
};

app();
