const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const all_questions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the person's name?"
    },
    {
        type: 'input',
        name: 'id',
        message: "What is their employee ID number?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is their email?"
    }
];

const manager_questions = [...all_questions, {
    type: 'input',
    name: 'officeNumber',
    message: "What is their office number?"
}]

const intern_questions = [...all_questions, {
    type: 'input',
    name: 'school',
    message: "What School did they go to/are they going to?"
}]

const engineer_questions = [...all_questions, {
    type: 'input',
    name: 'github',
    message: "What is their github username?"
}]

const employee_select = [{
    type: 'list',
    name: 'role',
    message: 'What is their role?',
    choices: ['Manager', 'Engineer', 'Intern', "Stop Adding Employees"]
}]

const employees = [];


function addManager() {
    inquirer.prompt(manager_questions).then(e => {
        employees.push(new Manager(e.name, e.id, e.email, e.officeNumber));
        addEmployees();
    });
}

function addEngineer() {
    inquirer.prompt(engineer_questions).then(e => {
        employees.push(new Engineer(e.name, e.id, e.email, e.github));
        addEmployees();
    });
}

function addIntern() {
    inquirer.prompt(intern_questions).then(e => {
        employees.push(new Intern(e.name, e.id, e.email, e.school));
        addEmployees();
    });
}

