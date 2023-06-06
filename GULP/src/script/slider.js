function openModal() {
    document.querySelector('#modalSlider').style.display = "block";
}

function closeModal() {
    document.querySelector('#modalSlider').style.display = "none";
}

let slideIndex = 1;

function currentSlide(n) {
    showSlides(slideIndex = n);
}

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const contentMain = document.querySelectorAll('.content__main');

    if (n > contentMain.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = contentMain.length;
    }

    for (let i = 0; i < contentMain.length; i++) {
        contentMain[i].style.display = 'none';
    }

    contentMain[slideIndex-1].style.display = 'block';

    showImagesDown();
    showSliderName();
    showListWorks();
}

function showImagesDown() {
    const contentMain = document.querySelectorAll('.content__main');
    const contentImagesDown= document.querySelectorAll('.content__images-down');

    for (let i = 0; i < contentMain.length; i++) {
        for (let j = 0; j < contentImagesDown.length; j++) {
            if(contentMain[i].style.display === 'block' && i === j) {
                contentImagesDown[j].style.display = 'block';
            }
            if(contentMain[i].style.display === 'block' && i != j) {
                contentImagesDown[j].style.display = 'none';
            }
        }
    }
}

function showSliderName() {
    const contentMain = document.querySelectorAll('.content__main');
    const sliderName = document.querySelectorAll('.slider__name');

    for (let i = 0; i < contentMain.length; i++) {
        for (let j = 0; j < sliderName.length; j++) {
            if(contentMain[i].style.display === 'block' && i === j) {
                sliderName[j].style.display = 'block';
            }
            if(contentMain[i].style.display === 'block' && i != j) {
                sliderName[j].style.display = 'none';
            }
        }
    }
}

function showListWorks() {
    const contentMain = document.querySelectorAll('.content__main');
    const contentList = document.querySelectorAll('.content__list');

    for (let i = 0; i < contentMain.length; i++) {
        for (let j = 0; j < contentList.length; j++) {
            if(contentMain[i].style.display === 'block' && i === j) {
                contentList[j].style.display = 'block';
            }
            if(contentMain[i].style.display === 'block' && i != j) {
                contentList[j].style.display = 'none';
            }
        }
    }
}


let outSlideIndex = 1;

function currentOutSlide(k) {
    showOutSlides(outSlideIndex = k);
}

showOutSlides(outSlideIndex);

function plusOutSlides(k) {
    showOutSlides(outSlideIndex += k);
}

function showOutSlides(k) {
    const contentMainSlides = document.querySelectorAll('.content__main > .slides');

    const arrContentMain = Object.values(contentMainSlides);

    let size = arrContentMain.length/3;
    let contentSlides = [];
    for (let i = 0; i < Math.ceil(arrContentMain.length/size); i++){
        contentSlides[i] = arrContentMain.slice((i*size), (i*size) + size);
    }

    for(let j = 0; j < contentSlides[j].length; j++) {
        for(let s = 0; s < contentSlides[j].length; s++){
        if (k > contentSlides[j].length) {
        outSlideIndex = 1;
        }

        if (k < 1) {
            outSlideIndex = contentSlides[j].length;
        }

        for (let p = 0; p < contentSlides[j].length; p++) {
            contentSlides[j][p].classList.remove('show');
        }

        contentSlides[j][outSlideIndex-1].classList.add('show');
        }
    }
}
