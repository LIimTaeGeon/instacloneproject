


const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const side_box = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');



function delegationFun(e){

    let elements = e.target;

    console.log(elements);

    while(!elements.getAttribute('data-name')){

        elements = elements.parentNode;

        if(elements.nodeName === 'BODY'){

            elements = null;
            return;

        }

    }

    if(elements.matches('[data-name="heartbeat"]')){

        console.log('heart!');

    } else if(elements.matches('[data-name="bookmark"]')){

        console.log('bookmark');

    } else if(elements.matches('[data-name="share"]')){

        console.log('share');

    } else if(elements.matches('[data-name="more"]')){

        console.log('more');

    }

    elements.classList.toggle('on');

}

function resizeFun(){

    console.log('resized');

    if(pageYOffset >= 10){

        let calWidth = (window.innerWidth*0.5) + 167;

        side_box.style.left = calWidth +'px';
    }


    if(matchMedia('screen and (max-width : 800px)').matches){

        for(let i = 0; i<variableWidth.length; i++){

            variableWidth[i].style.width = window.innerWidth - 20 + 'px';

        }
    } else{

        for(let i = 0; i<variableWidth.length; i++){

            if(window.innerWidth > 600){

                variableWidth[i].removeAttribute('style');

            }

        }

    }

}

function scrollFun(){

    console.log(pageYOffset);

    if(pageYOffset >= 10){

        header.classList.add('on');

        if(side_box){

            side_box.classList.add('on');

        }

        resizeFun();

    } else{

        header.classList.remove('on');

        if(side_box){

            side_box.classList.remove('on');

        }

        side_box.removeAttribute('style');

    }
}

setTimeout(function(){

    scrollTo(0,0);

},100);

if(delegation){

    delegation.addEventListener('click',delegationFun);

}

window.addEventListener('resize',resizeFun);
window.addEventListener('scroll',scrollFun);