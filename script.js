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
            
            products.append(products__card)
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

// createProduct(product1)
appendProducts()



