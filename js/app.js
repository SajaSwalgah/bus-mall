

'use strict';

var leftImage = null;
var rightImage = null;
var centeredImage = null;


function Product(head, src) {

    this.head = head;
    this.src = src;
    this.clickCounter = 0;
    this.viewsCounter = 0;
    Product.all.push(this);
    // Products.items.push(this);
}
Product.rounds = 0
var numberOfRounds = 25;
Product.all = [];
Product.appeared = [];


//my products
new Product('Space Bags', 'img/bag.jpg');
new Product('Banan Cutter', 'img/banana.jpg');
new Product('Mobile Holder', 'img/bathroom.jpg');
new Product('Strange Boots', 'img/boots.jpg');
new Product('Breakfast Maker', 'img/breakfast.jpg');
new Product('Bubble Gum', 'img/bubblegum.jpg');
new Product('Chair With a Tumor', 'img/chair.jpg');
new Product('Green Devil', 'img/cthulhu.jpg');
new Product('Duck Face for your Dog', 'img/dog-duck.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');
new Product('Pen Collection', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Unique Scissors', 'img/scissors.jpg');
new Product('Baby Shark do do do', 'img/shark.jpg');
new Product('Baby Sweep', 'img/sweep.png');
new Product('Unique Blanket', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('Tail USB', 'img/usb.gif');
new Product('Water Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

//IDs
Product.leftImage = document.getElementById('leftimg');
Product.rightImage = document.getElementById('rightimg');
Product.centeredImage = document.getElementById('centerimg');

// console.log('Products.all: ', Products.all);



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

//Select random product
function selection() {
    var leftrandom = Math.floor(Math.random() * Product.all.length);
    var rightrandom = Math.floor(Math.random() * Product.all.length);
    var centerrandom = Math.floor(Math.random() * Product.all.length);


    //No repeated products
    while (Product.appeared.includes(leftrandom) || Product.appeared.includes(centerrandom) || Product.appeared.includes(rightrandom) || leftrandom === centerrandom || centerrandom == rightrandom || rightrandom == leftrandom) {
        var leftrandom = Math.floor(Math.random() * Product.all.length);
        var rightrandom = Math.floor(Math.random() * Product.all.length);
        var centerrandom = Math.floor(Math.random() * Product.all.length);
    }

    //Display products
    leftImage = Product.all[leftrandom];
    rightImage = Product.all[rightrandom];
    centeredImage = Product.all[centerrandom];
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
        Product.rounds++
        selection();
        allProducts();

        // remove the event listener
        if (Product.rounds === numberOfRounds) {

            alert('You\'ve Consumed Your Clicks');

            document.getElementById("container").removeEventListener('click', clicker);
            finalList();
            myChart()

            // Set item

            var productsString = JSON.stringify(Product.all);
            localStorage.setItem('items', productsString);

            // updateProducts();
            // getProducts();
            selection();
            allProducts();

        } else {
            allProducts();
        }
    }

    console.log('rounds: ', Product.rounds);
    console.log('clickedProduct: ', clickedProduct);
    console.log('clickCounter: ', clickedProduct.clickCounter);


}


document.getElementById("container").addEventListener('click', clicker);
getProducts()
selection();
allProducts();





//Storage function

function getProducts() {
    var goods = localStorage.getItem('items');


    if (goods) {
        var myProducts = JSON.parse(goods);
        var instanceArray = [];
        Product.all = instanceArray;
        for (var i = 0; i < myProducts.length; i++) {
            var productObject = myProducts[i];
            var newInstance = new Product(productObject.head, productObject.src);
            newInstance.clickCounter = productObject.clickCounter;
            newInstance.viewsCounter = productObject.viewsCounter;

        }

    }

}

//adding list

function finalList(){
    var list = document.getElementById("list");
    var li = document.createElement('li')
    list.appendChild(li)
    for (var i = 0; i < Product.all.length ; i++) {
        var pro = Product.all[i]
        li = document.createElement('li');
        list.appendChild(li);
        li.textContent=  pro.head + " had " + pro.clickCounter + " votes and was shown " + pro.viewsCounter + " times.";
    }
  
}
function myFunction() {
    document.getElementById("list").style.color = "red";
  }



//adding chart

function myChart() {
    var headArr = [];
    var clickArr = [];
    var viewArr = [];
    for (var i = 0; i < Product.all.length; i++) {
        var exact = Product.all[i];
        headArr.push(exact.title);
        headArr.push(exact.title);
        clickArr.push(exact.clickCounter);
        viewArr.push(exact.viewsCounter);

    }
    


    var ctx = document.getElementById('chart').getContext('2d');
    console.log('Chart : ', Chart);
    var chart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: ['Bag ', 'Banana ', 'Bathroom ', 'Boots ', 'Breakfast ', 'Bubblegum ', 'Chair ', 'Green Devil ', 'Dog-Duck ', 'Dragon ', 'Pen ', 'Pet-Sweep ', 'Scissors ', 'Shark ', 'Sweep ', 'Blanket ', 'Unicorn ', 'USB ', 'Water-Can ', 'Wine-Glass '],

            datasets: [
                {
                    label: 'How Many Each Product Clicked ',
                    backgroundColor: 'blue',
                    borderColor: 'yelow',
                    data: clickArr
                },
                {
                    label: 'How Many Each Product viewed ',
                    backgroundColor: 'red',
                    borderColor: 'blue',
                    data: viewArr
                }
            ]

        },

        options: {}
    });
}




























