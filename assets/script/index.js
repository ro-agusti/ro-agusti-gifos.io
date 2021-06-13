// ---- searching ----
const buscador = document.getElementById('buscador');
const search = document.getElementById('buscaGifos');
const trending = document.getElementById('trending');
const magnifier1 = document.getElementById('magnifier1');
const magnifier2 = document.getElementById('magnifier2');
const contLi = document.getElementById('cont-li');
const closeSuggestion = document.getElementById('closeSuggestion');

window.addEventListener("keydown", (e) => {
    magnifier1.classList.remove('hidden');
    magnifier2.classList.add('hidden');
    buscador.classList.remove('buscador');
    buscador.classList.add('buscador-con-sugerencias');
    suggestion(search.value);
    if (e.key == "Enter") {
        magnifier1.classList.add('hidden');
        magnifier2.classList.remove('hidden');
        buscador.classList.add('buscador');
        buscador.classList.remove('buscador-con-sugerencias');
        let busqueda = search.value;
        newSearch(busqueda);
    }
});
closeSuggestion.addEventListener('click', () => {
    magnifier1.classList.add('hidden');
    magnifier2.classList.remove('hidden');
    buscador.classList.remove('buscador-con-sugerencias');
    buscador.classList.add('buscador');
})

const favoritos = [];

let cantidad = 12;
const buttonVerMas = document.getElementById('btnVerMas');

buttonVerMas.addEventListener('click', () => {
    cantidad += 12;
    console.log(cantidad);
    newSearch(search.value);

})
if (cantidad>= 30) {
    buttonVerMas.classList.add('hidden');
}
//---- funcion de sugerencias -----
async function suggestion(tag) {
    const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';
    const url = `https://api.giphy.com/v1/tags/related/{${tag}}?api_key=${apiKey}`;
    try {
        const resp = await fetch(url);
        const info = await resp.json();

        while (contLi.lastChild) {
            contLi.lastChild.remove();
        }

        for (let i = 0; i < 4; i++) {

            let suggestionX = info.data[i].name;
            let li = document.createElement('li');
            let magnifierLI = document.createElement('div');
            magnifierLI.classList.add('magnifier');
            li.appendChild(magnifierLI);
            let h6 = document.createElement('h6');
            h6.textContent = suggestionX;
            li.appendChild(h6);
            contLi.appendChild(li);


        }

    } catch (err) {
        console.log(err);
    }
}


//---- buscador superior ----
window.addEventListener('scroll',()=>{
    buscador.classList.toggle('buscador-fixed',window.scrollY>350);
    //buscador.classList.toggle('buscador-con-sugerencias-fixed',window.scrollY>350);
})



// ---- eliminar btn ver mas al superar los 30 gifos ----
/* if (cantidad >= 30) {
    btnVerMas.classList.add('hidden');
} */


// ---- llamar a la API ----
async function newSearch(gifo) {

    const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifo}&limit=${cantidad}`;

    try {
        const response = await fetch(url);
        const info = await response.json();
        const searching = document.getElementById('searching');
        trending.classList.add('hidden');
        while (searching.lastChild) {
            searching.lastChild.remove()
        }

        buttonVerMas.classList.remove('hidden');
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('line-div');
        searching.appendChild(lineDiv);
        const typeOfGifo = document.createElement('h2');
        typeOfGifo.classList.add('type-of-gifo');
        typeOfGifo.textContent = gifo.toUpperCase();
        searching.appendChild(typeOfGifo);
        const conteiner = document.createElement('div');
        conteiner.classList.add('conteiner');
        searching.appendChild(conteiner);

        for (let i = 0; i < cantidad; i++) {
            let gifoCont = document.createElement('div');
            gifoCont.classList = 'gifoCon';
            conteiner.appendChild(gifoCont);
            let img = document.createElement('img');
            img.src = info.data[i].images.original.url;
            gifoCont.appendChild(img);
            let bgGifo;

            let idGifo = info.data[i].id;
            let titleGifo = info.data[i].title;
            let userGifo = info.data[i].username;
            let urlGifo = img.src;

            img.addEventListener('mouseenter', () => {
                bgGifo = document.createElement('div');
                bgGifo.classList.add('bgGifo');
                gifoCont.appendChild(bgGifo);
                let acciones = document.createElement('div');
                acciones.classList = 'acciones';
                bgGifo.appendChild(acciones);
                let corazon = document.createElement('div');
                corazon.classList = 'corazon';
                corazon.getAttribute('id');
                corazon.setAttribute('id', info.data[i].id);//-----------------
                acciones.appendChild(corazon);
                let aDescargar = document.createElement('a');
                aDescargar.href = '#';
                acciones.appendChild(aDescargar);


                let descargar = document.createElement('div');
                descargar.classList = 'descargar';
                aDescargar.appendChild(descargar);
                let ampliar = document.createElement('div');
                ampliar.classList = 'ampliar';
                acciones.appendChild(ampliar);
                let objetoGifo = {
                    id: idGifo,
                    username: userGifo,
                    title: titleGifo,
                    gifo: urlGifo
                }
                corazon.addEventListener('click', () => {
                    getFavoritos(objetoGifo);
                })
                descargar.addEventListener('click', async () => {
                    let a = document.createElement('a');
                    let response = await fetch(`https://media2.giphy.com/media/${objetoGifo.id}/giphy.gif?${apiKey}&rid=giphy.gif`);
                    let file = await response.blob();
                    a.download = objetoGifo.title;
                    a.href = window.URL.createObjectURL(file);
                    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                    a.click()
                })
                ampliar.addEventListener('click', () => {
                    ampliarGifo(objetoGifo);
                })
            })
            gifoCont.addEventListener('mouseleave', () => {
                bgGifo.classList.remove('bgGifo');
            })
        }
    } catch (err) {
        console.log(err);
        const sinResultados = document.getElementById('sinResultados');
        sinResultados.classList.remove('hidden');
        buttonVerMas.classList.add('hidden');

    }

}

//---- funcion para descargar gifo -----
/* function downloadGifo(el){
    let a = document.createElement('a');
                    let respuesta = await fetch(`https://media2.giphy.com/media/${el.id}/giphy.gif?${apiKey}&rid=giphy.gif`);
                    let file = await respuesta.blob();
                    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
                    a.download = el.title;
                    a.href = window.URL.createObjectURL(file);
                    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
                    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                    //click on element to start download
                    a.click()
} */

//-----funcion cargar local storage ------
function getFavoritos(newGifo) {
    let itemFavorito = favoritos.find(el => el.id == newGifo.id);
    if (itemFavorito) {
        console.log('ya es un favorito');
    } else {
        favoritos.push(newGifo);
        console.log('se agrego al carrito');
        console.log(favoritos);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
}

//----- ampliar gifo -----
const ampliarGifoSection = document.getElementById('ampliarGifoSection');
function ampliarGifo(el) {
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
    divClosed.addEventListener('click', () => {
        ampliarGifoSection.classList.add('hidden');
    })
    corazon.addEventListener('click', () => {
        getFavoritos(el);
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
}
//export { ampliarGifo, getFavoritos };

