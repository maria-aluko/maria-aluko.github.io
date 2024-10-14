const backToTop = document.querySelector('#backTopBtn');

backToTop.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

const mobileButton = document.querySelector('.mobile');
const navList = document.querySelector('nav ul');

const toggleMenu = () => {
  navList.classList.toggle('responsive');
}

mobileButton.addEventListener('click', toggleMenu);

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.querySelector('.header-banner').style.backgroundColor = "#000610";
  } else {
    document.querySelector('.header-banner').style.backgroundColor = "transparent";
  }
}