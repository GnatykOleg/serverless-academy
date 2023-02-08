import inquirer from 'inquirer';
import fs from 'fs/promises';

const findUser = async () => {
    try {
        const { confirm } = await inquirer.prompt({
            type: 'confirm',
            name: 'confirm',
            message: 'Would you to search values in DB:',
        });

        if (confirm) {
            const data = await getDataFromDb();
            console.log('\nDB: ', data);
            const { search } = await inquirer.prompt({
                type: 'input',
                name: 'search',
                message: 'Enter user name you wanna find in DB:',
                validate: answer =>
                    !answer || !isNaN(answer) ? 'The input value must be a word' : true,
            });

            const userToFind = data.find(
                user => user.name.toLowerCase().trim() === search.toLowerCase().trim()
            );

            const isUserExist = userToFind
                ? `\nUser ${userToFind.name} found. \n${JSON.stringify(userToFind)}`
                : '\nUser not found!';

            console.log(isUserExist);
            return findUser();
        } else {
            return null;
        }
    } catch (error) {
        console.log('\nerror.message', error.message);
    }
};

const addUser = async () => {
    try {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the users name. To cancel press ENTER:',
            validate: answer => {
                return isNaN(answer) || answer === '' ? true : 'The input value must be a word';
            },
        });

        if (!name) return await findUser();

        const { age, gender } = await inquirer.prompt([
            {
                type: 'list',
                name: 'gender',
                message: 'Choose your Gender:',
                choices: ['male', 'female'],
                default: 'male',
            },
            {
                type: 'input',
                name: 'age',
                message: 'Enter your age:',
                validate: answer =>
                    (!isNaN(answer) && answer > 0) || !answer
                        ? true
                        : 'The input value must be a number greater than 0, you can also leave the field blank',
            },
        ]);

        const result = age ? { name, age, gender } : { name, gender };

        const isData = await fs.readFile('./db.txt', 'utf-8');

        await fs.appendFile('./db.txt', `${isData ? ', \n' : ''}${JSON.stringify(result)}`);

        return app();
    } catch (error) {
        console.log('\nerror.message', error.message);
    }
};

const getDataFromDb = async () => {
    try {
        const data = await fs.readFile('./db.txt', 'utf-8');

        const dataToParse = data.split(', \n').map(el => JSON.parse(el));

        return dataToParse;
    } catch (error) {
        console.log('\nerror.message', error.message);
    }
};

const app = async () => {
    try {
        await addUser();
        await getDataFromDb();
    } catch (error) {
        console.log('\nerror.message', error.message);
    }
};

app();
