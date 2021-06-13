
import {  getFavoritos } from './index.js';

//--- cambiar a modo nocturno
/* const themeFav = document.getElementById('dark-theme-fav');
const aTheme = document.getElementById('aTheme');
const btnNightMode = document.getElementById('nightMode');
btnNightMode.addEventListener('click', () =>{
    if(themeFav.getAttribute('href')== './assets/style/style.css'){
        themeFav.href = './assets/night-style/night-style-fav.css';
        aTheme.textContent='Modo Diurno';
    }else{
        themeFav.href = './assets/style/style.css';
        aTheme.textContent='Modo Nocturno';
    }
});  
 */

//btnVerMas.classList.add('hidden');
//console.log(localStorage.getItem(''));
let storageFavoritos = localStorage.getItem('favoritos');
let favoritos;
if (storageFavoritos) {
    favoritos = JSON.parse(storageFavoritos);
} else {
    favoritos = [];
}
const gifsConteiner = document.getElementById('gifsConteiner');
console.log(favoritos);
const btnVerMasFav = document.getElementById('btn-verMas-favoritos');
const emptyFavorite = document.getElementById('emptyFavorite');
//import {ampliarGifo}  from './index.js';



const getGifoForEach = (array) => {
    if (array.length > 0) {
        array.forEach((el) => {
            //console.log(el.gifo);
            let gifoCont = document.createElement('div');
            gifoCont.classList.add('gifoCon');
            gifsConteiner.appendChild(gifoCont);
            let imgFavoritos = document.createElement('img');
            imgFavoritos.src = el.gifo;
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
                //corazon.getAttribute('id');
                //corazon.setAttribute('id', info.data[i].id);//-----------------
                acciones.appendChild(corazon);
                //console.log(corazon);
                let descargar = document.createElement('div');
                descargar.classList = 'descargar';
                acciones.appendChild(descargar);
                let ampliar = document.createElement('div');
                ampliar.classList = 'ampliar';
                acciones.appendChild(ampliar);
                corazon.addEventListener('click', () => {
                    removeGifoFromFavoritos(array,el);
                    gifoCont.classList.add('hidden');
                    //array.filter(x => x == el);
                    //array.slice()
                }) 
               ampliar.addEventListener('click',()=>{
                    ampliarGifoFav(el);
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
            })
            gifoCont.addEventListener('mouseleave', () => {
                bgGifo.classList.remove('bgGifo');

            })
        });
    } else {
        btnVerMasFav.classList.add('hidden');
        emptyFavorite.classList.remove('hidden');
        //console.log('array vacio')
    }

};


// ----sacar gifo de favoritos -----
function removeGifoFromFavoritos( arr, item ) {
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

getGifoForEach(favoritos);

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
    imgGifo.src = el.gifo;
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
    corazon.classList.add('corazon-violeta');
    divContAcciones.appendChild(corazon);
    let descargar = document.createElement('div');
    descargar.classList.add('descargar');
    divContAcciones.appendChild(descargar);
    divClosed.addEventListener('click',()=>{
        ampliarGifoSection.classList.add('hidden');
    })
    corazon.addEventListener('click',()=>{
        getFavoritos(el);
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