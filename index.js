var tinder = (function () {

    const url = 'https://dog.ceo/api/breeds/image/random';
    let dog = document.querySelector('.cont-img-dog');
   

    let like = function (imageDog) {
        const btnLikes = document.getElementById('btnLike');
        btnLikes.addEventListener('click', () => {
            if (localStorage.getItem('likesDogs')) {
                let myLikes = localStorage.getItem('likesDogs');
                let newLike = JSON.parse(myLikes);
                newLike.push(imageDog);
                localStorage.setItem('likesDogs', JSON.stringify(newLike));
            } else {
                let likesDogs = [];
                likesDogs.push(imageDog);
                localStorage.setItem('likesDogs', JSON.stringify(likesDogs));
            }
            location.reload();
        })

    }

    let dislike = function () {
        const btnDislike = document.getElementById('btnDislike');
        btnDislike.addEventListener('click', ()=>{
             location.reload();
        })  
    }

    let loadingImage = function (imageURL) {
        const image = document.createElement("img");
        image.setAttribute('src', imageURL);
        return image;
    }

    let loadingName = function(imageURL) {
        let nameDog = document.querySelector('.cont-desc h2');
        let name = imageURL.split('/');
        nameDog.innerHTML = name[5];
    }

    let myLikes = function(){
        const listMyLikes = document.querySelector('.row-contenido');   
        if(localStorage.getItem('likesDogs')){
            let arrayMyLikes = JSON.parse(localStorage.getItem('likesDogs'));
            arrayMyLikes.map((dato)=>{
                const mediaObject = document.createElement('div');
                mediaObject.classList.add('cont-media-object');
                mediaObject.appendChild(createThumbnail(dato));
                mediaObject.appendChild(createExcerpt(dato));
                listMyLikes.appendChild(mediaObject);
            })
        }else{
            const mediaObject = document.createElement('div');
            mediaObject.classList.add('cont-media-object');
            const message = document.createElement('h2');
            message.classList.add('title-no-likes');
            message.innerHTML = 'No tienes me gustas aún. Desplázate a ver los perfiles'
            mediaObject.appendChild(message);
            listMyLikes.appendChild(mediaObject);
        }
    }

    let createThumbnail = function(imageURL){
        const contThumbnail= document.createElement('div');
        contThumbnail.classList.add('thumbnail-dog');
        contThumbnail.appendChild(loadingImage(imageURL));
        return contThumbnail;
    }

    let createExcerpt = function(imageURL){
        const contExcerpt = document.createElement('div');
        contExcerpt.classList.add('excerpt-dog');
        const titleExcerpt = document.createElement('h2');
        let name = imageURL.split('/');
        titleExcerpt.innerHTML = name[5];
        contExcerpt.appendChild(titleExcerpt);
        contExcerpt.innerHTML += '<small>Medellín - Colombia</small>';
        return contExcerpt;
    }

    let init = function () {
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                if(document.querySelector('.row-contenido')){
                    myLikes();
                }else{
                    dog.appendChild(loadingImage(json.message));
                    loadingName(json.message);
                    like(json.message);
                    dislike();
                }            
            })
    }

    return {
        init: init
    }
}());

// Entrada de la app
document.addEventListener('DOMContentLoaded', function () {
    tinder.init();
});
