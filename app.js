'use strict'

//++++++++++++++Global Variables++++++++++++++//
let productArray = [];
let votingCountTotal = 25;
let imageSection = document.getElementById('img-section');
let imageOne = document.getElementById('img-one');
let imageTwo = document.getElementById('img-two');
let imageThree = document.getElementById('img-three');;
let resultsBtn = document.getElementById('results-btn');
let resultsList = document.getElementById('results-list');

//+++++++++++Object Contructor++++++++++++++++//
function Product(productName, imageFileExtension = 'jpg') {
  this.name = productName;
  this.image = `img/${productName}.${imageFileExtension}`;
  this.views = 0;
  this.votes = 0;
  productArray.push(this);
}

//+++++++++Initialize Products++++++++++++++++//
function createProducts() {
let retrievedProducts= localStorage.getItem('products');
let parsedProducts=JSON.parse(retrievedProducts);

if(retrievedProducts){
      productArray=parsedProducts;
}else{
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
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
  }
}

//++++++++ Random Number Gen. from 0 to max value passed ++++++++++++//
function rndNumber(max) {
  return Math.floor(Math.random() * max);
}

//+++++++++++++ Choose Unique Index (3) +++++++++++++++//
function chooseUniqueIndex() {
  let currentThreeIndex = [];
  let possIndex = [];
  let splicedArray=[];
  for (let i = 0; i < productArray.length; i++) {
    possIndex.push(i);
    
  }
  while (currentThreeIndex.length < 3) {
    splicedArray = possIndex.splice(rndNumber(possIndex.length), 1);;
    currentThreeIndex.push(splicedArray[0]);
  }
  return currentThreeIndex;
}

//+++++++++++++++++++++ Set Products To Render ++++++++++++++//

function setProductsToRender(index) {
  let products = []
  index.forEach(i => {
    products.push(productArray[i]);
  });
  return products;
}


//++++++++++++++ Render Images of Products +++++++++++++//
function renderProducts(productsToRender) {
  
  productsToRender.forEach(prod=> {prod.views++});
  imageOne.src = productsToRender[0].image;
  imageOne.alt = productsToRender[0].name;
  imageTwo.src = productsToRender[1].image;
  imageTwo.alt = productsToRender[1].name;
  imageThree.src = productsToRender[2].image;
  imageThree.alt = productsToRender[2].name;
}

//+++++++++++ Voting Complete +++++++++++++++++//
function votingComplete() {
  imageSection.removeEventListener('click', handleClick);
  resultsBtn.addEventListener('click', renderChart);
  imageSection.style.display = 'none';
  let stringifiedProducts= JSON.stringify(productArray);
  localStorage.setItem('products',stringifiedProducts);
}

//+++++++++++++ Chart.js Chart Creation +++++++++++++++//
function renderChart(){
  let voteResults=[];
  let viewResults=[];
  let productNames=[];
  for(let i=0;i<productArray.length;i++)
  {
    voteResults.push(productArray[i].votes);
    viewResults.push(productArray[i].views);
    productNames.push(productArray[i].name);
  } 

const ctx = document.getElementById('votesChart').getContext('2d');
const votesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productNames,
        datasets: [{
            label: '# of Votes',
            data: voteResults,
            backgroundColor: [
                '#265656',
                '#265656',
                '#265656',
                '#265656',
                '#265656',
                '#265656'
            ],
            borderColor: [
                '#D5555D',
                '#D5555D',
                '#D5555D',
                '#D5555D',
                '#D5555D',
                '#D5555D'
            ],
            borderWidth: 1
        },{
          label: '# of Views',
          data: viewResults,
          backgroundColor: [
            '#D5555D',
            '#D5555D',
            '#D5555D',
            '#D5555D',
            '#D5555D',
            '#D5555D'
          ],
          borderColor: [
            '#265656',
            '#265656',
            '#265656',
            '#265656',
            '#265656',
            '#265656'
          ],
          borderWidth: 1
      }]
  
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
//++++++++++++ Click Handlers +++++++++++++++++++++//

function handleClick(event) {
  let imgClicked = event.target.alt;
  let keepLoopingFlag = false;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++
    }
  }
  votingCountTotal--;
  if (votingCountTotal > 0) {
    do {
      keepLoopingFlag = false;
      uniqueThreeIndex = chooseUniqueIndex();

      for (let i = 0; i < uniqueThreeIndex.length; i++) {
        if (prevThreeIndex.includes(uniqueThreeIndex[i])) {
          keepLoopingFlag = true;
        }
      };
    } while (keepLoopingFlag)
    prevThreeIndex = uniqueThreeIndex;
    let products = setProductsToRender(uniqueThreeIndex)
    renderProducts(products);
  } else {
    votingComplete();
  }
}

//++++++++++++++++++ Event Listeners +++++++++++++++++//
imageSection.addEventListener('click', handleClick);



//+++++++++++++++ Call starting page functions ++++++++++++++++//
createProducts();
let uniqueThreeIndex = chooseUniqueIndex();
let prevThreeIndex = uniqueThreeIndex;
let products = setProductsToRender(uniqueThreeIndex);
renderProducts(products);
