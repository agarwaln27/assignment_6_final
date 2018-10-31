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
        var price = 3;
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
            uid: 'uid_' + Math.floor(Math.random() * 10e8)
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
    //renderCartPrice();
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
        row.setAttribute("data-roll-uid", data_saved[i].uid);
        var deleteCell = row.insertCell(0);
        var imageCell = row.insertCell(1);
        var nameCell = row.insertCell(2);
        var quantityCell = row.insertCell(3);
        var glazingCell = row.insertCell(4);
        var priceCell = row.insertCell(5);

        var deleteButton = document.createElement('deleteButton');
        deleteButton.text = "X";
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.setAttribute('data-uid', data_saved[i].uid);
        deleteCell.appendChild(deleteButton);
        deleteCell.style.width="5%";

        deleteCell.innerHTML = `<button data-uid="${data_saved[i].uid}" class="delete-btn">x</button>`;
        imageCell.innerHTML = `<img class="cart-item-img" src="${roll.image}" />`;
        nameCell.innerHTML = roll.name;
        quantityCell.innerHTML = roll.quantity;
        glazingCell.innerHTML = roll.glazing;
        priceCell.innerHTML = `$${roll.price * parseInt(roll.quantity)}`;
    }
    $('.delete-btn').click(function(e){
        var uid = $(this).attr('data-uid');
        if (uid) {
             var cart = ReadFromStorage();
             cart = cart.filter(x => x.uid !== uid);
             localStorage.setItem('indexBun', JSON.stringify(cart));
             $(`[data-roll-uid="${uid}"]`).remove();
             renderCartPrice();
        }
    });
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
}

var quantityBuns = document.getElementById('quantity');
  var costDiv = document.getElementById('price');
  quantityBuns && (quantityBuns.onchange = function() {
    var value = quantityBuns.value;
    console.log('Quantity changed');
    console.log(value);

    var newCost = value * 3.00;
    var newCostString = '$' + newCost;

    price.innerHTML = newCostString;
  })

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

function renderCartPrice(){
    var totalCart = 0;
    var badge = document.getElementById('cart-badge');
    if (badge) {
        badge.classList.remove('active');
        badge.innerHTML = 0;
    }
    var cart = ReadFromStorage();
    if (cart && cart.length > 0) {
      if (badge) {
        badge.classList.add('active');
        badge.innerHTML = cart.length;
      }
    }
    /*for (var i=0; i < cart.length; i++) {
      var item = cart[i];
      console.log(item)
      var amount = roll.quantity;
      var price = roll.price;
      totalCart = totalCart + price;
    }
      var cartPrice = document.getElementById('total-price');
      var finalPrice = 'Subtotal: ' + '$' + totalCart + '.00';

      cartPrice.innerHTML = finalPrice;
      */
  };

addRowToCart();
renderCartPrice();
});