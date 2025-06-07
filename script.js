const body = document.body;

if (body.id === "homePage") {

  anime({
    targets: '#mylogo path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2500,
    delay: (el, i) => i * 250,
    direction: 'alternate',
    loop: false
  });

    const intro = document.querySelector('.intro');
  const introShown = sessionStorage.getItem('introShown');

  function hideIntro() {
    return new Promise(resolve => {
      setTimeout(() => {
        intro.style.top = '-100%';
        sessionStorage.setItem('introShown', 'true');
        resolve();
      }, 3000);
    });
  }

  async function runIntroOnce() {
    if (intro && (!introShown || performance.navigation.type === performance.navigation.TYPE_RELOAD)) {
      await hideIntro();
    } else {
      intro.style.display = 'none';
    }
  }

  window.addEventListener('DOMContentLoaded', runIntroOnce);

  window.addEventListener('popstate', () => {
    if (intro) intro.style.display = 'none';
  });
}






function initCustomCursor() {
  const customCursor = document.querySelector('.customCursor');
  if (!customCursor) return; // In case the element is not on the page

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
// initCustomCursor();






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
// initNavbar();



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
// swiperCarousel();






function smoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

window.smoothScroll = smoothScroll; 
// smoothScroll();




// Origninal InitNavMenu

// function initNavMenu() {
//   const openBtn = document.querySelector('.openButton');
//   const closeBtn = document.querySelector('.closeButton');
//   const sidebar = document.querySelector('.sidebar');

//     if (!openBtn || !closeBtn || !sidebar) {
//     console.log('One or more elements missing:', { openBtn, closeBtn, sidebar });
//     return;
//   }

//   if (openBtn && closeBtn && sidebar) {
//     openBtn.addEventListener('click', () => {
//       sidebar.classList.add('open');
//     });

//     closeBtn.addEventListener('click', () => {
//       sidebar.classList.remove('open');
//     });
//   }

//   const allLinks = document.querySelectorAll('.nav_menu a, .sidebar a');

//   if (allLinks.length) {
//     allLinks.forEach(link => {
//       link.addEventListener('click', () => {
//         allLinks.forEach(l => l.classList.remove('active'));
//         link.classList.add('active');
//         if (sidebar) sidebar.classList.remove('open');
//       });
//     });
//   }
// }

// window.initNavMenu = initNavMenu;
// initNavMenu();




// ////////////////////////////////////////////////////////////////  Working Barba JS

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
  initNavMenu();  

  barba.init({
    sync: true,
    transitions: [
      {
        async leave() {
          const done = this.async();
          pageTransition();
          await delay(1000);
          done();
        },
        async afterEnter() {
          window.scrollTo(0, 0);
          if (window.initCustomCursor) initCustomCursor();
          if (window.initNavbar) initNavbar();
          if (window.initSidebar) initSidebar();
          if (window.smoothScroll) smoothScroll();
          if (window.swiperCarousel) swiperCarousel();

          // gsap.set('.slide-in', {
          //   opacity: 0,
          //   y: 50,
          //   filter: 'blur(3px)'
          // });

          // await new Promise(resolve => setTimeout(resolve, 800));

          // gsap.to('.slide-in', {
          //   opacity: 1,
          //   y: 0,
          //   filter: 'blur(0px)',
          //   duration: 1,
          //   ease: 'power2.out',
          //   stagger: 0.1
          // });
        }
      }
    ]
  });

  if (window.initCustomCursor) initCustomCursor();
  if (window.initNavbar) initNavbar();
  if (window.initSidebar) initSidebar();
  if (window.smoothScroll) smoothScroll();
  if (window.swiperCarousel) swiperCarousel();

});



// function delay(n) {
//   return new Promise(done => {
//     setTimeout(done, n || 2000);
//   });
// }

// function pageTransition() {
//   const tl = gsap.timeline();
//   tl.to(".loading-screen", {
//     duration: 1.2,
//     width: "100%",
//     left: "0%",
//     ease: "Expo.easeInOut",
//   });

//   tl.to(".loading-screen", {
//     duration: 1,
//     width: "100%",
//     left: "100%",
//     ease: "Expo.easeInOut",
//     delay: 0.3,
//   });
//   tl.set(".loading-screen", { left: "-100%" });
// }

// $(function () {
//   barba.init({
//     sync: true,
//     transitions: [
//       {
//         async leave(data) {
//           const done = this.async();
//           pageTransition();
//           await delay(1000);
//           done();
//         },
// async afterEnter(data) {
//     if (window.initCustomCursor) initCustomCursor();
//     if (window.initNavbar) initNavbar();
//     if (window.initSidebar) initSidebar();
//     if (window.initNavMenu) initNavMenu();


//   gsap.set('.slide-in', {
//     opacity: 0,
//     y: 50,
//     filter: 'blur(3px)'
//   });

//   await new Promise(resolve => setTimeout(resolve, 800)); 


//   gsap.to('.slide-in', {
//     opacity: 1,
//     y: 0,
//     filter: 'blur(0px)',
//     duration: 1,
//     ease: 'power2.out',
//     stagger: 0.1
//   });
// }
//       }
//     ]
//   });

//   if (window.initCustomCursor) initCustomCursor();
//   if (window.initNavbar) initNavbar();
//     if (window.initSidebar) initSidebar();
//     if (window.initNavMenu) initNavMenu();

// });

