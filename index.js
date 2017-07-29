var tinder = (function () {

    const url = "https://dog.ceo/api/breeds/image/random"
    let dog = document.querySelector('.cont-img-dog');

    let like = function (imageDog) {
        const btnLikes = document.getElementById('btnLike');
        btnLikes.addEventListener('click', () => {
            if (localStorage.getItem('likesDogs')) {
                let myLikes = localStorage.getItem('likesDogs');
                let newLike = JSON.parse(myLikes);
                newLike.push(imageDog);
                localStorage.setItem("likesDogs", JSON.stringify(newLike));
            } else {
                let likesDogs = [];
                likesDogs.push(imageDog);
                localStorage.setItem("likesDogs", JSON.stringify(likesDogs));
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

    let init = function () {
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                dog.appendChild(loadingImage(json.message));
                loadingName(json.message);
                like(json.message);
                dislike();
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
