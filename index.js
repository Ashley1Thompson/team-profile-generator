// global variables, requiring files
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
let employees = [];
let managerExists = false;
let options = [];

function continueQuestions() {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'addEmployee',
      message: 'Anyone else to add?',
    },
  ]) 
  .then (input => {
    // console.log(input)
    if (input.addEmployee) {
      employeeQuestions();
    } else {
      writeHTML();
    }
  })
};
// a function that will prompt questions about the employee
function employeeQuestions() {

  if (managerExists) { 
    options = ['Engineer', 'Intern'];
  } else {
    options = ['Manager', 'Engineer', 'Intern'];
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What is their role?',
      choices: options,
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the their name?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the their ID number?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the their email address?',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the their office number?',
      when: (employee) => employee.role === "Manager"  
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is the their GitHub username?',
      when: (employee) => employee.role === "Engineer"  
    },
    {
      type: 'input',
      name: 'school',
      message: 'What school do they attend?',
      when: (employee) => employee.role === "Intern"  
    },
    // handles role input, creates HTML when 'no one else to add' option is selected, 
    // otherwise, continues to prompt for more employees.
  ]).then(input => {
    
    if (input.role === 'Manager') {
      const manager = new Manager(input.name, input.id, input.email, input.officeNumber)
      employees.push(manager);
      managerExists = true;
      continueQuestions();
    } else if (input.role === 'Engineer') {
      const engineer = new Engineer(input.name, input.id, input.email, input.github)
      employees.push(engineer);
      continueQuestions();
    } else if (input.role === 'Intern') {
      const intern = new Intern(input.name, input.id, input.email, input.school)
      employees.push(intern);
      continueQuestions();
    }
  });

};
// function to return bootstrap html for cards
function cards(employee) {
  switch(employee.getRole()) {
    case "Manager":
      return `
       <div class="card m-5 shadow" style="width: 25rem;">
          <div class="bg-dark text-white" >
            <h5 class="card-title m-2">${employee.name}</h5>
            <h5 class="card-text m-2">Manager</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">id: ${employee.id}</li>
            <li class="list-group-item"><a href="mailto: ${employee.email}" target="_blank">${employee.email}</a></li>
            <li class="list-group-item">Office Number: ${employee.officeNumber}</li>
          </ul>
       </div>
       `;
    case "Engineer":
      return `
        <div class="card m-5 shadow" style="width: 25rem;">
          <div class="bg-light text-black" >
            <h5 class="card-title m-2">${employee.name}</h5>
            <h5 class="card-text m-2">Engineer</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">id: ${employee.id}</li>
            <li class="list-group-item"><a href="mailto: ${employee.email}" target="_blank">${employee.email}</a></li>
            <li class="list-group-item"><a href="https://github.com/${employee.github}" target="_blank">github.com/${employee.github}</a></li>
          </ul>
        </div>
        `;
  
    case "Intern" :
      return `
        <div class="card m-5 shadow" style="width: 25rem;">
          <div class="bg-light text-black" >
            <h5 class="card-title m-2">${employee.name}</h5>
            <h5 class="card-text m-2">Intern</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">id: ${employee.id}</li>
            <li class="list-group-item"><a href="mailto: ${employee.email}" target="_blank">${employee.email}</a></li>
            <li class="list-group-item">school: ${employee.school}</li>
          </ul>
        </div>
        `;
  };
};

// loop through data and create cards for each employee
function createCards() {
  let employeeCards = '';
  employees.forEach(employee => {employeeCards = employeeCards += cards(employee)})
  return employeeCards;
};

// a function to handle the creation of the HTML skeleton
function createHTML () {
  return`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Team Profiles</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid p-3" style="background-color: blue; color: white;">
      <div class="container">
        <h1 class="display-4 text-center">Team Profiles</h2>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-around mt-3">
      ${createCards()}
    </div>
  </body>
  </html>`;
  }

// docs - create HTML file
const writeHTML = function() {
  const newHTML = createHTML(cards)
  fs.writeFile('./dist/index.html', newHTML, (error) => 
  error ? console.log(error) : console.log('HTML created sucessfully!')
  );
};

employeeQuestions();