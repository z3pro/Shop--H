import { getDb,create } from '../js/firebase.js';
import md5 from './encode.js';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listInput = $$('.form-input');
const listSpan = $$('.span-form');
[...listInput].forEach(e => {
    e.onfocus = () => {
        e.value = '';
        e.parentElement.querySelector('.span-form').innerText = ''
    };
    e.onblur = () => {
        if (e.value.trim() == '') {
            e.parentElement.querySelector('.span-form').innerText = 'Vui lòng nhập trường này'
        } else if (e.value.trim().length < 5) {
            e.parentElement.querySelector('.span-form').innerText = 'Vui lòng nhập đúng thông tin'
        }
    }
});
const account = $('.account-form');
account.onblur = () => {
    if (account.value.trim().length < 6)
        account.parentElement.querySelector('.span-form').innerText = 'Vui lòng nhập trên 6 ký tự'
}
const password = $('.password-form');
password.onblur = () => {
    if (password.value.trim().length < 8)
        password.parentElement.querySelector('.span-form').innerText = 'Vui lòng nhập trên 8 ký tự'
}
const retypePass = $('.retype-pass');
retypePass.onblur = () => {
    if (retypePass.value.trim() !== password.value.trim()) {
        retypePass.parentElement.querySelector('.span-form').innerText = 'Mật khẩu nhập lại không khớp'
    } else if (retypePass.value.trim() == '') {
        retypePass.parentElement.querySelector('.span-form').innerText = 'Vui lòng nhập lại mật khẩu'
    }
}
$('#btn-form').onclick = (e) => {
    e.preventDefault()
    let result = false;
    [...listInput].forEach(item => {
        if (item.value.trim() == '') {
            result = true;
            item.parentElement.querySelector('.span-form').innerText = 'Vui lòng nhập trường này'
        }
    });
    [...listSpan].forEach(item => {
        if (item.innerText != '') {
            result = true;
        }
    })
    getDb('accounts', (data) => {
        data.forEach(item => {
            if (item.name == account.value) {
                result = true;
                account.parentElement.querySelector('.span-form').innerText = 'Tài khoản đã tồn tại'
            }
        })
        console.log(result);
        if (!result) {
            const data = {
                id: Math.random().toString(36).substring(2,7),
                address: $('.address-form').value,
                admin: false,
                fullName: $('.fullName-form').value,
                name: $('.account-form').value,
                password: md5($('.password-form').value),
                sdtOrGmail: $('.phone-form').value,
                status: "unlock"
            }
            create('accounts',data.id,data,()=>{
                window.location = '../html/login.html'
            })
        }
    })
}