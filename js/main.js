let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
import {getDb} from "./firebase.js"
function start() {
    getDb('category',renderCategory);
    getDb('products',renderProduct)
}

start();
//hàm thay đổi ảnh phần silder
let a = 0;
function autoImg() {
    let slider = $('#slider');
    if (a == 0) {
        a = 1;
        slider.style.backgroundImage = "url('../imgs/slider1.png')"
    } else {
        a = 0;
        slider.style.backgroundImage = "url('../imgs/taoanhdep_gau_65111.gif')"
    }
}
setInterval(function () {
    autoImg();
}, 6000)



function renderCategory(data) {
    let lists = $('#lists');
    let html = data.map(e => {
        return `
            <div class="list l-1-2 m-2 c-2 category-${e.id}">
                    <a href="">
                        <div class="img-list">
                            <img src="${e.img}" alt="">
                        </div>
                        <div class="content-list">
                            <div class="name-content">${e.name}</div>
                        </div>
                    </a>
                </div>
            `
    })
    lists.innerHTML = html.join('');
}
function renderProduct(data) {
    let lists = $('#products');
    let html = data.map(data => {
        return `
        <div class=" l-2 m-3 c-4 product" id ="product-${data.id}">
            <div class= "item-product">
            <a href="">
             <div class="img-product">
                <img src="${data.img}" alt="">
            </div>
            <div class="product-content">
                <p class="product-title">${data.title}</p>
                <div class="product-offers"></div>
                <div class="footer-product">
                    <div class="product-money">${data.price}</div>
                    <div class="product-sold">Đã bán ${data.sold}</div>
                </div>
            </div>
        </a>
            </div>
        </div>
            `
    })
    lists.innerHTML = html.join('');
}