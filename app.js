
// global variables
let dinoObjectsArrays=[]
let gridElement = document.getElementById('grid')
let formElement = document.getElementById('dino-compare') 
  
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
        return new DinoConstructor(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.where,dino.when,dino.fact)
        }
    )
})

    // Create Human Object
function humanObject(name,height,weight,diet){
    this.species = "human"
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
    
}
    // Use IIFE to get human data from form
let humanDataObject = (function(){
    function getName(){
        return document.getElementById('name').value
    }
    function getHeight(){
        return document.getElementById('feet').value
    }
    function getWeight(){
        return document.getElementById('weight').value
    }
    function getDiet(){
        return document.getElementById('diet').value
    }
    return {
        name:getName,
        height:getHeight,
        weight:getWeight,
        diet:getDiet
    }

})();


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
function compareWeights(humanObject){
    if (this.weight>humanObject.weight){
        return "I'm heavier than you"
    }
    else if (this.weight<humanObject.weight){
        return "I'm lighter than you" 
    }
    else{
        return "We're the same weight woww!!"
    }
}
DinoConstructor.prototype.compareWeight = compareWeights
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
function compareheights(humanObject){
    if (this.height>humanObject.height){
        return "I'm taller"
    }
    else if (this.height<humanObject.height){
        return "I'm shorter"
    }
    else{
        return "We're the same height"
    }
}
DinoConstructor.prototype.compareHeight = compareheights
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiets(humanObject){
    if (this.diet == humanObject.diet){
        return "We both are on the same  diet"
    }
    else{
        return "We have two different diets"
    }
}
DinoConstructor.prototype.compareDiet = compareDiets
    // Generate Tiles for each Dino in Array
function tileproducer(dinoObjectsArrays,humanObject){
    dinoObjectsArrays.forEach(function(object){
        let newDivElement = document.createElement('div')
        let imgElement = document.createElement('IMG')
        imgElement.setAttribute('src',`/images/${object.species.toLowerCase()}.png`)
        let pElement = document.createElement('P')
        pElement.innerHTML = randomGenerator(object,humanObject)
        let hElement = document.createElement('H3')
        hElement.innerHTML = object.species 
        newDivElement.appendChild(hElement)
        newDivElement.appendChild(pElement)
        newDivElement.appendChild(imgElement)
        newDivElement.setAttribute('class','grid-item')
        gridElement.appendChild(newDivElement)

    })
    formElement.style.display= 'none'
} 
        // Add tiles to DOM

    // Remove form from screen
// Generate facts randomley
function randomGenerator(object,humanObject){
    if (object.species == 'human'){
        return ""
    }
    else if (object.species=='Pigeon'){
        return "All birds are dinasours"
    }
    else{
        let randomNum = Math.floor((Math.random()*6))
        switch (randomNum) {
            case 0:
                return object.where
            case 1:
                return object.when
            case 2:
                return object.fact
            case 3 :
                return object.compareWeight(humanObject)
            case 4:
                return object.compareHeight(humanObject)     
            case 5:
                return object.compareDiet(humanObject)
          }
    }
}




// On button click, prepare and display infographic
let btn = document.getElementById('btn');
btn.addEventListener('click',function(){
    let human = new humanObject(humanDataObject.name(),humanDataObject.height(),humanDataObject.weight(),humanDataObject.diet())
    dinoObjectsArrays.splice(4,0,human)
    tileproducer(dinoObjectsArrays,human)
})
