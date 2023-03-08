const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import { create, removeVietnameseTones } from "./firebase.js";
//hàm kiểm tra khi mới truy cập vào trang
window.onload = ()=>{
    const infoUser = sessionStorage.getItem('infoUser');
    if(!infoUser) {
        window.location = '../html/login.html';
    }
}
function start() {
    renderTableCart();
    renderCartInfo();
}
start()
// hàm render cart info-user
function renderCartInfo() {
    const info = $('#root .info-user');
    const infoUser = JSON.parse(sessionStorage.getItem('infoUser'));
    info.innerHTML =
        `
    <div class="title-info">
                    <h4>
                        <i class="fa-solid fa-location-dot"></i>
                        Địa chỉ nhận hàng
                    </h4>

                </div>
                <div class="address-user">
                    <h4 class="name-phone">
                        ${infoUser.name} ${infoUser.sdtOrGmail}
                    </h4>
                    <div class="address">
                        ${infoUser.address || 'Chưa có địa chỉ'}
                    </div>
                    <button class="info-change">Thay đổi</button>
                </div>
    `;
}
//hàm render sản phẩm giỏ hàng
function renderTableCart() {
    let cart = localStorage.getItem('cart');
    if (cart) {
        cart = JSON.parse(cart)
        const productTable = $('#root .products-body');
        const html = cart.map(e => {
            return `<tr>
    <td>
        <div class="center">

            <input type="checkbox" name="" id="" class="checkbox-item">
        </div>
    </td>
    <td>
        <div class="product-content">
            <div class="img-product center">
                <img src="${e.img}" alt="">
            </div>
            <div class="title-product">
                ${e.title}
            </div>
        </div>
    </td>
    <td>
        <div class="price-product center">
            ${e.price}
        </div>
    </td>
    <td>
        <div class="center">
            <div class="quantity-product center">
                <div class="btn-left btn-center" >
                    <i class="fa-solid fa-minus"></i>
                </div>
                <input type="text" name="quantity" role="spinbutton" aria-valuenow="0" value="1"
                    id="" class="input-quantity">
                <div class="btn-right btn-center">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        </div>
    </td>
    <td>
        <div class="into-money center">
            ${e.price}
        </div>
    </td>
    <td>
        <div class="center btn-delete">
            Xóa
        </div>
    </td>
</tr>`
        })
        productTable.innerHTML = html.join('')
        $$('.btn-left').forEach(e => {
            e.onclick = () => {
                const quantity = e.parentElement.querySelector('.input-quantity').value;
                const price = e.parentElement.parentElement.parentElement.parentElement.querySelector('.price-product').innerText;
                e.parentElement.querySelector('.input-quantity').value = quantity - 1;
                const into = e.parentElement.parentElement.parentElement.parentElement.querySelector('.into-money');
                const value = price.slice(1) * e.parentElement.querySelector('.input-quantity').value;
                into.innerText = `đ${value}`;
                //cập nhật total
                const list = [];
                listCheckbox.forEach(e => {
                    if (e.checked) {
                        list.push(e);
                    }
                })
                let quantityMoney = 0;
                list.forEach(e => {
                    const money = e.parentElement.parentElement.parentElement.querySelector('.into-money').innerText.slice(1) * 1;
                    quantityMoney += money
                })
                $('#root .buy-money span').innerText = `${quantityMoney} VNĐ`
            }
        })
        $$('.btn-right').forEach(e => {
            e.onclick = () => {
                const quantity = e.parentElement.querySelector('.input-quantity').value * 1;
                const price = e.parentElement.parentElement.parentElement.parentElement.querySelector('.price-product').innerText;
                e.parentElement.querySelector('.input-quantity').value = quantity + 1;
                const into = e.parentElement.parentElement.parentElement.parentElement.querySelector('.into-money');
                const value = price.slice(1) * e.parentElement.querySelector('.input-quantity').value;
                into.innerText = `đ${value}`;
                const list = [];
                //cập nhật total
                listCheckbox.forEach(e => {
                    if (e.checked) {
                        list.push(e);
                    }
                })
                let quantityMoney = 0;
                list.forEach(e => {
                    const money = e.parentElement.parentElement.parentElement.querySelector('.into-money').innerText.slice(1) * 1;
                    quantityMoney += money
                })
                $('#root .buy-money span').innerText = `${quantityMoney} VNĐ`
            }
        })

        $$('.btn-delete').forEach((e, index) => {
            e.onclick = () => {
                const newCart = JSON.parse(localStorage.getItem('cart'));
                newCart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(newCart));
                renderTableCart();
            }
        })
    }

}

// xử lý khi bấm vào ô check all
const checkAll = $('.checkbox-all');
checkAll.onchange = () => {
    const checkItems = $$('.checkbox-item');

    if (checkAll.checked) {
        checkItems.forEach(e => {
            e.checked = true;
        })
    } else {
        checkItems.forEach(e => {
            e.checked = false;
        })
    }
    //cập nhật total
    const list = [];
    listCheckbox.forEach(e => {
        if (e.checked) {
            list.push(e);
        }
    })
    let quantityMoney = 0;
    list.forEach(e => {
        const money = e.parentElement.parentElement.parentElement.querySelector('.into-money').innerText.slice(1) * 1;
        quantityMoney += money
    })
    $('#root .buy-money span').innerText = `${quantityMoney} VNĐ`
}
const listCheckbox = $$('.checkbox-item');
listCheckbox.forEach(e => {
    e.onchange = () => {
        const list = [];
        listCheckbox.forEach(e => {
            if (e.checked) {
                list.push(e);
            }
        })
        let quantityMoney = 0;
        list.forEach(e => {
            const money = e.parentElement.parentElement.parentElement.querySelector('.into-money').innerText.slice(1) * 1;
            quantityMoney += money
        })
        $('#root .buy-money span').innerText = `${quantityMoney} VNĐ`
    }
})



//hàm xử lý khi bấm vào ô mua hàng 

const btnBuy = $('.buy-product .btn-buy');
btnBuy.onclick = () => {
    const arrIndex = [];
    $$('.checkbox-item').forEach((e, index) => {
        if (e.checked) {
            arrIndex.push(index)
        }
    })
    const cart = JSON.parse(localStorage.getItem('cart'));
    const listBuy = [];
    const listSolid = [];
    $$('.input-quantity').forEach((e, index) => {
        if (arrIndex.includes(index)) {
            listSolid.push(e.value)
        }
    })
    cart.forEach((e, index) => {
        if (arrIndex.includes(index)) {
            e.solid = listSolid[index]
            listBuy.push(e);
        }
    })
    const total = $('.buy-money span').innerText.split(' ')[0];

    const order = {
        id: Math.random().toString(36).substring(2, 7),
        infoUser: JSON.parse(sessionStorage.getItem('infoUser')),
        infoOder: listBuy,
        total: total,
        time: [
            new Date().toLocaleTimeString(),
            new Date().toLocaleDateString()
        ]
    }
    if (!(order.infoOder.length === 0)) {
        create('listOder', order.id, order, () => { alert('Đặt hàng thành công!') })
    }

}
