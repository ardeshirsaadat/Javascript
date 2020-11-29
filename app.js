
// global variables
let dinoObjectsArrays=[];
let gridElement = document.getElementById('grid');
let formElement = document.getElementById('dino-compare'); 
  
 // Create Dino Constructor
function DinoConstructor(species,weight,height,diet,where,when,fact){
    this.species= species;
    this.weight= weight;
    this.height= height;
    this.diet= diet.charAt(0).toUpperCase()+diet.slice(1);
    this.where= where;
    this.when= when;
    this.fact= fact;
}


    // Create Dino Objects
fetch('./dino.json')
.then(data=>{return data.json()})
.then(data=>{
    dinoObjectsArrays = data.Dinos.map(function(dino){
        return new DinoConstructor(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.where,dino.when,dino.fact);
        }
    )
})

    // Create Human Object
function humanObject(name,height,weight,diet){
    this.species = 'human';
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    }
    // validate form inputs function
function validateInput(input){
    if(input){
        return input
    }else{
        alert('Form is Not Correctly filled out')
        throw new Error('Form is Not Correctly filled out')
    }
}    
    // Use IIFE to get human data from form
let humanDataObject = (function(){
    function getName(){
        validateInput(document.getElementById('name').value)
    }
    function getHeight(){
        validateInput(document.getElementById('feet').value);
    }
    function getWeight(){
        validateInput(document.getElementById('weight').value);
    }
    function getDiet(){
        validateInput(document.getElementById('diet').value);
    }
    return {
        name:getName,
        height:getHeight,
        weight:getWeight,
        diet:getDiet
    }

})();

// Generate facts randomley
function randomGenerator(object,humanObject){
    if (object.species == 'human'){
        return '';
    }
    else if (object.species=='Pigeon'){
        return 'All birds are dinasours';
    }
    else{
        let randomNum = Math.floor((Math.random()*6))
        switch (randomNum) {
            case 0:
                return object.where;
            case 1:
                return object.when;
            case 2:
                return object.fact;
            case 3 :
                return object.compareWeight(humanObject);
            case 4:
                return object.compareHeight(humanObject);     
            case 5:
                return object.compareDiet(humanObject);
          }
    }
}

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
function compareWeights(humanObject){
    if (this.weight>humanObject.weight){
        return 'I am heavier than you';
    }
    else if (this.weight<humanObject.weight){
        return 'I am lighter than you'; 
    }
    else{
        return 'We are the same weight woww!!';
    }
}
DinoConstructor.prototype.compareWeight = compareWeights;
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
function compareheights(humanObject){
    if (this.height>humanObject.height){
        return 'I am taller';
    }
    else if (this.height<humanObject.height){
        return 'I am shorter';
    }
    else{
        return 'We are the same height';
    }
}
DinoConstructor.prototype.compareHeight = compareheights;
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiets(humanObject){
    if (this.diet == humanObject.diet){
        return 'We both are on the same  diet';
    }
    else{
        return 'We have two different diets';
    }
}
DinoConstructor.prototype.compareDiet = compareDiets;
    // Generate Tiles for each Dino in Array
function tileproducer(dinoObjectsArrays,humanObject){
    dinoObjectsArrays.forEach(function(object){
        let newDivElement = document.createElement('div');
        let imgElement = document.createElement('IMG');
        let pElement = document.createElement('P');
        let hElement = document.createElement('H3');
        imgElement.setAttribute('src',`/images/${object.species.toLowerCase()}.png`);
        pElement.innerHTML = randomGenerator(object,humanObject);
        hElement.innerHTML = object.species;
        newDivElement.append(hElement,pElement,imgElement) 
        newDivElement.setAttribute('class','grid-item');
        gridElement.appendChild(newDivElement);

    })
    formElement.style.display= 'none';
} 

// On button click, prepare and display infographic
let btn = document.getElementById('btn');
btn.addEventListener('click',function(){
    let human = new humanObject(humanDataObject.name(),humanDataObject.height(),humanDataObject.weight(),humanDataObject.diet());
    dinoObjectsArrays.splice(4,0,human);
    tileproducer(dinoObjectsArrays,human);
})
