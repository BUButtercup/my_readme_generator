const inquirer = require('inquirer');
const fs = require('fs');
const funct = require('./fun-ctions')


let neededProgs = [];
let assetsNeeded = [];
let answer;
let title;
let desc;
let problem;
let instForUse;

let instNum = 0;
const instructions = [];
const instLIs = [];


const questions = [
    {
        type: 'input',
        message: 'Let\'s build you a REAME.md! \n First, what is the title of your program?',
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
        message: 'Are there additional supporting programs (e.g. npm dependencies) that the user needs to have installed to run your program?',
        name:'progNeeded',
    },
    {
        type: 'input',
        message: 'Please write a COMMA-SEPARATED list of the programs needed:',
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
        message: 'Please write a COMMA-SEPARATED list of the assets / information needed:',
        name: 'neededAssets.items',
        when(answers){
            return answers.neededAssets === true;
        },
        filter(answers){
            return answers.split(/[,]/);
        }
    }]


const instQuestions = [{
    type: 'input',
    message: 'Please enter the next instruction step:',
    name: 'nextInst',
},
{
    type: 'confirm',
    message: 'Would you like to link a screenshot to this step?',
    name: 'wantSS',
},
{
    type: 'list',
    message: 'How would you like to link your screenshots?',
    choices: ['link to image in assets folder', 'insert image into README'],
    name: 'image.how',
    when(instAns){
        return instAns.wantSS === true;
    }
},
{
    type: 'input',
    message: 'Please enter the relative file path or link to image:',
    name: 'image.src',
    when(instAns){
        return instAns.wantSS === true;
    }
},
{
    type: 'input',
    message: 'Enter screen shot alt text:',
    name: 'image.alt',
    when(instAns){
        return instAns.wantSS === true;
    }
},
{
    type: 'input',
    message: 'Enter screen shot title:',
    name: 'image.imgTitle',
    when(instAns){
        return instAns.wantSS === true;
    }
},
{
    type: 'confirm',
    message: `Would you like to enter another step?`,
    name: 'wantNextInst',
}];

const writeFile = () => {
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
1. This program requires the following programs be installed:
<ul>${neededProgs}</ul>
2. Before running this program, please have the following information on hand and / or loaded into your 'asset/images' folder:
<ul>${assetsNeeded}</ul>

## Instructions for Use
<ol>${instForUse}</ol>


    - Here's a screenshot(s) of the program: [${ssAltText}](${ssLink})

    - Here's a video overview of how to use the app: [${title}](${videoLink})

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
 }

 function buildInst(instAns){
    if (instAns.wantSS === false){
        const newInst  = new funct.InstructionNoImg(instNum, instAns.nextInst, instAns.wantSS)
        console.log(newInst);
        instructions.push(newInst);
        return instNum++
    }
    if (instAns.wantSS === true){
        const newInst  = new funct.InstructionWImg(instNum, instAns.nextInst, instAns.wantSS, instAns.image.how, instAns.image.src, instAns.image.alt, instAns.image.imgTitle);
        console.log(newInst);
        instructions.push(newInst);
        return instNum++
    }
};

async function getNextInst(){
    for(let i=0; i<20; i++){
        let wantAnother;
        console.log(`You have entered ${instNum} steps.`);
        await inquirer.prompt(instQuestions).then(newInstAns => {
            wantAnother = newInstAns.wantNextInst
            buildInst(newInstAns);
            // if (newInstAns.wantNextInst===true)(getNextInst());
        })
        if (wantAnother===false){
            funct.displayInst(instructions, instLIs);
            console.log(instLIs);
            instForUse = instLIs.join('');
            console.log(instForUse);
            writeFile();
            break
        };
    }
}

async function getInst(){
    const answer = await inquirer.prompt ({type: 'input', message: 'We will now collect the instructions to use your program. This will return an ordered list. Press enter to begin.', name: 'useInst1'})
    if (answer.useInst1 === ''){
        inquirer.prompt(instQuestions).then(instAns => {
            buildInst(instAns);
            if (instAns.wantNextInst === true){
                getNextInst();
            } else {return}
        });
    }
}

function startAsking(){
    inquirer
        .prompt(questions).then(ans => {
        // console.log(ans);

        funct.generateList(ans.progNeeded.items, neededProgs);
        neededProgs = neededProgs.join('');
        // console.log(neededProgs)

        funct.generateList(ans.neededAssets.items, assetsNeeded);
        assetsNeeded = assetsNeeded.join('');

        answer = ans;
        title = ans.title;
        desc = ans.desc;
        problem = ans.problem;

        getInst()
    })
}



 startAsking()


