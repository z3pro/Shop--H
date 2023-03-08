import { getDb } from "./firebase.js";
import md5 from "./encode.js";

let accounts = 'http://localhost:3000/accounts';
let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);


let btn = $('#btn-form');
//xử lý khi click vào ô btn
btn.onclick = function (e) {
    e.preventDefault();
    checkInput();
}
//tạo hàm khi blur khỏi ô input kiểm tra xem nó đã nhập đúng hay chưa và xử lý
let tfInput = false;
let inputAccount = $('#account-form');
inputAccount.onblur = function (e) {
    let value = this.value;
    if (value != '') {
        let span = this.parentElement.querySelector('#span-account');
        if (value.length < 6) {
            span.innerHTML = 'Vui lòng nhập 6 kí tự trở lên.';
            this.classList.add('active');
            return tfInput = false;
        } else {
            return tfInput = true;
        }
    } else {
        let span = this.parentElement.querySelector('#span-account');
        span.innerHTML = 'Vui lòng nhập trường này.';
        this.classList.remove('active');
        return tfInput = false;
    }
}

inputAccount.onfocus = function () {
    $('#span-account').innerHTML = '';
}
let inputPass = $('#password-form');
inputPass.onblur = function (e) {
    let value = this.value;
    if (value != '') {
        let span = this.parentElement.querySelector('#span-password');
        if (value.length < 8) {
            span.innerHTML = 'Vui lòng nhập 8 kí tự trở lên.';
            this.classList.add('active');
            return tfInput = false;
        } else {
            return tfInput = true;
        }
    } else {
        let span = this.parentElement.querySelector('#span-password');
        span.innerHTML = 'Vui lòng nhập trường này.';
        this.classList.add('active');
        return tfInput = false;
    }
}
inputPass.onfocus = function () {
    $('#span-password').innerHTML = '';
    this.classList.remove('active');
}
// tạo hàm kiểm tra xem đã nhập hết các ô hay chưa
function checkInput() {
    if (tfInput) {
        getDb('accounts', checkData)
        //getDataBase(checkData)
    } else {
        $('#span-account').innerHTML = 'Vui lòng nhập trường này.'
        $('#span-password').innerHTML = 'Vui lòng nhập trường này.'
    }
}
// tạo function lấy dữ liệu và truyền dữ liệu đó vào callback để làm nhiệm vụ kiểm tra thông tin đăng nhập
/* function getDataBase(callback) {
    fetch(accounts)
        .then(function (data) {
            return data.json();
        })
        .then(callback)

} */
/* tạo hàm kiểm tra dữ liệu nhập 
    vào có trùng khớp với dữ liệu đã lưu trên database hay không */

function checkData(data) {
    let name = inputAccount.value;
    let password = md5(inputPass.value);
    data.forEach(element => {
        if (element.name == name) {
            if (element.password == password) {
                if (element.admin) {
                    sessionStorage.setItem('infoUser', JSON.stringify(element))
                    window.location = '../html/admin.html'
                } else {
                    if (element.status == 'unlock') {
                        sessionStorage.setItem('infoUser', JSON.stringify(element))
                        window.location = '../html/user.html'
                    } else {
                        alert('Tài khoản đã bị khóa')
                        return;
                    }
                }
            } else {
                console.log('Mật khẩu không chính xác')
            }
        } else {
            console.log('Tài khoản không tồn tại')
        }
    });

}