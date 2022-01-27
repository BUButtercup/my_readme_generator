// const index = require('./index');

const inquirer = require("inquirer");

function generateList(ans, arr){
    for(let i=0; i<ans.length; i++){
        let listItem = ans[i].trim();
        const newLI = `<li>${listItem}</li>`;
        arr.push(newLI);
    }
    // console.log(arr);
    return arr
}

const InstructionNoImg = function(num, str, Bool){
    this.index = num, 
    this.text = str;
    this.wantSS = Bool;
}

const InstructionWImg = function(num, str, Bool, how, src, alt, title){
    this.index = num, 
    this.text = str;
    this.wantSS = Bool;
    this.how = how;
    this.src = src;
    this.alt = alt;
    this.title = title;
}

function buildCredit(ans, toArr){
    let credit = ans.credit
    if(credit.type === 'collaborator'){
        const newPersCredit = `
- [@${credit.name}](${credit.link}): \n
  - ${credit.cont}\n`
        toArr.push(newPersCredit);
    } else {
        const newTechCredit = `
- [${credit.name}](${credit.link})\n
  -${credit.cont}\n`;
        toArr.push(newTechCredit);
    }
}

function buildImage(alt, src, title){
    const imgTag = `<img src="${src}" alt="${alt}" title="${title}" width="200px">`
    return imgTag
}

// function collectInstructions()
function displayInst(fromArr, toArr){
    for(let i=0; i<fromArr.length; i++){
        if(fromArr[i].wantSS === false){
            let listItem = fromArr[i].text;
            const newLI = `<li>${listItem}</li>`;
            toArr.push(newLI);
        } else if (fromArr[i].wantSS === true){
            let listItem = fromArr[i].text;
            if(fromArr[i].how === 'insert image into README'){
                const newLI = `<li>${listItem}</li>${buildImage(fromArr[i].alt,fromArr[i].src, fromArr[i].title)}`;
                toArr.push(newLI);
            } else {
                const newLI = `<li>${listItem}: <a href="${fromArr[i].src}">${fromArr[i].title}</a></li>`;
                toArr.push(newLI);
            }
        }
    }
}


module.exports = {
    generateList,
    InstructionNoImg,
    InstructionWImg,
    buildCredit,
    buildImage,
    displayInst
};