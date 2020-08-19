const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const fs = require("fs");

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
        message: "What is their email?",
        validate: validateEmail
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

function validateEmail(value){
    const re_email = /\S+@\S+\.\S+/;
    if (re_email.test(value)){
        return true;
    }
    return "Please Enter Valid Email";
}


function addEmployees() {
    inquirer.prompt(employee_select).then(e => {
        switch(e.role) {
            case 'Manager':
                addManager();
                break;
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            default:
                // console.log(employees);
                // console.log(render(employees));
                writeHTMLFile(render(employees));
                break;
        }
    })
}

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

function writeHTMLFile(html) {
    const fileName = "team_page.html"
    // console.log(html);
    // console.log(__dirname);
    fs.writeFile("./output/" + fileName, html, (err) => {
        if (err) throw err;
        console.log('The page has been saved');
    });

}

addEmployees();