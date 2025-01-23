var counter = 0
if (localStorage.getItem('counter')){
    counter = Number(localStorage.getItem('counter'))
}
else {
    localStorage.setItem('counter', counter)
}


function createProduct(card){
    counter += 1
    localStorage.setItem('counter', counter)
    let cardName = `card${counter}`
    card['count'] = counter
    card = JSON.stringify(card)
    localStorage.setItem(cardName, card)
}

function appendProducts(){
    let keys = Object.keys(localStorage).reverse().sort()
    for (let key of keys){
        if (key != 'counter'){
            let card = JSON.parse(localStorage.getItem(key))
            let products = document.querySelector('.products')

            let products__card = document.createElement("div")
            products__card.className = "products__card"
            products__card.innerHTML = `
            <img src="./imgs/delete.svg" alt="" data-count="${card.count}" class="card__delete">
            <div class="card__image-block">
                <img src="${card.image}" alt="" class="card__image">
            </div>
            <div class="card__discription">
                <div class="card__meta">
                    <div class="card__rating">${card.rating}</div>
                    <div class="card__value">${card.value}</div>
                </div>
                <div class="card__name">${card.name}</div>
                <div class="card__cost">${card.cost}</div>
            </div>
            `;
            products.prepend(products__card)
        }
    }
}

let product1 = {
    image: "imgs/2.webp", 
    rating: "4.94", 
    value: "500 ккал.", 
    name: "Стейк из грудки индейки охлажденной Зеленая Лилия, 500г", 
    cost: "400"
}

let product2 = {
    image: "imgs/1.webp", 
    rating: "4.84", 
    value: "100 ккал.", 
    name: "Томаты черри на ветке, 250г", 
    cost: "250"
}

let add_card = document.querySelector('.products__add')
add_card.addEventListener('click', function () {
    let img = document.querySelector('.products__add img')
    img.classList.add('hide')

    let add_form = document.querySelector('.form__fields')
    add_form.classList.add('show')
})

let formButton = document.querySelector('.form__button')
formButton.addEventListener('click', function (event) {
    event.preventDefault()
    let form = document.querySelector('.add__form')
    let imagePath = document.querySelector('#image-path').value
    let rating = document.querySelector('#rating').value
    let value = document.querySelector('#value').value
    let name = document.querySelector('#name').value
    let cost = document.querySelector('#cost').value
    if (!form.checkValidity()){ 
        alert('Заполните все поля')
    }
    else {
        let card = {
            image: imagePath, 
            rating: rating, 
            value: value, 
            name: name, 
            cost: cost
        }
        createProduct(card)
        window.location.reload(true)
    }
})
appendProducts()


let deleteButtons = document.getElementsByClassName("card__delete") 
let modal = document.querySelector(".modal")
let DeletedItemCount
for (let deleteButton of deleteButtons){
    deleteButton.addEventListener('click', function () {
        modal.classList.add("active")
        modal.classList.remove("closed")
        DeletedItemCount = deleteButton.getAttribute("data-count")
    })
}

let button1 = document.querySelector("#yes")
let button2 = document.querySelector("#no")

button1.addEventListener('click', function () {
    modal.classList.add("closed")
    modal.classList.remove("active")
    console.log(DeletedItemCount)
    localStorage.removeItem(`card${DeletedItemCount}`)
    setTimeout(function () {window.location.reload(true)}, 600)
})

button2.addEventListener('click', function () {
    modal.classList.add("closed")
    modal.classList.remove("active")
})