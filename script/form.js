window.addEventListener('load', () => {

    const form = document.forms['form'];

    const inputArr = Array.from(form);
    const validInputArr = [];


    inputArr.forEach((el) => {
        if (el.hasAttribute('data-reg')) {
            el.setAttribute('is-valid', '0');
            validInputArr.push(el);
        }

        if (el.getAttribute('type') === 'checkbox') {
            el.setAttribute('is-valid', '1');
            validInputArr.push(el);
        }
    })


    form.addEventListener('input', inputHandler);

    function inputHandler({ target }) {
        if (target.hasAttribute('data-reg')) {
            handlInputWithData(target)
        }

        if (target.getAttribute('type') === 'telephone') {
            maskPhone('.modal__input-telephone')
            handlInputWithData(target)
        }

        if (target.getAttribute('type') === 'checkbox') {
            handlInputCheckbox(target)
        }
    }

    const button = document.querySelector('#submit');

    function unlockButton() {
        let isAllValid = [];
        validInputArr.forEach((el) => {
            isAllValid.push(el.getAttribute('is-valid'));
        });

        let isAValid = isAllValid.reduce((acc, current) => {
            return acc + current;
        })

        if (isAValid == '111') {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }

    function handlInputWithData(element) {
        const inputValue = element.value;
        const inputReg = element.getAttribute('data-reg');
        const reg = new RegExp(inputReg);
        console.log(inputValue)
        if (reg.test(inputValue) && inputValue.length != 0) {
            element.style.boxShadow = 'none';
            element.setAttribute('is-valid', '1');
            unlockButton();
        } else {
            element.style.boxShadow = '0 0 15px red';
            element.setAttribute('is-valid', '0');
            unlockButton();
        }
    };

    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }
    }

    function handlInputCheckbox(element) {
        for (let j = 0; j < validInputArr.length; j++) {
            const input = validInputArr[j];

            if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                input.parentElement.classList.add('__error');
                input.classList.add('__error');
                element.setAttribute('is-valid', '0');
                unlockButton();
            } else {
                input.parentElement.classList.remove('__error');
                input.classList.remove('__error');
                element.setAttribute('is-valid', '1');
                unlockButton();
            }
        }

    }

    const modalContentAll = document.querySelector('.modal__content-all');
    const modalDialogClose = document.querySelector('.modal__dialog-close');
    const headerButton = document.querySelector('.header-button');
    const modalDialog = document.querySelector('#open__modal');

    button.addEventListener('click', function (event) {
        event.preventDefault();
        modalContentAll.style.display = 'none';
        const feedBack = document.createElement('div')
        feedBack.className = 'feedback-text';
        feedBack.textContent = 'Ваша заявка принята! В ближайшее время с вами свяжутся для уточнения деталей'
        modalDialogClose.after(feedBack);

    });

    headerButton.addEventListener('click', function (event) {
        modalDialog.style.display = 'block';
        const feedbackText = document.querySelector('.feedback-text');
        feedbackText.style.display = 'none';
    })

    function formReset() {
        form.reset();
        modalContentAll.style.display = 'flex';
    }

    modalDialogClose.addEventListener('click', function (event) {
        modalDialog.style.display = 'none';
        formReset();
    })

    window.onclick = function (event) {
        if (event.target == modalDialog) {
            modalDialog.style.display = 'none';
            formReset();
        }
    }

})


