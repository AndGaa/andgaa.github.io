// function loadHeader() {
//     const header = document.getElementById('header');
//     if (!header) return;
//     const BASE_PATH = location.pathname.includes('/projects') ? '..' : '.';

//     header.innerHTML = `
//     <div class="inner">
//         <a href="#" class="image avatar">
//         <img src="${BASE_PATH}/images/thumbs/profile.jpg" alt="" />
//         </a>
//                 <h1><strong>I am Strata</strong>, a super simple<br />
//                 responsive site template freebie<br />
//                 crafted by <a href="http://html5up.net">HTML5 UP</a>.</h1>
//             </div>
//         `;

//     }


// function loadFooter() {
//     const footer = document.getElementById('footer');
//     if (!footer) return;
//     footer.innerHTML = `
//         		<div class="inner">
// 					<ul class="icons">
// 						<li><a href="https://www.linkedin.com/in/andreas-gaardsted-vad/" class="icon brands fa-linkedin"><span class="label">LinkedIn</span></a></li>
// 						<li><a href="https://github.com/AndGaa" class="icon brands fa-github"><span class="label">Github</span></a></li>

// 						<li><a href="mailto:andreasgaardsted@gmail.com" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
// 					</ul>

// 				</div>
//         `;
//         console.log('footer loaded');
//     }

// // Load header and footer
// // document.addEventListener('DOMContentLoaded', () => {
// //     loadFooter();
// //     loadHeader();
// // });

// loadFooter();
// loadHeader();

// /assets/js/components.js
(() => {

  async function loadComponent(el) {
    const name = el.dataset.component;
    if (!name) return;

    const res = await fetch(`/assets/components/${name}.html`);
    if (!res.ok) {
      console.error(`Failed to load component: ${name}`);
      return;
    }

    el.innerHTML = await res.text();
  }

  async function loadAllComponentsSequential() {
    const components = document.querySelectorAll('[data-component]');
    for (const el of components) {
      await loadComponent(el);
    }
  }

  // IMMUNITY LAYER
  window.addEventListener('load', () => {
    requestAnimationFrame(loadAllComponentsSequential);
  });

})();

