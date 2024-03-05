const contentLocation = document.querySelector('#content');
const saveBtn = document.querySelector('#saveData');
saveBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("Saved Data btn clicked!");
    saveData();
});
const cancelBtn = document.querySelector('#cancelChange');
cancelBtn.addEventListener('click', function(event){
    contentLocation.innerHTML = '';
    event.preventDefault();
    console.log("Cancel btn clicked!");
    recoveredSkills.forEach(element => {
        contentLocation.append(skillElementGenerator(element));
    })
});
const resetSkillsBtn = document.querySelector('#resetSkills');
resetSkillsBtn.addEventListener('click', ()=>{
    contentLocation.innerHTML = '';
    skills.forEach(element => {
        contentLocation.append(skillElementGenerator(element));
    })
})
let recoveredSkills;
let skills = [];

function Skill(name){
    this.name = name;
    this.score = 1;
    this.farm1 = false;
    this.farm2 = false;
    this.farm3 = false;
}

let skillNames = [
    'Archaeology',
    'Attack',
    'Cooking',
    'Crafting',
    'Defence',
    'Dungeoneering',
    'Farming',
    'Fishing',
    'Fletching',
    'Herblore',
    'Hunting',
    'Magic',
    'Mining',
    'Prayer',
    'Ranged',
    'Runecrafting',
    'Slayer',
    'Smithing',
    'Summoning',
    'Thieving',
    'Woodcutting'
];

skillNames.forEach(element => {
    skills.push(new Skill(element));
})

if (localStorage.getItem('skills')){
    console.log("Si hay datos");
    recoveredSkills = [...JSON.parse(localStorage.getItem('skills'))]
} else {
    console.log("No hay datos");
    localStorage.setItem("skills", JSON.stringify(skills));
    recoveredSkills = [...skills];
}

function skillElementGenerator (skill){
    //console.log(`${skill.name}: ${skill.score}`);
    const skillWrapper = document.createElement('div');
    skillWrapper.classList.add('skillWraper');
    const skillLabel = document.createElement('label');
    const skillInput = document.createElement('input');
    const skillNameLowercase = skill.name.toLowerCase();
    const farmingWrapper = document.createElement('div');
    let farm1 = document.createElement('input');
    farm1.type = 'checkbox';
    farm1.id = skillNameLowercase + '-farm1';
    farm1.checked = skill.farm1;
    farm1.classList.add('farmingCheckbox');

    let farm2 = document.createElement('input');
    farm2.type = 'checkbox';
    farm2.id = skillNameLowercase + '-farm2';
    farm2.checked = skill.farm2;
    farm2.classList.add('farmingCheckbox');
    
    let farm3 = document.createElement('input');
    farm3.type = 'checkbox';
    farm3.id = skillNameLowercase + '-farm3';
    farm3.checked = skill.farm3;
    farm3.classList.add('farmingCheckbox');

    farmingWrapper.append(farm1, farm2, farm3);

    skillLabel.htmlFor = skillNameLowercase;
    skillLabel.textContent = skill.name;
    
    skillInput.type = 'number';
    skillInput.name = skillNameLowercase;
    skillInput.id = skillNameLowercase;
    skillInput.value = skill.score;

    skillWrapper.append(skillLabel, skillInput, farmingWrapper);

    return skillWrapper;
};

recoveredSkills.forEach(element => {
    contentLocation.append(skillElementGenerator(element));
})

function saveData(){
    recoveredSkills.forEach(element=>{
        element.score = document.querySelector(`#${element.name.toLowerCase()}`).value;
        element.farm1 = document.querySelector(`#${element.name.toLowerCase()}-farm1`).checked;
        element.farm2 = document.querySelector(`#${element.name.toLowerCase()}-farm2`).checked;
        element.farm3 = document.querySelector(`#${element.name.toLowerCase()}-farm3`).checked;
    })
    localStorage.setItem("skills", JSON.stringify(recoveredSkills));
}


