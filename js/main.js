


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
        let pk = elements.getAttribute('name');

        $.ajax({

            type:'POST' ,
            url: 'data/like.json' ,
            data: {pk} ,
            dataType:'json' ,
            success: function(response){

                let likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count + '개';

            },
            error:function(request,status,error){

                alert('로그인이 필요합니다.');
                window.location.replace('http://www.naver.com');

            }

        });

    } else if(elements.matches('[data-name="bookmark"]')){

        console.log('bookmark');
        let pk = elements.getAttribute('name');

        $.ajax({

            type: 'POST' ,
            url: 'data/bookmark.json' ,
            data: {pk} ,
            dataType: 'json' ,
            success:function(response){

                let bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개';

            },
            error:function(request,status,error){

                alert('로그인이 필요합니다.');
                window.location.replace('http://www.naver.com');

            }

        });


    } else if(elements.matches('[data-name="comment"]')){

        console.log('comment');
        let content = document.querySelector('#add-comment-post-37 > input[type=text]').value;

        console.log(content);

        if(content.length > 140){

            alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수 :' + content.length);
            return;

        }

        $.ajax({

            type: 'POST',
            url: './comment.html',
            data:{

                'pk' : 37,
                'content' : content,

            },
            dataType: 'html',
            success:function(data){

                document.querySelector('#comment-list-ajax-post-37').insertAdjacentHTML('afterbegin', data);

            },
            error:function(request,status,error){

                alert('문제가 발생했습니다.');

            }

        });

        document.querySelector('#add-comment-post-37 > input[type=text]').value = '';

    } else if(elements.matches('[data-name="comment_delete"]')){

        $.ajax({

            type: 'POST',
            url: 'data/delete.json',
            data: {

                'pk' : 37,

            },
            dataType: 'json',
            success:function(response){

                if(response.status){

                    let comt = document.querySelector('.comment-detail');
                    comt.remove();

                }

            },error:function(request,status,error){

                alert('문제가 발생했습니다.');

            }

        });


    }  else if(elements.matches('[data-name="follow"]')){

        $.ajax({

            type: 'POST',
            url: 'data/follow.json',
            data: {

                'pk' : 37,

            },
            dataType: 'json',
            success:function(response){

                if(response.status){

                    document.querySelector('input.follow').value = '팔로잉';

                } else{

                    document.querySelector('input.follow').value = '팔로워';

               }

            },error:function(request,status,error){

                alert('문제가 발생했습니다.');

            }

        });

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

    let scrollHeight = pageYOffset + window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    console.log('scrollHeight : ' + scrollHeight);
    console.log('documentHeight : ' + documentHeight);

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

    if(scrollHeight >= documentHeight){

        let page = document.querySelector('#page').value;
        document.querySelector('#page').value = parseInt(page) + 1;

        callMorePostAjax(page);

        if(page > 5) {

            return;

        }

    }
}

function callMorePostAjax(page){

    if(page > 5) {

        return;

    }

    $.ajax({

        type: 'POST',
        url : './post.html',
        data: {

            'page' : page,

        },
        dataType: 'html',
        success: addMorePostAjax,
        error:function(request,status,error){

                alert('문제가 발생했습니다.');

            }

    });

}

function addMorePostAjax(data){

    delegation.insertAdjacentHTML('beforeend',data);

}

setTimeout(function(){

    scrollTo(0,0);

},100);

if(delegation){

    delegation.addEventListener('click',delegationFun);

}

window.addEventListener('resize',resizeFun);
window.addEventListener('scroll',scrollFun);