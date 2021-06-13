//--- cambiar a modo nocturno
const btnNightMode = document.getElementById('nightMode');
const aTheme = document.getElementById('aTheme');

btnNightMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
// guardamos el modo en el localstorage
    if(document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true');
        aTheme.textContent = 'Modo Diurno';
    }else{
        localStorage.setItem('dark-mode', 'false');
        aTheme.textContent = 'Modo Nocturno';
    }
});
// obtenemos el modo actual en el que nos encontramos
if(localStorage.getItem('dark-mode')=== 'true'){
    document.body.classList.add('dark');
    aTheme.textContent = 'Modo Diurno';
}else{
    document.body.classList.remove('dark');
    aTheme.textContent = 'Modo Nocturno';
}


