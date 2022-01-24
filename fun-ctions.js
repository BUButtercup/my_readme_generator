function generateUList(ans, arr){
    for(let i=0; i<ans.length; i++){
        let listItem = ans[i].trim();
        const newLI = `- ${listItem}\n`;
        arr.push(newLI);
    }
    arr = arr.join('');
    console.log(arr);
}
function generateOList(ans, arr){
    for(let i=0; i<ans.length; i++){
        let listItem = ans[i].trim();
        let num = i+1
        const newLI = `${num}. ${listItem}\n`;
        arr.push(newLI);
    }
    arr = arr.join('');
    console.log(arr);
}



module.exports = {
    generateUList,
    generateOList,
};