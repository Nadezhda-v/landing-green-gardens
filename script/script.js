window.addEventListener('load', () => {
    const headerMenuButton = document.querySelector('.header__menu-button');
    const headerMenu = document.querySelector('.header__menu-section');

    const changeMenu = function () {
        headerMenuButton.classList.toggle('change');
    }

    const showMenu = function () {
        headerMenu.classList.toggle('show-list');
    }

    headerMenuButton.addEventListener('click', changeMenu);
    headerMenuButton.addEventListener('click', showMenu);

    const previousRewiew = document.querySelector('#previous-rewiew');
    const nextRewiew = document.querySelector('#next-rewiew');
    const subjectRewiews = document.querySelectorAll('.rewiews-card');

    let offset = 1;

    nextRewiew.addEventListener('click', () => {
        nextSlide();
    })

    previousRewiew.addEventListener('click', () => {
        previousSlide();
    })

    const goToSlide = function (n) {
        subjectRewiews[offset].className = 'rewiews-card';
        offset = (n + subjectRewiews.length) % subjectRewiews.length;
        subjectRewiews[offset].className = 'rewiews-card showing';
    }

    function nextSlide() {
        goToSlide(offset + 1);
    }

    function previousSlide() {
        goToSlide(offset - 1);
    }

    const serviceButtonsMain = document.querySelectorAll('.service-button-main');
    const serviceList = document.querySelectorAll('.service-list')

    serviceButtonsMain.forEach((button, index) => {
        button.addEventListener('click', () => {
            serviceList.forEach((list, listIndex) => {
                setTimeout(() => {
                    list.classList.add('show-list-works');
                }, 300);

                if(index === listIndex) {
                    setTimeout(() => {
                        list.classList.remove('show-list-works');
                    }, 300);
                }
            });
        });
    });

    const serviceButtons = document.querySelectorAll('.service-button');
    const serviceListDropdown = document.querySelectorAll('.service-list-dropdown');

    serviceButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            serviceListDropdown.forEach((list, listIndex) => {
                if (index === listIndex) {
                    setTimeout(() => {
                        list.classList.toggle('show-list-down');
                    }, 200);
                } else {
                    setTimeout(() => {
                        list.classList.remove('show-list-down');
                    }, 200);
                }
            });
        });
    });

    const buttonUp = document.querySelector('.rewiews-button-up');

    buttonUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

})

function readMore() {
    const arrowDown = document.querySelector('.arrow__down');
    const moreAboutCompany = document.querySelector('#more__aboutCompany');
    if (moreAboutCompany.style.display === 'none') {
        moreAboutCompany.style.display = 'inline';
        arrowDown.style.transform = 'rotate(-45deg)'
    } else {
        moreAboutCompany.style.display = 'none';
        arrowDown.style.transform = 'rotate(135deg)'
    }
}


function readMoreImage() {
    const arrowDownImage = document.querySelector('.arrow__down-image');
    const moreLandscapeImage = document.querySelector('#more__landscapeImage');
    if (moreLandscapeImage.style.display === 'none') {
        moreLandscapeImage.style.display = 'inline';
        arrowDownImage.style.transform = 'rotate(-45deg)';
        arrowDownImage.style.display = 'inline-block';
    } else {
        moreLandscapeImage.style.display = 'none';
        arrowDownImage.style.transform = 'rotate(135deg)'
    }

}