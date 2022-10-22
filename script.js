(function onLoad() {
    document
        .getElementById(`section-3-container`)
        .classList.add('section-activated');

    ////////////////////////////////////////////////////////// projects slider
    const sliderLeft = document.querySelector('#slider-button-left');
    const sliderRight = document.querySelector('#slider-button-right');

    sliderLeft.addEventListener('click', (e) => {
        slideChange('left');
    });

    sliderRight.addEventListener('click', (e) => {
        slideChange('right');
    });

    let slideOrder = [
        'slide-hidden',
        'slide-left',
        'slide-center',
        'slide-right',
        'slide-hidden',
        'slide-hidden',
    ];

    function slideChange(mode) {
        if (mode === 'right') {
            const lastSlide = slideOrder.pop();
            slideOrder.unshift(lastSlide);
        } else if (mode === 'left') {
            const firstSlide = slideOrder.shift();
            slideOrder.push(firstSlide);
        }
        slideShow();
    }

    let translateX,
        translateY,
        translateZ,
        rotateX,
        rotateY,
        rotateZ,
        opacity,
        scale;

    function slideShow() {
        translateX = document.getElementById('settings-translateX').value;
        translateY = document.getElementById('settings-translateY').value;
        translateZ = document.getElementById('settings-translateZ').value;
        rotateX = document.getElementById('settings-rotateX').value;
        rotateY = document.getElementById('settings-rotateY').value;
        rotateZ = document.getElementById('settings-rotateZ').value;
        opacity = document.getElementById('settings-opacity').value;
        scale = document.getElementById('settings-scale').value;

        const slides = document.querySelectorAll('.project');
        slides.forEach((el, i) => {
            //el.style.transform = "";
            el.style.opacity = '0';
            el.style.zIndex = '0';

            if (slideOrder[i] === 'slide-center') {
                el.style.transform = 'rotateY(0deg)';
                el.style.opacity = '1';
                el.style.zIndex = '100';
            }
            if (slideOrder[i] === 'slide-left') {
                el.style.transform = `translateX(${-translateX}vw) translateY(${-translateY}vw) translateZ(${-translateZ}vw) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) rotateZ(${-rotateZ}deg) scale(${scale})`;
                el.style.opacity = opacity;
            }
            if (slideOrder[i] === 'slide-right') {
                el.style.transform = `translateX(${translateX}vw) translateY(${translateY}vw) translateZ(${translateZ}vw) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
                el.style.opacity = opacity;
            }
        });
    }
    slideShow();

    ////////////////////////////////////////////////////////// keyboard scroll
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            slideChange('left');
        } else if (e.key === 'ArrowRight') {
            slideChange('right');
        }
    });

    ////////////////////////////////////////////////////////// touch scroll

    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchDiffX = 0;

    document.querySelector('body').addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    });

    document.querySelector('body').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchDiffX = touchStartX - touchEndX;
        if (touchDiffX > 100) {
            slideChange('left');
        } else if (touchDiffX < -100) {
            slideChange('right');
        }
    });
})();
