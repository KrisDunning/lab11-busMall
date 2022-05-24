'use strict'

//++++++++++++++Global Variables++++++++++++++//
let productArray=[];
let votingCountTotal=25;
let imageSection=document.getElementById('img-section');
let imageOne=document.getElementById('img-one');
let imageTwo=document.getElementById('img-two');
let imageThree=document.getElementById('img-three');
let resultsSection=document.getElementById('results-section');
let resultsBtn=document.getElementById('results-btn');
let resultsList=document.getElementById('results-list');

//+++++++++++Object Contructor++++++++++++++++//
function Product(productName,imageFileExtension='jpg'){
  this.name=productName;
  this.image=`/img/${productName}.${imageFileExtension}`;
  this.views=0;
  this.votes=0;
  productArray.push(this);
}

//+++++++++Initialize Products++++++++++++++++//
function createProducts(){
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep','png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}

//+++++++++++++ Choose Products to Display (3) +++++++++++++++//
function chooseProductsToRender(){
  let indexNumber=[];
  let productsToDisplay=[];
  indexNumber[0]=Math.floor(Math.random()*productArray.length);
  productsToDisplay[0]=productArray[indexNumber[0]];
  do {
    indexNumber[1]=Math.floor(Math.random()*productArray.length);
} while (indexNumber[1]===indexNumber[0]);
  productsToDisplay[1]=productArray[indexNumber[1]];
  do {
    indexNumber[2]= Math.floor(Math.random()*productArray.length);
} while (indexNumber[2]=== indexNumber[0] || indexNumber[2]=== indexNumber[1]);
productsToDisplay[2]=productArray[indexNumber[2]];
return productsToDisplay;
}

//++++++++++++++ Render Images of Products +++++++++++++//
function renderProducts(productsToRender){
  productsToRender.forEach(element => {element.views++});
  imageOne.src=productsToRender[0].image;
  imageOne.alt=productsToRender[0].name;
  imageTwo.src=productsToRender[1].image;
  imageTwo.alt=productsToRender[1].name;
  imageThree.src=productsToRender[2].image;
  imageThree.alt=productsToRender[0].name;
}

//+++++++++++ Voting Complete +++++++++++++++++//
function votingComplete(){
  imageSection.removeEventListener('click',handleClick);
  resultsBtn.addEventListener('click',handleResults);
  imageSection.style.display='none';
  resultsSection.style.display='block';

}


//++++++++++++ Click Handlers +++++++++++++++++++++//

function handleClick(event){
  let imgClicked= event.target.alt;
  for(let i=0;i<productArray.length;i++){
    if(imgClicked===productArray[i].name){
      productArray[i].votes++
    }
  }
  votingCountTotal--;
  if(votingCountTotal>0){
    let products=chooseProductsToRender()
    renderProducts(products);
  }else {
    votingComplete();
  }
}

function handleResults(event){
  productArray.forEach(element => {
    let liElem=document.createElement('li');
    liElem.textContent=`${element.name} was viewed ${element.views} and voted for ${element.votes}`;
    resultsList.appendChild(liElem);
  });
  resultsBtn.removeEventListener('click',handleResults);
}

//++++++++++++++++++ Event Listeners +++++++++++++++++//
imageSection.addEventListener('click',handleClick);



//+++++++++++++++ Call starting page functions ++++++++++++++++//
resultsSection.style.display='none';
createProducts();
let products=chooseProductsToRender();
renderProducts(products);
