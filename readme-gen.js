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
let videoSec;
let creditLT = `* [Credits](#credits)`
let creditSec = `## Credits \n`;
let credits = [];
let license;

let instNum = 0;
const instructions = [];
const instLIs = [];


const questions = [
    {
        type: 'input',
        message: 'Let\'s build you a README.md! \n First, what is the title of your program?',
        name: 'title',
        default: 'My Program'
    },
    {
        type: 'input',
        message: 'What does your program do?',
        name: 'desc'
    },
    {
        type: 'input',
        message: 'What problem does your program solve for the user? What did you \n learn from making it? Where do you want to take it in the future?',
        name: 'problem'
    },

    //install
    {
        type: 'confirm',
        message: 'Are there additional supporting programs (e.g. npm dependencies) \n that the user needs to have installed to run your program?',
        name:'progNeeded',
        default: false
    },
    {
        type: 'input',
        message: 'Please write a COMMA-SEPARATED list of the programs needed. This will return an unordered list:',
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
        name: 'neededAssets',
        default: false
    },
    {
        type: 'input',
        message: 'Please write a COMMA-SEPARATED list of the assets / information needed. This will return an unordered list:',
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
    default: false
},
{
    type: 'list',
    message: 'How would you like to link your screenshots?',
    choices: ['insert image into README', 'link to image in assets folder'],
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
    default: false
}];

const videoQuestions = [{
    type: 'input',
    message: 'Please add video link:',
    name: 'videoLink'
}]

const creditsQuestions = [{
        type: 'list',
        message: 'Was it a collaborator or a resource?',
        choices: ['collaborator', 'resource / tutorial'],
        name: 'credit.type'
    },
    {
        type: 'input',
        message: 'Please provide the name:',
        name: 'credit.name'
    },
    {
        type: 'input',
        message: 'Please provide the link:',
        name: 'credit.link'
    },
    {
        type: 'input',
        message: 'What did they do / what did you use from the resource?',
        name: 'credit.cont'
    },
    {
        type: 'confirm',
        message: 'Do you want to give credit to anyone / anything else?',
        name: 'credit.additional',
        default: false
}]

const writeFile = () => {
    const writeREADME = 
`# ${title}

${desc}
    
${problem}

## Table of Contents
* [Installation](#installation)
* [Instructions for Use](#instructions-for-use)
${creditLT}
* [License](#license)
    
## Installation
1. This program requires the following programs be installed:<ul>${neededProgs}</ul>

2. Before running this program, please have the following information on hand and / or loaded into your 'asset/images' folder:<ul>${assetsNeeded}</ul>


## Instructions for Use
<ol>${instForUse}</ol>

${videoSec}

${creditSec}
${credits}

## License
${license}`

    fs.writeFile('README.md', writeREADME, err => {
        if (err) {
            throw err;
        }
    });
 }

