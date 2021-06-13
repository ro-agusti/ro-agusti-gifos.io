//--- cambiar a modo nocturno
const btnNightMode = document.getElementById('nightMode');
const aTheme = document.getElementById('aTheme');

btnNightMode.addEventListener('click', () => {
   // aTheme.textContent = 'Modo Diurno';
    document.body.classList.toggle('dark');
// guardamos el modo en el localstorage
    if(document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true');
    }else{
        localStorage.setItem('dark-mode', 'false');
    }
    // ---- modo nocturno header -----
  /*   document.querySelector('.header').classList.toggle('dark');
    document.querySelector('.logo').classList.toggle('dark');
    document.querySelector('.burger div').classList.toggle('dark');
    //------ document.querySelector('.burger-close div').classList.toggle('dark');
    //------ solo aparece un solo item de color blanco ------
    document.querySelector('.menu-ul li a').classList.toggle('dark');
    document.querySelector('.crear-gifo').classList.toggle('dark');
    document.querySelector('.menu-ul').classList.toggle('dark');

    // ---- modo nocturno title -----
    document.querySelector('.tittle .tittle-index').classList.toggle('dark');
 */
});
// obtenemos el modo actual en el que nos encontramos
if(localStorage.getItem('dark-mode')=== 'true'){
    document.body.classList.add('dark');
    aTheme.textContent = 'Modo Diurno';
}else{
    document.body.classList.remove('dark');
    //--- ver------------------
    aTheme.textContent = 'Modo Nocturno';
}
