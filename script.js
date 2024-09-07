topServicesModal.init = function() {
    var modals = document.querySelectorAll('.qld__modal');
    var modalUnderlay = document.querySelectorAll('.qld__modal__underlay');
    var modalBtn = document.querySelectorAll('.qld__open-modal');
    var getLocationBtn = document.querySelectorAll('.qld__geo-location__request');
    var locationDenyBtn = document.querySelectorAll('.qld__geo-location__deny');
    var mainBody = document.querySelector("body");

    if (modalBtn) {
        for (let i = 0; i < modalBtn.length; i++) {
            modalBtn[i].addEventListener('click', function() {
                let modalOpenBtn = this;
                let modalTarget = this.getAttribute('data-modaltarget');
                let modalEl = document.querySelector(`#${modalTarget}`);

                if (modalEl) {
                    let modalCloseBtn = modalEl.querySelector('.qld__modal__close');
                    let modalDenyBtn = modalEl.querySelector('.qld__modal__deny');
                    let modalAcceptBtn = modalEl.querySelector('.qld__modal__accept');
                    mainBody.classList.add("has-dialoge");

                    let focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
                    let firstFocusableElement = modalEl.querySelectorAll(focusableElements)[0];
                    let focusableContent = modalEl.querySelectorAll(focusableElements);
                    let lastFocusableElement = focusableContent[focusableContent.length - 1];

                    document.addEventListener('keydown', function(e) {
                        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

                        if (!isTabPressed) return;

                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusableElement) {
                                lastFocusableElement.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastFocusableElement) {
                                firstFocusableElement.focus();
                                e.preventDefault();
                            }
                        }
                    });

                    modalEl.classList.add('active');
                    modalEl.focus();

                    if (modalEl.classList.contains('qld__update-location')) {
                        QLD.userLocationFinder.init();
                    }

                    if (modalCloseBtn) {
                        modalCloseBtn.addEventListener('click', function() {
                            modalEl.classList.remove('active');
                            mainBody.classList.remove("has-dialoge");
                            modalOpenBtn.focus();
                        });
                    }

                    if (modalDenyBtn) {
                        modalDenyBtn.addEventListener('click', function() {
                            modalEl.classList.remove('active');
                            mainBody.classList.remove("has-dialoge");
                            modalOpenBtn.focus();
                        });
                    }

                    if (modalAcceptBtn) {
                        modalAcceptBtn.addEventListener('click', function() {
                            modalEl.classList.remove('active');
                            mainBody.classList.remove("has-dialoge");
                            modalOpenBtn.focus();
                        });
                    }
                } else {
                    console.log(`Modal '#${modalTarget}' not found.`);
                }
            });
        }
    }

    if (modalUnderlay) {
        for (let i = 0; i < modalUnderlay.length; i++) {
            modalUnderlay[i].addEventListener('click', function() {
                this.parentNode.classList.remove('active');
            });
        }
    }

    if (getLocationBtn) {
        for (let i = 0; i < getLocationBtn.length; i++) {
            getLocationBtn[i].addEventListener('click', function() {
                QLD.utils.geolocateUser();
            });
        }
    }

    if (locationDenyBtn) {
        for (let i = 0; i < locationDenyBtn.length; i++) {
            locationDenyBtn[i].addEventListener('click', function() {
                QLD.utils.setLocalStorage('qld_geolocation', 'deny');
            });
        }
    }

    if (modals && QLD.utils.getLocalStorage('qld_geolocation') !== 'deny') {
        for (let i = 0; i < modals.length; i++) {
            if (modals[i].classList.contains('qld__services-modal')) {
                var modalId = modals[i].id;
                var modalToActivate = document.querySelector(`[data-modaltarget=${modalId}]`);

                if (!QLD.utils.getLocalStorage('qld_user_location') && modalToActivate) {
                    modalToActivate.click();
                }
            }
        }
    }
}
