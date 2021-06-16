//import { ampliarGifo, getFavoritos } from './index.js';


let storageFavoritos = localStorage.getItem('Mis Gifos');
let misGifos;
if (storageFavoritos) {
    misGifos = JSON.parse(storageFavoritos);
} else {
    misGifos = [];
}
console.log(misGifos);

const gifsConteiner = document.getElementById('gifsConteinerMisGifs');
const btnVerMasMisGifs = document.getElementById('btnVerMasMisGifs');
const emptyMisGifos = document.getElementById('emptyMisGifos');

if (misGifos.length < 12) {
    btnVerMasMisGifs.classList.add('hidden');
} else {
    btnVerMasMisGifs.classList.remove('hidden');
};

function getGifoForEach(array) {


    if (array.length > 0) {
        array.forEach(async (el) => {

            const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';
            const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&gif_id=${el.id}`;
            //console.log(url);
            
            try {
                const response = await fetch(url);
                const info = await response.json();
                let gifoCont = document.createElement('div');
                gifoCont.classList.add('gifoCon');
                gifsConteiner.appendChild(gifoCont);
                let imgFavoritos = document.createElement('img');
                imgFavoritos.src = el.url;
                gifoCont.appendChild(imgFavoritos);
                let bgGifo;
                imgFavoritos.addEventListener('mouseenter', () => {
                    bgGifo = document.createElement('div');
                    bgGifo.classList.add('bgGifo');
                    gifoCont.appendChild(bgGifo);
                    let acciones = document.createElement('div');
                    acciones.classList = 'acciones';
                    bgGifo.appendChild(acciones);
                    let corazon = document.createElement('div');
                    corazon.classList = 'corazon';
                    acciones.appendChild(corazon);
                    let descargar = document.createElement('div');
                    descargar.classList = 'descargar';
                    acciones.appendChild(descargar);
                    let ampliar = document.createElement('div');
                    ampliar.classList = 'ampliar';
                    acciones.appendChild(ampliar);
                    corazon.addEventListener('click', () => {
                        removeGifoFromFavoritos(array, el);
                        gifoCont.classList.add('hidden');
                    })
                    ampliar.addEventListener('click', () => {
                        ampliarGifoFav(el);
                    })
                    descargar.addEventListener('click', async () => {
                        const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';
                        let a = document.createElement('a');
                        let response = await fetch(`https://media2.giphy.com/media/${el.id}/giphy.gif?${apiKey}&rid=giphy.gif`);
                        let file = await response.blob();
                        a.download = el.title;
                        a.href = window.URL.createObjectURL(file);
                        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                        a.click()
                    })
                })
                gifoCont.addEventListener('mouseleave', () => {
                    bgGifo.classList.remove('bgGifo');

                })

            } catch (err) {
                console.log(err);
            }

        });
    } else {
        btnVerMasMisGifs.classList.add('hidden');
        emptyMisGifos.classList.remove('hidden');
    } 

};


// ----sacar gifo de favoritos -----
function removeGifoFromFavoritos(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
        arr.splice(i, 1);
        if (arr == 0) {
            btnVerMasMisGifs.classList.add('hidden');
            emptyMisGifos.classList.remove('hidden');
            localStorage.clear();
        }
    }

}

getGifoForEach(misGifos);

//----- ampliar gifo -----
const ampliarGifoSection = document.getElementById('ampliarGifoSection');
function ampliarGifoFav(el) {
    let divContGn = document.createElement('div');
    divContGn.classList.add('ampliar_gifo');
    ampliarGifoSection.appendChild(divContGn);
    let divClosed = document.createElement('div');
    divClosed.classList.add('close');
    divContGn.appendChild(divClosed);
    let divImgCont = document.createElement('div');
    divImgCont.classList.add('img-cont');
    divContGn.appendChild(divImgCont);
    let divLeftArrow = document.createElement('div');
    divLeftArrow.classList.add('left-arrow');
    divImgCont.appendChild(divLeftArrow);
    let imgGifo = document.createElement('img');
    imgGifo.classList.add('img-gifo');
    imgGifo.src = el.url;
    divImgCont.appendChild(imgGifo);
    let divRightArrow = document.createElement('div');
    divRightArrow.classList.add('right-arrow');
    divImgCont.appendChild(divRightArrow);
    let divContAcciones = document.createElement('div');
    divContAcciones.classList.add('cont-aciones');
    divContGn.appendChild(divContAcciones);
    let text = document.createElement('div');
    text.classList.add('text');
    divContAcciones.appendChild(text);
    let user = document.createElement('h6');
    user.classList.add('user');
    user.textContent = el.username;
    text.appendChild(user);
    let titleGifo = document.createElement('h5');
    titleGifo.classList.add('titleGifo');
    titleGifo.textContent = el.title;
    text.appendChild(titleGifo);
    let corazon = document.createElement('div');
    corazon.classList.add('trash');
    divContAcciones.appendChild(corazon);
    let descargar = document.createElement('div');
    descargar.classList.add('descargar');
    divContAcciones.appendChild(descargar);
    divClosed.addEventListener('click',()=>{
        ampliarGifoSection.classList.add('hidden');
    })
    corazon.addEventListener('click',()=>{
        removeGifo(array,el);
        gifoCont.classList.add('hidden');
    })
    descargar.addEventListener('click', async() => {
        const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';
        let a = document.createElement('a');
        let response = await fetch(`https://media2.giphy.com/media/${el.id}/giphy.gif?${apiKey}&rid=giphy.gif`);
        let file = await response.blob();
        a.download = el.title;
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click()
    })
}

// ----sacar gifo de favoritos -----
function removeGifo( arr, item ) {
    var i = arr.indexOf( item );
    if ( i !== -1 ) {
        arr.splice( i, 1 );
        if(arr==0){
            btnVerMasFav.classList.add('hidden');
            emptyFavorite.classList.remove('hidden');
            localStorage.clear();
        }
    }
    
}