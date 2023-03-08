
// render danh mục 
import { getDb, create, updateData, deleteData, removeVietnameseTones } from "./firebase.js";
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

function start() {
    getDb('category', renderCategory);
    getDb('products', renderProduct);
    getDb('accounts', renderManageUser)
    // getCategory(renderCategory);
    // getProduct(renderProduct);
}
//xử lý chút bảo mật
window.onload = () => {
    const admin = JSON.parse(sessionStorage.getItem('infoUser'));
    if (!admin) {
        window.location = '../html/login.html';
    }
    if (admin.name && admin.password && admin.admin) {
        console.log('admin');
    } else {
        window.location = '../html/login.html'
    }
}
//xóa session
$('#menu .admin-logout').onclick = () => {
    sessionStorage.removeItem('infoUser');
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
//render category
function getCategory(callback) {
    fetch(category)
        .then((data) => {
            return data.json();
        })
        .then(callback)
}
let listCategory = [];
function renderCategory(data) {
    let lists = $('#lists');
    let html = data.map(e => {
        return `
            <div class="list l-1-2 m-2 c-2 category-${e.id}">
                    <div class="close-category ${e.id}" >
                        <i class="fa-solid fa-xmark opacity-1"></i>
                    </div>
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
    (function () {
        $$('.close-category').forEach(item => {
            item.onclick = () => {
                let id = item.classList[1];
                if (id) {
                    deleteData('category', id, getDb('category', renderCategory))
                    getDb('category', renderCategory)
                }
            }
        })
    })()

}
//render product
function getProduct(callback) {
    fetch(products)
        .then((data) => {
            return data.json();
        })
        .then(callback)
}
function renderProduct(data) {
    let lists = $('#products');
    let html = data.map(data => {
        return `
        <div class=" l-2 m-3 c-4 product" id ="product-${data.id}">
            <div class= "item-product">
            <div class="close-product ${data.id}" >
                <i class="fa-solid fa-xmark opacity-1"></i>
            </div>
            <a href="">
             <div class="img-product">
                <img src="${data.img}" alt="">
            </div>
            <div class="product-content">
                <p class="product-title">${data.title}</p>
                <div class="product-offers"></div>
                <div class="footer-product">
                    <div class="product-money">${data.price}</div>
                    <div class="product-sold">${data.sold}</div>
                </div>
            </div>
        </a>
            </div>
        </div>
            `
    })
    lists.innerHTML = html.join('');
    (function () {
        $$('.close-product').forEach(item => {
            item.onclick = () => {
                let id = item.classList[1];
                if (id) {
                    deleteData('products', id, getDb('products', renderProduct))
                    getDb('products', renderProduct)
                }
            }
        })
    })()
}
//
//hàm chuyển đổi file ảnh sang dạng url để lưu dữ liệu vào local
let urlCategory;
$('#file-category').addEventListener('change', event => {
    let events = event.target.files;
    let value = events[0];
    console.log(value);
    let url = URL.createObjectURL(value);
    toDataURL(url, function (newUrl) {
        return urlCategory = newUrl;
    })
})
//hàm chuyển đổi file ảnh thành url gửi lên server
function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
// tạo hàm ẩn hiện bảng nhập danh mục
let addCategory = $('#add-category');
addCategory.onclick = function () {
    $('#list-product .table-input-category').classList.toggle('active');
}
//tạo hàm lấy dữ liệu nhập vào từ các ô input của danh mục
let btnCreate = $('#create-category');
btnCreate.onclick = function getInputCategory() {
    let nameCate = $('#name-category');
    let id = removeVietnameseTones(nameCate.value)
    let data = {
        id: id,
        name: nameCate.value,
        img: urlCategory
    }
    create('category', id, data, getDb('category', renderCategory))
    // createCategory(data, getCategory(renderCategory))
    getDb('category', renderCategory)
}


// tạo hàm thêm danh mục lên data
/* function createCategory(data, callback) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    fetch(category, options)
        .then(data => {
            return data.json();
        })
        .then(callback)
} */
//tạo hàm xóa danh mục
function deleteCategory(id) {
    deleteData('category', id, getDb('category', renderCategory))
    console.log(id);
    /* let options = {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json' }
    }
    fetch(category + '/' + id, options)
        .then(function (data) {
            return data.json();
        })
        .then(function () {
            let product = $('.category-' + id);
            product.remove()
        }) */
}
//ẩn hiện khi bấm nút thêm sản phẩm
let addProduct = $('#add-product');
addProduct.onclick = function () {
    $('#list-content-product .table-input-product').classList.toggle('active')
}

/*       chuyển thành url của phần project       */
//hàm chuyển đổi file ảnh sang dạng url để lưu dữ liệu vào local
let urlProject;
$('#file-product').addEventListener('change', event => {
    let events = event.target.files;
    let value = events[0];
    console.log(value);
    let url = URL.createObjectURL(value);
    toDataURL(url, function (newUrl) {
        return urlProject = newUrl;
    })
})
//hàm chuyển đổi file ảnh thành url gửi lên server
/* function toIsDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  } */


//thêm sửa xóa sản phẩm 
let btnPro = $('#create-product');
btnPro.onclick = function getInputProduct() {
    let namePro = $('#name-product');
    let title = $('#title-product');
    let voucher = $('#voucher-product');
    let pice = $('#pice-product');
    let id = removeVietnameseTones(namePro.value)
    let data = {
        id: id,
        name: namePro.value,
        img: urlProject,
        title: title.value,
        voucher: voucher.value,
        price: 'đ' + pice.value,
        sold: 0
    }
    create('products', id, data, getDb('products', renderProduct))
    // createProduct(data, getProduct(renderProduct));
    getDb('products', renderProduct)
}


// tạo hàm thêm product lên data
// function createProduct(data, callback) {
//     let options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     }
//     fetch(products, options)
//         .then(data => {
//             return data.json();
//         })
//         .then(callback)
// }
//tạo hàm close product
function deleteProduct(id) {
    let options = {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json' }
    }
    fetch(products + '/' + id, options)
        .then(function (data) {
            return data.json();
        })
        .then(function () {
            let product = $('#product-' + id);
            product.remove()
        })
}






//chức năng admin
const adminDh = $('#admin-dh');
const tabAdmin = $('.menu-admin .list-menu');
const iconMenuAdmin = $('#admin-dh .fa-caret-down')
adminDh.onclick = (e) => {
    e.preventDefault();
    tabAdmin.classList.toggle('active')
    iconMenuAdmin.classList.toggle('rote-180')
}


//quản lý người dùng
function renderManageUser(data) {
    $('.manage-bill').style.backgroundColor = 'pink';
    $('.manage-bill').style.color = '#fff';
    $('.manage-user').style.backgroundColor = '#fff';
    $('.manage-user').style.color = '#000';
    const newData = data.filter(e => !e.admin)
    const html = newData.map((item, index) => {
        return `<tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.fullName}</td>
        <td>${item.sdtOrGmail}</td>
        <td>${(() => { if (item.status == 'unlock') { return 'Đang hoạt động' } else { return 'Đã khóa' } })()}</td>
        <td><button class = "btn-lock ${item.id}">
            ${(() => { if (item.status == 'unlock') { return 'Khóa' } else { return 'Mở khóa' } })()}
        </button></td>
    </tr>`
    })
    $('.root-manage ').innerHTML = `<table>
    <thead>
        <tr>
            <th>STT</th>
            <th>Tên tài khoản</th>
            <th>Tên người dùng</th>
            <th>SĐT/Gmail</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
        </tr>
    </thead>
    <tbody class="manage-table-body">
    ${ html.join('')}
    </tbody>
</table>`
   
    $$('.btn-lock').forEach(e => {
        const id = e.classList[1];
        const data = e.parentElement.parentElement.innerText.split('\t');
        e.onclick = () => {
            if (data[4] == 'Đang hoạt động') {
                updateData('accounts', id, { status: "lock" }, () => {
                    getDb('accounts', renderManageUser)
                })
            } else {
                updateData('accounts', id, { status: "unlock" }, () => {
                    getDb('accounts', renderManageUser)
                })
            }
        }
    });

}
//hàm render bill
function renderManageBill(data) {
    console.log(data);
    $('.manage-user').style.backgroundColor = 'pink';
    $('.manage-user').style.color = '#fff';
    $('.manage-bill').style.backgroundColor = '#fff';
    $('.manage-bill').style.color = '#000';
    const html = data.map((item,index)=>{
        const listProduct = item.infoOder;
        const htmlMini = listProduct.map(e=>{
            const price = e.price.slice(1);
            return `
            <tr>
                <td>${e.name}</td>
                <td>${e.solid}</td>
                <td>${price*e.solid} VNĐ</td>
             </tr>
            `
        })
        const htmlMedium = `
        <table >
        <thead>
            <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng giá</th>
            </tr>
        </thead>
        <tbody class="bill-mini-tbody">
        ${htmlMini.join('')}
        </tbody>
        </table>
        `
        return `
        <tr>
            <td>${index+1}</td>
            <td>${item.infoUser.name}</td>
            <td>${item.time[0]} ${item.time[1]}</td>
            <td>${item.infoUser.sdtOrGmail}</td>
            <td
            class="address-td"
            >${item.infoUser.address}</td>
            <td class="bill-mini">
                ${htmlMedium}
            </td>
        </tr>
        `
    })
    const totalMoney = data.reduce((total,item)=>{
        return total + item.total*1;
    },0)
    console.log(totalMoney);
    $('.root-manage').innerHTML = `
    <div class="revenue-shop">
        Doanh thu shop:
        <span>${totalMoney} VNĐ</span>
    </div>
    <div class="table-bill">
        <div class="bill">
        <table>
        <thead>
            
            <tr>
                <th>STT</th>
                <th>Tên tài khoản</th>
                <th>Hóa đơn ngày</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Thông tin đơn hàng</th>
            </tr>
        </thead>
        <tbody class="manage-bill-tbody">
        ${html.join('')}
        </tbody>
        </table>       
        </div>
    </div>`
    
}
//xử lý nút btn phần quản lý
 
const manageUser = $('.manage-user');
manageUser.onclick = ()=>{
    getDb('accounts', renderManageUser)
}
const manageBill = $('.manage-bill');
manageBill.onclick = ()=>{
    getDb('listOder', renderManageBill)
}