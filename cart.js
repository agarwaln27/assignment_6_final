/** var I need**/
$(document).ready(function(){
console.log("check");
var indexBun = 0;

var arrayImgsrc=[""]

function addToCart() {
    console.log('addToCart called');
    var quantityElement = document.getElementById('quantity');
    var glazingElement = document.getElementById('glazing');
    if (quantityElement && glazingElement) {
        var name = $("#bunName").attr("data-name");
        var img = $("#bunpic");
        var quantity = quantityElement.value;
        var glazing = glazingElement.value;
        var price = $("#price").attr("data-price");
        var image = null;
        if (img) {
            image = $(img).attr('src');
        }
        var roll = {
            name: name,
            image: image,
            quantity: quantity,
            glazing: glazing,
            price: price,
        };
        console.log(roll);
        WriteToStorage(roll);
    }
}

//add document ready, define roll as get local storage get item

function WriteToStorage(item){
    var currentStorage = ReadFromStorage();
    currentStorage.push(item);
    localStorage.setItem('indexBun', JSON.stringify(currentStorage));
    indexBun++;
}

function ReadFromStorage() {
    var storageValue = localStorage.getItem('indexBun');
    if (storageValue) {
        return JSON.parse(storageValue);
    }
    return [];
}

window.addEventListener('load', function () {
    var btn = document.getElementById('cartButton');
    if (btn) {
        btn.addEventListener('click', addToCart);
    }
    var cart = ReadFromStorage();
    console.log(cart);
    if (cart.length > 0) {
        console.log('THERE IS STUFF IN CART');
    } else {
        console.log('NO STUFF FOUND');
    }
})

function addRowToCart() {

    var data_saved= ReadFromStorage();
    console.log(data_saved);

    var table = document.getElementById("myTable");
    if(table){
    for (var i = data_saved.length - 1; i >= 0; i--) {
        var roll = data_saved[i];
        var row = table.insertRow(-1);
        var deleteCell = row.insertCell(0);
        var imageCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var quantityCell = row.insertCell(3);
        var glazingCell = row.insertCell(4);
        var priceCell = row.insertCell(5);

        var deleteButton = document.createElement('deleteButton');
        deleteButton.text = "X";
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute("onclick", deleteRow(this));
        deleteCell.appendChild(deleteButton);
        deleteCell.style.width="5%";

        deleteCell.innerHTML = `<button>x</button>`;
        imageCell.innerHTML = `<img class="cart-item-img" src="${roll.image}" />`;
        nameCell.innerHTML = roll.name;
        quantityCell.innerHTML = roll.quantity;
        glazingCell.innerHTML = roll.glazing;
        priceCell.innerHTML = roll.price;
    }
}
}

function displayResult()
{
    var firstRow=document.getElementById("myTable").rows[0];
    var x=firstRow.insertCell(-1);
    x.innerHTML="<img src='bunpic'/>";
}

function deleteRow(r) {
    console.log('deleteRow');
    // var i = r.parentNode.parentNode.rowIndex;
    // document.getElementById("myTable").deleteRow(i);
}

function priceChange(){
  var quantityBuns = document.getElementByIdId('quantity');
  var costDiv = document.getElementById('price');
  quantityBuns.onchange = function() {
    var value = quantityBuns.value;
    console.log('Quantity changed');
    console.log(value);

    var newCost = value * 3.00;
    var newCostString = '$' + newCost;

    price.innerHTML = newCostString;
  }
}

var glazeSelect = document.getElementById("glazing");
if (glazeSelect) {
    glazeSelect.onchange = function(event) {
    // console.log(arguments);
    // console.log(event);
    var select = event.target;
    // console.log(select.value);
    var img = document.getElementById("bunpic");
    var folderName = $("#bunpic").attr("data-folder");
    var bunNameElement = document.getElementById('bunpic');
    if (bunNameElement) {
        folderName = bunNameElement.getAttribute('data-folder');
    }
    console.log(folderName);
    const src = `assets/images/${folderName}/${select.value}.png`;
    img.src = src;
}
}

addRowToCart();
});