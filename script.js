
anime({
  targets: '#mylogo path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 2500,
  delay: (el, i) => i * 250,
  direction: 'alternate',
  loop: false
});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function hideIntro() {
  const intro = document.querySelector('.intro');
  if (!intro) return;
  intro.style.top = '0'; 
  await delay(2500);
  await delay(1000);
  intro.style.top = '-100%';
}

async function startAnimations() {
  const intro = document.querySelector('.intro');
  const introShown = sessionStorage.getItem('introShown');

  if (intro && !introShown) {
    await hideIntro();
    sessionStorage.setItem('introShown', 'true');
  } else if (intro) {
    intro.style.display = 'none';
  }

  const animatedElements = document.querySelectorAll('.animate');
  animatedElements.forEach(el => {
    el.classList.remove('in-views', 'animated');
    void el.offsetWidth;
    el.classList.add('in-views', 'animated');
  });
} 




function initCustomCursor() {
  const customCursor = document.querySelector('.customCursor');
  if (!customCursor) return;

  const circleStyle = customCursor.style;

  document.addEventListener('mousemove', e => {
    circleStyle.top = `${e.clientY - customCursor.offsetHeight / 2}px`;
    circleStyle.left = `${e.clientX - customCursor.offsetWidth / 2}px`;
  });

  document.addEventListener('click', (e) => {
    const effect = document.createElement('div');
    effect.classList.add('click-effect');
    effect.style.left = `${e.clientX}px`;
    effect.style.top = `${e.clientY}px`;
    document.body.appendChild(effect);

    effect.addEventListener('animationend', () => {
      effect.remove();
    });
  });
  }
window.initCustomCursor = initCustomCursor;




function initNavbar() {
  if (window._navbarInitialized) return;
  window.addEventListener('scroll', () => {
    document.querySelector(".navContainer")?.classList.toggle(
      'window-scroll',
      window.scrollY > 0
    );
  });
  window._navbarInitialized = true; 
}
window.initNavbar = initNavbar;




function swiperCarousel() {
  const swiper = new Swiper('.myGallerySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      450: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
      }
    }
  });
}
window.swiperCarousel = swiperCarousel;




function showImageWhenReady() {
    const image1Images = document.querySelectorAll('.image1Containers .image1');
    const coverImageImages = document.querySelectorAll('.coverImage');
    
    image1Images.forEach((img) => {
      const container = img.closest('.image1Containers'); 
      if (!img || !container) return;
  
      if (img.complete) {
        img.classList.add('loaded');
        img.style.opacity = "1"; 
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          img.style.opacity = "1"; 
        });
      }
    });
  
    coverImageImages.forEach((img) => {
      const container = img.closest('.coverImageContainer'); 
      
      if (!img || !container) return;
  
      if (img.complete) {
        img.classList.add('loaded');
        img.style.opacity = "1"; 
        container.style.backgroundColor = 'white';
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          img.style.opacity = "1"; 
        });
      }
    });
}
window.addEventListener("pageshow", showImageWhenReady); 
document.addEventListener("DOMContentLoaded", showImageWhenReady);
window.showImageWhenReady = showImageWhenReady;




function smoothScroll() {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
window.smoothScroll = smoothScroll; 




function delay(n) {
  return new Promise(done => setTimeout(done, n || 2000));
}

function pageTransition() {
  const tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });
  tl.to(".loading-screen", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%" });
}

function initNavMenu() {
  if (initNavMenu._initialized) return;
  initNavMenu._initialized = true;

  document.addEventListener('click', (event) => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    if (event.target.closest('.openButton')) {
      sidebar.classList.add('open');
      return;
    }

    if (event.target.closest('.closeButton')) {
      sidebar.classList.remove('open');
      return;
    }

    if (
      event.target.closest('.nav_menu a') ||
      event.target.closest('.sidebar a')
    ) {
      const allLinks = document.querySelectorAll('.nav_menu a, .sidebar a');
      allLinks.forEach(link => link.classList.remove('active'));

      event.target.classList.add('active');

      sidebar.classList.remove('open');
      return;
    }
  });
}
window.initNavMenu = initNavMenu;

$(function () {
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    sessionStorage.removeItem('introShown');
  }
  initNavMenu();  

  barba.init({
    sync: true,
    transitions: [
      {
        async leave() {
          const done = this.async();
          pageTransition();
          await delay(1200);
          done();
        },
        async afterEnter() {
          window.scrollTo(0, 0);
          if (window.initCustomCursor) initCustomCursor();
          if (window.initNavbar) initNavbar();
          if (window.initSidebar) initSidebar();
          if (window.showImageWhenReady) showImageWhenReady();
          if (window.smoothScroll) smoothScroll();
          if (window.swiperCarousel) swiperCarousel();
          await startAnimations(); 
        }
      }
    ]
  });

  startAnimations();

  if (window.initCustomCursor) initCustomCursor();
  if (window.initNavbar) initNavbar();
  if (window.initSidebar) initSidebar();
  if (window.smoothScroll) smoothScroll();
  if (window.swiperCarousel) swiperCarousel();
  if (window.showImageWhenReady) showImageWhenReady();


});


