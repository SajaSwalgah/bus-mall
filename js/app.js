

'use strict';

var leftImage = null;
var rightImage = null;
var centeredImage = null;


function Products(head, src) {

    this.head = head;
    this.src = src;
    this.clickCounter = 0;
    this.viewsCounter = 0;
    Products.all.push(this);
}
Products.rounds = 0
var numberOfRounds = 25;
Products.all = [];
Products.appeared = [];


//my products
new Products('Space Bags', 'img/bag.jpg');
new Products('Banan Cutter', 'img/banana.jpg');
new Products('Mobile Holder', 'img/bathroom.jpg');
new Products('Strange Boots', 'img/boots.jpg');
new Products('Breakfast Maker', 'img/breakfast.jpg');
new Products('Bubble Gum', 'img/bubblegum.jpg');
new Products('Chair With a Tumor', 'img/chair.jpg');
new Products('Green Devil', 'img/cthulhu.jpg');
new Products('Duck Face for your Dog', 'img/dog-duck.jpg');
new Products('Dragon Meat', 'img/dragon.jpg');
new Products('Pen Collection', 'img/pen.jpg');
new Products('Pet Sweep', 'img/pet-sweep.jpg');
new Products('Unique Scissors', 'img/scissors.jpg');
new Products('Baby Shark do do do', 'img/shark.jpg');
new Products('Baby Sweep', 'img/sweep.png');
new Products('Unique Blanket', 'img/tauntaun.jpg');
new Products('Unicorn Meat', 'img/unicorn.jpg');
new Products('Tail USB', 'img/usb.gif');
new Products('Water Can', 'img/water-can.jpg');
new Products('Wine Glass', 'img/wine-glass.jpg');

//IDs
Products.leftImage = document.getElementById('leftimg');
Products.rightImage = document.getElementById('rightimg');
Products.centeredImage = document.getElementById('centerimg');

console.log('Products.all: ', Products.all);



//render the projects on the screen
function allProducts() {


    var leftImageItem = document.getElementById('leftimg');
    leftImageItem.setAttribute('src', leftImage.src);
    var leftHead = document.getElementById('lefthead');
    leftHead.textContent = leftImage.head;
    
    var rightImageItem = document.getElementById('rightimg');
    rightImageItem.setAttribute('src', rightImage.src);
    var rightHead = document.getElementById('righthead');
    rightHead.textContent = rightImage.head;

    var centerdImageItem = document.getElementById('centerimg');
    centerdImageItem.setAttribute('src', centeredImage.src);
    var centeredHead = document.getElementById('centerhead');
    centeredHead.textContent = centeredImage.head;



    //How many time each product appear
    leftImage.viewsCounter++;
    rightImage.viewsCounter++;
    centeredImage.viewsCounter++;


}

//Select randim product
function selection() {
    var leftrandom = Math.floor(Math.random() * Products.all.length);
    var rightrandom = Math.floor(Math.random() * Products.all.length);
    var centerrandom = Math.floor(Math.random() * Products.all.length);


    //No repeated products
    while (Products.appeared.includes(leftrandom) || Products.appeared.includes(centerrandom) || Products.appeared.includes(rightrandom) || leftrandom === centerrandom || centerrandom == rightrandom || rightrandom == leftrandom) {
        var leftrandom = Math.floor(Math.random() * Products.all.length);
        var rightrandom = Math.floor(Math.random() * Products.all.length);
        var centerrandom = Math.floor(Math.random() * Products.all.length);
    }

    //Display products
    leftImage = Products.all[leftrandom];
    rightImage = Products.all[rightrandom];
    centeredImage = Products.all[centerrandom];
}



//Event listner
function clicker(event) {
    var clickedId = event.target.id;

    var clickedProduct;
    if (clickedId === "leftimg") {
        clickedProduct = leftImage;
    } else if (clickedId === "centerimg") {
        clickedProduct = centeredImage;
    } else if (clickedId === "rightimg") {
        clickedProduct = rightImage;
    } else {
        alert("click on the products");
    }

    //How many time each product has clicked
    if (clickedProduct) {

        clickedProduct.clickCounter++;
        Products.rounds++
        selection();
        allProducts();

        // remove the event listener
        if (Products.rounds === 25) {

            alert('You\'ve Consumed Your Clicks');

            document.getElementById("container").removeEventListener('click', clicker);
            finalList();

        } else {
            allProducts();
        }
    }

    console.log('rounds: ', Products.rounds);
    console.log('clickedProduct: ', clickedProduct);
    console.log('clickCounter: ', clickedProduct.clickCounter);


}


document.getElementById("container").addEventListener('click', clicker);
selection();
allProducts();



selection();
allProducts();

function finalList(){

    var list = document.getElementById("list");
    var li = document.createElement('li')
    list.appendChild(li)
    for (var i = 0; i < Products.all.length; i++) {
        var pro = Products.all[i]
        li = document.createElement('li');
        list.appendChild(li);
        li.textContent=  pro.head + " had " + pro.clickCounter + " votes and was shown " + pro.viewsCounter + " times.";

        
        
    }
 
}

