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

    //install
    {
        type: 'confirm',
        message: 'Are there additional programs that the user needs to have installed to run your app?',
        name:'progNeeded',
    },
    {
        type: 'input',
        message: 'Please write comma-separated list of programs needed:',
        name:'progNeeded.items',
        when(answers){
            return answers.progNeeded === true;
        },
        filter(answers){
            return answers.split(/[,]/)
        },
    
    },
    {
        type: 'confirm',
        message: 'Does the user need to have any assets / information \n available or in the repo folder before using this program?',
        name: 'neededAssets'
    },
    {
        type: 'input',
        message: 'Please write comma-separated list of assets needed:',
        name: 'neededAssets.items',
        when(answers){
            return answers.neededAssets === true;
        },
        filter(answers){
            return answers.split(/[,]/);
        }
    },

    //use instructions
    {
        type: 'input',
        message: 'Please enter instructions for use. Separate steps with \';\':',
        name: 'useInst',
        filter(answers){
            return answers.split(/[;]/);
        }
    },
    {
        type: 'confirm',
        message: 'Would you like to link screenshots?',
        name: 'wantSS'
    },
    {
        type: 'list',
        message: 'How would you like to link your screenshots?',
        choices: ['link to image in assets folder', 'insert image into README'],
        name: 'wantSS.how',
        when(answers){
            return answers.wantSS === true;
        }
    },
        {
        type: 'input',
        message: 'Enter screen shot alt text:',
        name: 'wantsSS.altText',
        when(answers){
            return answers.wantSS === true;
        }
    },
    {
        type: 'input',
        message: 'Please enter the relative file path:',
        name: 'wantSS.how.path',
        when(answers){
            return answers.wantSS === true;
        }
    },

    // {
    //     type: 'input',
    //     message: 'Enter screen shot alt text:',
    //     name: 'ssAltText'
    // },
    // {
    //     type: 'input',
    //     message: 'Enter screen shot link:',
    //     name: 'ssLink'
    // },
    // {
    //     type: 'confirm',
    //     message: 'Would you like to link a video walkthrough?',
    //     name: 'video'
    // },
    // {
    //     type: 'input',
    //     message: 'Please add video link:',
    //     name: 'videoLink'
    // },

    //credits
    // {
    //     type: 'confirm',
    //     message: 'Did you work with anyone else or use additional \n resources in this project?',
    //     name: 'anyoneElse'
    // },
    // {
    //     type: 'input',
    //     message: 'Please provide the name:',
    //     name: 'aeName'
    // },
    // {
    //     type: 'input',
    //     message: 'Please provide the link:',
    //     name: 'aeLink'
    // },
    // {
    //     type: 'input',
    //     message: 'What did they do / what did you use from the resource?',
    //     name: 'aeCont'
    // },

    //license
    // {
    //     type: 'list',
    //     message: 'Which license would you like to add?',
    //     choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
    //     name: 'license'
    // },

]).then(ans => {
    console.log(ans);

    let neededProgs = [];
    funct.generateUList(ans.progNeeded.items, neededProgs);

    let assetsNeeded = [];
    funct.generateUList(ans.neededAssets.items, assetsNeeded);

    let instForUse = [];
    funct.generateOList(ans.useInst, instForUse);

    console.log(ans.wantSS);
    const title = ans.title;
    const desc = ans.desc;
    const problem = ans.problem;
//     const neededInfo = ans.neededInfo;
//     const installInst = ans.installInst;
//     const useInst = ans.useInst;
//     const ssAltText = ans.ssAltText;
//     const ssLink = ans.ssLink;
//     const videoLink = ans.videoLink;
//     const aeName = ans.aeName;
//     const aeLink = ans.aeLink;
//     const aeCont = ans.aeCont;
//     const license = ans.license;
   const writeREADME = 
`# ${title}

${desc}
    
${problem}

## Table of Contents
* [Installation](#installation)
* [Instructions for Use](#instructions-for-use)
* [Credits](#credits)
* [License](#license)
    
## Installation
1. These programs need to be installed befur attempting to run the program:
${neededProgs}
2. Before running this program, please have the following information on hand and / or loaded into your 'asset/images' folder:
${assetsNeeded}

## Instructions for Use
${instForUse}`


//     - Here's a screenshot(s) of the program: [${ssAltText}](${ssLink})

//     - Here's a video overview of how to use the app: [${title}](${videoLink})

// ## Credits
// - @[${aeName}](${aeLink}):
//     - ${aeCont}


// ## License
// The files in this repository are covered by the ${license} license.

    fs.writeFile('README.md', writeREADME, err => {
        if (err) {
            throw err;
        }
    });
});