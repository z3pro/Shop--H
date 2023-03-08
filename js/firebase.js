// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCunmlVW173w87q3nE1r6FcHTAfjS0KCiU",
    authDomain: "dh-shop.firebaseapp.com",
    databaseURL: "https://dh-shop-default-rtdb.firebaseio.com",
    projectId: "dh-shop",
    storageBucket: "dh-shop.appspot.com",
    messagingSenderId: "1070278521960",
    appId: "1:1070278521960:web:b831a26739f29a631eb7dd",
    measurementId: "G-P6L39MW73X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//lấy chức năng crud
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
const db = getDatabase();
//lấy dữ liệu
export function getDb(key,callBack) {
    const dbRef = ref(db)
    return get(child(dbRef, key))
        .then((data) => {
            return Object.values(data.val());
        })
        .then(callBack)
        .catch(error=>console.log(error))
}
//thêm dữ liệu
export function create(key, id, option,callBack) {
    set(ref(db, `${key}/${id}`),option)
        .then(callBack)
        .catch(error=>{
            console.log(error);
        })
}
//sửa dữ liệu
export function updateData(key, id,option,callBack) {
    update(ref(db, `${key}/${id}`),option)
        .then(callBack)
        .catch(error=>{
            console.log(error);
        })
}
//delete
export function deleteData(key, id,callBack) {
    remove(ref(db, `${key}/${id}`))
        .then(callBack)
        .catch(error=>{
            console.log('Chưa có sản phẩm');
        })  
}                                      
//hàm tạo id theo name
export function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str.split(' ').join('');
}

