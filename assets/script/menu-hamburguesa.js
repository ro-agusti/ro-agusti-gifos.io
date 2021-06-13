//----menu-----
const burger = document.getElementById('burger');
const menu = document.getElementById('menu-ul');
const header = document.getElementById('header');
burger.addEventListener('click', () => {
    menu.classList.toggle('menu-ul_visible');
    burger.classList.toggle('burger-close');
    //burger.classList.remove('burger');
});

window.addEventListener('scroll',()=>{
    header.classList.toggle('shadow',window.scrollY>50);
})
