window.addEventListener('DOMContentLoaded', () => {
    const loadContent = async (url, callback) => {
        await fetch(url) //обещание
            .then(response => response.json()) //обещание
            .then(json => createElement(json.goods)); 
    
        callback();
    }
    
    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');
    
        arr.forEach(function(item) {
            let card = document.createElement('div');
            card.classList.add('goods__item');
            card.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
                ${item.title}
            </div>
            <div class="goods__price">
                <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        });
    }
    
    loadContent('js/db.json', () => {
            const cartWrapper = document.querySelector('.cart__wrapper'),
            cart = document.querySelector('.cart'),
            close = document.querySelector('.cart__close'),
            open = document.querySelector('#cart'),
            goodsBtn = document.querySelectorAll('.goods__btn'),
            products = document.querySelectorAll('.goods__item'),
            confirm  = document.querySelector('.confirm'),
            badge = document.querySelector(".nav__badge"),
            totalCost = document.querySelector('.cart__total > span'),
            titles = document.querySelectorAll('.goods__title');
    
        function openCart(){
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
        }
        function closeCart(){
        cart.style.display = 'none';
        document.body.style.overflow = '';
        }
    
        open.addEventListener('click', openCart);
        close.addEventListener('click', closeCart);
    
        goodsBtn.forEach(function(btn, i){
        btn.addEventListener('click', ()=>{
            let item      = products[i].cloneNode(true),
                trigger   = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty     = cartWrapper.querySelector('.empty');
    
                trigger.remove();
    
                showConfirm();
    
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times';
                item.appendChild(removeBtn);
    
                cartWrapper.appendChild(item);
                if(empty){
                    empty.remove();
                }
    
                calcGoods();
                calcTotal();
                removeFromCart();
        })
        });
    
        function sliceTitle() {
        titles.forEach(function(item) {
            if (item.innerText.length < 50) {
                return;
            } else {
                const str = item.innerText.slice(0, 50) + '...';
                item.textContent = str;
            }
        })
        }
        sliceTitle();
    
        function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);
        function frame() {
            if (counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }
        }
        }
    
        function calcGoods() {
        const items = cartWrapper.querySelectorAll('.goods__item');
        if(items.length == 0){
            returnEmptyMassage();
        }
        badge.textContent = items.length;
        }
    
        function returnEmptyMassage(){
        let div = document.createElement('div');
        div.classList.add('empty');
        div.innerText = 'Ваша корзина пока пуста';
        cartWrapper.appendChild(div);
        // console.log(div);
        }
        // returnEmptyMassage();
    
        function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;
        prices.forEach(function(item) {
            total += +item.textContent;
        });
        totalCost.textContent = total;
        }
    
        function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function(btn) {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                calcGoods();
                calcTotal();
            })
        })
        }
    })
});



// const example = {username: "Ivan"};

// fetch('https://jsonplaceholder.typicode.com/todos/1/posts', 
// {
//     metod: "POST",
//     body: JSON.stringify(example)
// }) //обещание
//   .then(response => response.json()) //обещание
//   .then(json => console.log(json)) 