async function wantLicense(){
    await inquirer.prompt({type:'list', message: 'Which license would you like to add?', choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'], name: 'license'})
    .then(ans=>{
        function buildLicense(text, url){
            license = 
`The files in this repository are covered by the [${text}](${url}).`
        }
        if (ans.license === 'GNU AGPLv3'){
            buildLicense('GNU AGPLv3', 'https://choosealicense.com/licenses/agpl-3.0/');
        } else if (ans.license === 'GNU GPLv3'){
            buildLicense('GNU GPLv3', 'https://choosealicense.com/licenses/gpl-3.0/');
        } else if (ans.license === 'GNU LGPLv3'){
            buildLicense('GNU LGPLv3', 'https://choosealicense.com/licenses/lgpl-3.0/');
        } else if (ans.license === 'Mozilla Public License 2.0'){
            buildLicense('Mozilla Public License 2.0', 'https://choosealicense.com/licenses/mpl-2.0/');
        } else if (ans.license === 'Apache License 2.0'){
            buildLicense('Apache License 2.0', 'https://choosealicense.com/licenses/apache-2.0/');
        } else if (ans.license === 'MIT License'){
            buildLicense('MIT License', 'https://choosealicense.com/licenses/mit/');
        } else if (ans.license === 'Boost Software License 1.0'){
            buildLicense('Boost Software License 1.0', 'https://choosealicense.com/licenses/bsl-1.0/');
        } else {
            buildLicense('The Unlicense', 'https://choosealicense.com/licenses/unlicense/');
        } 
    })
    writeFile();
}

async function getCredits(){
    const creditAnswer = await inquirer.prompt({type: 'confirm', message: 'Did you work with anyone else or use additional \n resources in this project?', name: 'credit', default: false});
    if(creditAnswer.credit === true){
        let entries = 1;
        inquirer.prompt(creditsQuestions).then(ans=>{
            funct.buildCredit(ans, credits)
            async function getNextCredit(){
                let wantAnother;
                for(let i=0; i<10; i++){
                    console.log(`You have entered ${entries} credits.`);
                    entries++;
                    await inquirer.prompt(creditsQuestions).then(newAns => {
                        wantAnother = newAns.credit.additional;
                        funct.buildCredit(newAns, credits);
                    })
                    if (wantAnother === false){
                        credits = credits.join('');
                        wantLicense();
                        return
                    }
                } 
            }
            if(ans.credit.additional === true){
                getNextCredit();
            }else {wantLicense()}
        })
    } else {
        creditSec = '';
        credits = '';
        creditLT = '';
        wantLicense()}
    
}

async function buildVideoLink(){
    await inquirer.prompt(videoQuestions).then(ans =>{
        if(ans.videoLink === ''){
            console.log('You didn\'t add your link. Please add it to the finished file inside the parentheses.');
            videoSec = `Here is a [video walkthrough](PUTYOURLINKHERE).`;
        }
        videoSec = `Here is a [video walkthrough](${ans.videoLink}).`
    });
    getCredits();
}

async function wantVideo(){
    const vidAnswer = await inquirer.prompt({type: 'confirm', message: 'Would you like to add a video walkthrough?', name: 'wantVid', default: false});
    if(vidAnswer.wantVid === true){
        buildVideoLink();
    } else {
        videoSec = '';
        getCredits()
    }
}

 function buildInst(instAns){
    if (instAns.wantSS === false){
        const newInst  = new funct.InstructionNoImg(instNum, instAns.nextInst, instAns.wantSS)
        instructions.push(newInst);
        return instNum++
    }
    if (instAns.wantSS === true){
        const newInst  = new funct.InstructionWImg(instNum, instAns.nextInst, instAns.wantSS, instAns.image.how, instAns.image.src, instAns.image.alt, instAns.image.imgTitle);
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
        })
        if (wantAnother===false){
            funct.displayInst(instructions, instLIs);
            instForUse = instLIs.join('');
            wantVideo();
            break
        };
    }
}

async function getInst(){
    await inquirer.prompt ({type: 'input', message: 'We will now collect the instructions to use your program. \n This will return an ordered list. Press enter to begin.', name: 'useInst1'}).then(ans =>{
        inquirer.prompt(instQuestions).then(instAns => {
            buildInst(instAns);
            if (instAns.wantNextInst === true){
                getNextInst();
            } else {
                funct.displayInst(instructions, instLIs);
                instForUse = instLIs.join('');
                wantVideo();
                return}
        });
    })
}

function startAsking(){
    inquirer
        .prompt(questions).then(ans => {
        if(ans.progNeeded !== false){
            funct.generateList(ans.progNeeded.items, neededProgs);
            neededProgs = neededProgs.join('');
        } else {neededProgs = 'none'}
        
        if(ans.neededAssets !== false){
            funct.generateList(ans.neededAssets.items, assetsNeeded);
            assetsNeeded = assetsNeeded.join('');
        } else {assetsNeeded = 'none'}

        answer = ans;
        title = ans.title;
        desc = ans.desc;
        problem = ans.problem;
        getInst()
    })
}

 startAsking()


