let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);
const boxMain = $('#content_product-introduction')
const listIntroduction = $$('.product-introduction');
const contentBox = $('#content_product-introduction .content-box');
const btnLeft = $('#content_product-introduction .btnLeft');
const btnRight = $('#content_product-introduction .btnRight');
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            make_slide(4);
        } else if (window.innerWidth >= 740) {
            make_slide(3);
        } else {
            make_slide(2);
        }
    })
    const media = [
        window.matchMedia('(min-width: 1024px)'),
        window.matchMedia('(min-width: 740px)'),
    ];

    if (media[0].matches) {
        make_slide(4);
    } else if (media[1].matches) {
        make_slide(3);
    } else {
        make_slide(2);
    }
})

function make_slide(numberItem) {
    let widthItem = boxMain.offsetWidth / numberItem;
    let widthContentBox = widthItem * listIntroduction.length;
    contentBox.style.width = `${widthContentBox}px`
    //set width cho từng item
    listIntroduction.forEach((element) => {
        element.style.marginRight = '20px';
        element.style.width = `${widthItem - 20}px`;
    })
    //hàm xử  lí 2 ô click
    let count = 0;
    let make = widthContentBox - (widthItem * numberItem);
    setInterval(function() {
        count += widthItem;
        if (count > make ) {
            count = 0;
        }
        contentBox.style.transform = `translateX(${-count}px)`
    },5000)
    btnRight.onclick = function () {
        count += widthItem;
        if (count > make) {
            count = 0;
        }
        contentBox.style.transform = `translateX(${-count}px)`
    }
    btnLeft.onclick = function () {
        count -= widthItem;
        if (count < 0) {
            count = make;
        }
        contentBox.style.transform = `translateX(${-count}px)`
    }

}
