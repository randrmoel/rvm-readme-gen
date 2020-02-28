const inq = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inq
    .prompt([
        {
            type: 'input',
            message:'What is your Git user name?',
            default : 'randrmoel',
            name: 'gitUserName'
        },
        {
            type:'input',
            message:"What is your project's name?",
            default : 'README.md file creator',
            name:'projName'
        },
        {
            input: 'input',
            message: 'Please write a short project description',
            default : 'This program creates an automated README.md file',
            name:'desc'
        },
        {
            type: 'list',
            message : 'Which license should your project have?',
            default : 'None',
            name: 'licType',
            choices : ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3','GNU' ,'None']
        },
        {   type : 'input',
            message : 'Which command should be run to install dependencies?',
            default : 'npm i axios, npm i inquirer',
            name : 'depend'
        },
        {
            type : 'input',
            message : 'Which command should be run to execute tests?',
            default : 'Tester',
            name : 'tests'
        },
        {
            type : 'input',
            message : 'What does the user need to know about the repo?',
            default : 'Nothing particularly',
            name : 'repoInfo'
        },
        {
            type : 'input',
            message : 'What does the user need to know about contributing to the repo?',
            default : 'All help welcome',
            name : 'repoContr'
        }
    ]).then(function(resp1){

        outFile = JSON.stringify(resp1, null, 2);
        fs.writeFile('outFile.json', outFile, 'utf8', err =>{if(err) console.log(err)});
        axiosURL = `https://api.github.com/users/${resp1.gitUserName}`;

        axios
            .get(axiosURL)
            .then(resp2 => {
                const markup = `
##${resp1.projName}
        
## Description
${resp1.desc}
        
# Table of contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation <a name="installation"></a>
The following dependencies need to be installed
${resp1.depend}

## Usage <a name="usage"></a>
${resp1.repoInfo}

## License <a name="license"></a>
This project is licensed under the ${resp1.licType} license.

## Contributing <a name="contributing"></a>
${resp1.repoContr}
        
## Tests <a name = "tests"></a>
${resp1.tests}
        
## Questions <a name ="questions"></a>
<img src="${resp2.data.avatar_url}" alt ="avatar" style = "border-radius: 16px" width ="30" /> 

If you have an questions about the repo, open an issue or contact [${resp1.gitUserName}](${axiosURL})
at my email: ${resp2.data.email}`;

                fs.writeFile("README.md", markup, err => {
                    if(err) throw err;
                    console.log("README.md Saved!")
                })
            })
            .catch(err => console.log(err));
    });



