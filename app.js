'use strict'

//++++++++++++++Global Variables++++++++++++++//
let productArray=[];
let votingCountTotal=25;




//+++++++++++Object Contructor++++++++++++++++//
function product(productName,imageFileExtension='jpg'){
  this.name=productName;
  this.image=`${productName}.${imageFileExtension}`;
  this.views=0;
  this.votes=0;
}

function createProduct(){
  new product('bag');
  new product('banana');
  new product('bathroom');
  new product('boots');
  new product('breakfast');
  new product('bubblegum');
  new product('chair');
  new product('cthulu');
  new product('dog-duck');
  new product('dragon');
  new product('pen');
  new product('pet-sweep');
  new product('scissors');
  new product('shark');
  new product('sweep','png');
  new product('tauntaun');
  new product('unicorn');
  new product('water-can');
  new product('wine-glass');


}
