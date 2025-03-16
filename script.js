const body = document.body;

if (body.id === "homePage") {
anime({
	targets: '#mylogo path',
	strokeDashoffset: [anime.setDashoffset, 0],
	easing: 'easeInOutSine',
	duration: 2500,
	delay: function(el, i) { return i * 250 },
	direction: 'alternate',
	loop: false
});

window.addEventListener('scroll', () => {
    document.querySelector(".navbar").classList.toggle
    ('window-scroll', window.scrollY > 0)
  });


function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menu = document.querySelector('.bx-menu');

    if (window.innerWidth < 1024) {
        sidebar.style.display = 'flex';
        menu.style.display = 'none';
    }
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const menu = document.querySelector('.bx-menu');

    if (window.innerWidth < 1024) {
        sidebar.style.display = 'none';
        menu.style.display = 'block';
    }
}

window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    const menu = document.querySelector('.bx-menu');

    if (window.innerWidth >= 1024) {
        sidebar.style.display = '';
        menu.style.display = '';
    }
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

async function startAnimations() {
    if (intro && (!introShown || performance.navigation.type === performance.navigation.TYPE_RELOAD)) {
        await hideIntro(); 
    } else {
        intro.style.display = 'none'; 
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('data-id');
            
            if (entry.isIntersecting && !sessionStorage.getItem(`animated-${id}`)) {
                entry.target.classList.add('in-view', 'animated');
                sessionStorage.setItem(`animated-${id}`, 'true');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0,  
        rootMargin: '0px 0px 20px 0px'
    });

    const allAnimatedElements = document.querySelectorAll('.animate');
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight; 

    allAnimatedElements.forEach((element, index) => {
        if (!element.hasAttribute('data-id')) {
            element.setAttribute('data-id', `animate-${index}`);
        }
        
        const id = element.getAttribute('data-id');
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY; 

        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            sessionStorage.removeItem(`animated-${id}`);
        }

        if (elementTop < scrollY + viewportHeight) {
            element.classList.add('in-view', 'animated');
            sessionStorage.setItem(`animated-${id}`, 'true');
        } else if (!sessionStorage.getItem(`animated-${id}`)) {
            observer.observe(element);
        }
    });
}

window.addEventListener('DOMContentLoaded', startAnimations);
window.addEventListener('popstate', () => {
    intro.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const aboutButton = document.querySelector('.aboutButton');

    if (aboutButton) {
        aboutButton.addEventListener('click', (event) => {
            event.preventDefault();  // Prevents default button behavior
            window.location.href = '/about/about.html';  // Redirect to about.html
        });
    }
});

} // end of body for homepage 






// window.onload = () => {
//     const transition_el = document.querySelector('.transition');
//     const aboutButton = document.querySelector('.aboutButton');
//     const viewMoreButton = document.querySelector('.viewMoreButton');
//     const clickDetailsButton1 = document.querySelector('.clickDetailsButton1');
//     const clickDetailsButton2 = document.querySelector('.clickDetailsButton2');

//     // Function to handle page transitions
//     function handlePageTransition(targetPage) {
//         transition_el.classList.add('is-active');
//         setTimeout(() => {
//             window.location.href = targetPage;
//         }, 1200);
//     }

//     if (aboutButton) {
//         aboutButton.addEventListener('click', (event) => {
//             event.preventDefault();
//             handlePageTransition('/about/about.html');
//         });
//     }

//     if (viewMoreButton) {
//         viewMoreButton.addEventListener('click', (event) => {
//             event.preventDefault();
//             handlePageTransition('/myDesigns/dashboardDesktop/dashboard.html');
//         });
//     }

//     if (clickDetailsButton1) {
//         clickDetailsButton1.addEventListener('click', (event) => {
//             event.preventDefault();
//             handlePageTransition('/myDesigns/foodAppMobile/cover.html');
//         });
//     }

//     if (clickDetailsButton2) {
//         clickDetailsButton2.addEventListener('click', (event) => {
//             event.preventDefault();
//             handlePageTransition('/dataAnalysis/dataJobs/dataJobs.html');
//         });
//     }

//     // Fix for the browser back button
//     window.addEventListener("popstate", () => {
//         transition_el.classList.remove('is-active'); // Ensure transition resets when going back
//     });

//     // Reset transition when page loads
//     setTimeout(() => {
//         transition_el.classList.remove('is-active');
//     }, 1000);
// };
