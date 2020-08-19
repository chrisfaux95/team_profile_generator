// IMPORT OF REQUIRED PACKAGES
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const fs = require("fs");
//OUTPUT DIRECTORY PATH
var dir = './output';

//ARRAY OF COMMON QUESTIONS
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

//ADDING MANAGER SPECIFIC QUESTIONS
const manager_questions = [...all_questions, {
    type: 'input',
    name: 'officeNumber',
    message: "What is their office number?"
}]

//ADDING INTERN SPECIFIC QUESTIONS
const intern_questions = [...all_questions, {
    type: 'input',
    name: 'school',
    message: "What School did they go to/are they going to?"
}]

//ADDING ENGINEER SPECIFIC QUESTIONS
const engineer_questions = [...all_questions, {
    type: 'input',
    name: 'github',
    message: "What is their github username?"
}]

//QUESTION FOR EMPLOYEE ROLE SELECTION
const employee_select = [{
    type: 'list',
    name: 'role',
    message: 'What is their role?',
    choices: ['Manager', 'Engineer', 'Intern', "Stop Adding Employees"]
}]

//CREATION OF LIST OF EMPLOYEES
const employees = [];

// BASIC FUNCTION TO VALIDIATE EMAIL ADDRESS
// CHECKS IF IN THE FORM OF
// [blank]@[blank].[blank]
function validateEmail(value){
    const re_email = /\S+@\S+\.\S+/;
    if (re_email.test(value)){
        return true;
    }
    return "Please Enter Valid Email";
}

//MAIN LOOPING FUNCTION
function addEmployees() {
    //START THE INQUIRER PROMPT
    inquirer.prompt(employee_select).then(e => {
        //GET EMPLOYEE ROLE AND SWITCH TO SPECIFIC FUNCTION
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
                // IF CHOOSING NOT EMPLOYEE,
                // EXIT LOOP AND MAKE HTML FILE
                writeHTMLFile(render(employees));
                break;
        }
    })
}
/* FUNCTIONS TO ADD EMPLOYEES */
function addManager() {
    // ASK MANAGER QUESTIONS
    inquirer.prompt(manager_questions).then(e => {
        // MAKE NEW MANAGER IN EMPLOYEES
        employees.push(new Manager(e.name, e.id, e.email, e.officeNumber));
        // RECALL FUNCTION TO ADD NEW EMPLOYEES
        addEmployees();
    });
}

function addEngineer() {
    // ASK ENGINEER QUESTIONS
    inquirer.prompt(engineer_questions).then(e => {
        // MAKE NEW ENGINEER IN EMPLOYEES
        employees.push(new Engineer(e.name, e.id, e.email, e.github));
        // RECALL FUNCTION TO ADD NEW EMPLOYEES
        addEmployees();
    });
}

function addIntern() {
    // ASK INTERN QUESTIONS
    inquirer.prompt(intern_questions).then(e => {
        // MAKE NEW INTERN IN EMPLOYEES
        employees.push(new Intern(e.name, e.id, e.email, e.school));
        // RECALL FUNCTION TO ADD NEW EMPLOYEES
        addEmployees();
    });
}

//FUNCTION TO WRITE GIVEN INPUT TO HTML FILE
function writeHTMLFile(html) {
    // NAME OF OUTPUT FILE
    const fileName = "team_page.html"
    // CHECKS IF THERE IS AN OUTPUT DIRECTORY
    // MAKES ONE IF NOT
    if(!fs.existsSync(dir)){ fs.mkdirSync(dir); }
    // WRITE FILE
    fs.writeFile("./output/" + fileName, html, (err) => {
        if (err) throw err;
        console.log('The page has been saved');
    });

}

// RUN THE PROMPT SEQUENCE
addEmployees();