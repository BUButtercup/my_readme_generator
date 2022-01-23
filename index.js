const inquirer = require('inquirer');
const fs = require('fs');
const funct = require('./fun-ctions')

inquirer.prompt([
    {
        type: 'input',
        message: 'What is the title of your program?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What does your program do?',
        name: 'desc'
    },
    {
        type: 'input',
        message: 'What problem does your program solve for the user?',
        name: 'problem'
    },
    {
        type: 'input',
        message: 'What information does the user need to have \n available before using this program?',
        name: 'neededInfo'
    },
    {
        type: 'input',
        message: 'What npm packages need to be installed?',
        name:'installInst'
    },
    {
        type: 'input',
        message: 'Please enter instructions for use:',
        name: 'useInst'
    },
    {
        type: 'confirm',
        message: 'Would you like to link screenshots?',
        name: 'wantSS'
    },
    {
        type: 'input',
        message: 'Enter screen shot alt text:',
        name: 'ssAltText'
    },
    {
        type: 'input',
        message: 'Enter screen shot link:',
        name: 'ssLink'
    },
    {
        type: 'confirm',
        message: 'Would you like to link a video walkthrough?',
        name: 'video'
    },
    {
        type: 'input',
        message: 'Please add video link:',
        name: 'videoLink'
    },
    {
        type: 'confirm',
        message: 'Did you work with anyone else or use additional \n resources in this project?',
        name: 'anyoneElse'
    },
    {
        type: 'input',
        message: 'Please provide the name:',
        name: 'aeName'
    },
    {
        type: 'input',
        message: 'Please provide the link:',
        name: 'aeLink'
    },
    {
        type: 'input',
        message: 'What did they do / what did you use from the resource?',
        name: 'aeCont'
    },
    {
        type: 'list',
        message: 'Which license would you like to add?',
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    },

]).then(ans => {
    const title = ans.title;
    const desc = ans.desc;
    const problem = ans.problem;
    const neededInfo = ans.neededInfo;
    const installInst = ans.installInst;
    const useInst = ans.useInst;
    const ssAltText = ans.ssAltText;
    const ssLink = ans.ssLink;
    const videoLink = ans.videoLink;
    const aeName = ans.aeName;
    const aeLink = ans.aeLink;
    const aeCont = ans.aeCont;
    const license = ans.license;
    const writeREADME = `# ${title}

    ${desc}
    
    ${problem}
    
    ## Table of Contents
    * [Installation](#installation)
    * [Instructions for Use](#instructions-for-use)
    * [Credits](#credits)
    * [License](#license)
    
    ## Installation
    1. Before running this app, please have the following information on hand and / or loaded into your 'asset/images' folder:
       - ${neededInfo}
    2. You will need the following npm packages installed:
       - ${installInst}
    
    ## Instructions for Use
    ${useInst}
       - [${ssAltText}](${ssLink})

    Here is a video overview of how to use the app: [${title}](${videoLink})
    
    ## Credits
    - @[${aeName}](${aeLink}):
      - ${aeCont}
    
    
    ## License
    The files in this repository are covered by the ${license} license.`

    fs.writeFile('README.md', writeREADME, err => {
        if (err) {
            throw err;
        }
    });
});