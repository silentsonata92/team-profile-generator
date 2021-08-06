const Engineer = require("./Develop/lib/Engineer");
const Manager = require("./Develop/lib/Manager");
const Intern = require("./Develop/lib/Intern");
const render = require("./Develop/lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


let team = []

const manager = [
  {
    type: 'input',
    name: 'managerName',
    message: 'Input Manger Name:',
  },
  {
    type: 'input',
    name: 'managerId',
    message: 'Input Manager ID:'
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: 'Input Manager Email:'
  },
  {
    type: 'input',
    name: 'managerOffice',
    message: 'Input Manager Office number:'
  }
]

const engineer = [
  {
    type: 'input',
    name: 'engineerName',
    message: 'Input Enginner Name:',
  },
  {
    type: 'input',
    name: 'enginnerId',
    message: 'Input Engineer ID:'
  },
  {
    type: 'input',
    name: 'enginnerEmail',
    message: 'Input Engineer Email:'
  },
  {
    type: 'input',
    name: 'engineerGitHub',
    message: 'Input Engineer Git Hub Username:'
  }
]

const intern = [
  {
    type: 'input',
    name: 'internName',
    message: 'Input Enginner Name:',
  },
  {
    type: 'input',
    name: 'InternId',
    message: 'Input Intern ID:'
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: 'Input Intern Email:'
  },
  {
    type: 'input',
    name: 'InternSchool',
    message: 'Input Intern School Name:'
  }
]
 
const chooseTeam = () =>{
  inquirer
  .prompt([{
    type: 'list',
    name: 'teamRole',
    choices: ['Engineer','Intern', 'Finished Adding Members'],
    messages: 'Choose a member to add to the team.'
  }])
  .then(data =>{
    switch (data.teamRole){
      case 'Engineer':
        chooseEngineer ()
        break

      case 'Intern':
        chooseIntern()
        break

      default:
        createTeam()
      }
    })
}

inquirer
  .prompt(manager)
  .then (ans=>{
    team.push(new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOffice))
    chooseTeam()
  })

  
  const chooseEngineer = () =>{
    inquirer
    .prompt(engineer)
    .then(ans => {
      console.log(ans)
      team.push(new Engineer(ans.engineerName, ans.engineerId, ans.engineerEmail, ans.engineerGitHub))
      chooseTeam()
    })
  }
  const chooseIntern = () =>{
    inquirer
    .prompt(intern)
    .then(ans => {
      console.log(ans)
      team.push(new Intern(ans.internName, ans.internId, ans.internEmail, ans.internSchool))
      chooseTeam()
    })
  }

const createTeam = () =>{
    render(team)
    fs.writeFile('index.html', render(team), function(err){
      if (err) {console.log(err)}
    })
  }