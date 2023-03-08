let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
import { getDb } from "./firebase.js"

//xử lý bảo mật 1 chút
window.onload = () => {
    let info = sessionStorage.getItem('infoUser');
    
    if (!info) {
        window.location = '../html/login.html'
    }
    info = JSON.parse(info);
    $('#admin-dh').innerText = info.name;
    if (info.name && info.password && !info.admin) {
        console.log('User');
    } else {
        window.location = '../html/login.html'
    }
}


//Xóa session
const logoutUser = $('#menu .logout-user');
logoutUser.onclick = () => {
    sessionStorage.removeItem('infoUser')
}
function start() {
    getDb('category', renderCategory);
    getDb('products', renderProduct)
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
                    <a href="#">
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
    let html = data.map((data, key) => {
        return `
        <div class=" l-2 m-3 c-4 product" id ="product-${key}">
            <div class= "item-product">
            <div class="close-product ${data.id}" >
            +<i class="fa-sharp fa-solid fa-cart-shopping icon-card"></i>
            </div>
            
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
        
            </div>
        </div>
            `
    })
    lists.innerHTML = html.join('');
    const listProduct = $$('.product');
    listProduct.forEach(item => {
        console.log(item);
        item.onclick = () => {
            const id = item.id.split('-')[1];
            const value = data[id];
            const cart = JSON.parse(localStorage.getItem('cart'));
            if (cart) {
                const result = false;
                cart.forEach(item => {
                    if (item.id === value.id) {
                        alert('Đã có trong giỏ hàng');
                        return result = true;
                    }
                })
                if (!result) {
                    localStorage.setItem('cart', JSON.stringify([...cart, value]));
                    alert('đã thêm vào giỏ hàng');
                }
            } else {
                localStorage.setItem('cart', JSON.stringify([value]));
                alert('Đã thêm vào giỏ hàng')
            }
        }
    })
}

const cartUser = $('#menu .card-user');
cartUser.onclick = () => {
    window.location = '../html/versatile.html'
}
