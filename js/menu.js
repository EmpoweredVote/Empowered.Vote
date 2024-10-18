const menu = document.getElementById('menu');
const navBtnContainer = document.querySelector('.nav-btn-container');
const blur = document.getElementById('blur-overlay');

document.getElementById('hamburger-menu-btn').addEventListener('click', () => {
   if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      blur.classList.remove('active');

      // Animate the X back to a hamburger
      gsap.to('.flex-btn svg:nth-child(1)', {
         rotation: 0,
         y: 0,
         duration: 0.3,
      });
      gsap.to('.flex-btn svg:nth-child(2)', { opacity: 1, duration: 0.3 });
      gsap.to('.flex-btn svg:nth-child(3)', {
         rotation: 0,
         y: 0,
         duration: 0.3,
      });
   } else {
      // Open menu
      menu.classList.add('active');

      blur.classList.add('active');

      // Animate hamburger to X
      gsap.to('.flex-btn svg:nth-child(1)', {
         rotation: 45,
         y: 7,
         duration: 0.3,
      });
      gsap.to('.flex-btn svg:nth-child(2)', { opacity: 0, duration: 0.3 });
      gsap.to('.flex-btn svg:nth-child(3)', {
         rotation: -45,
         y: -5,
         duration: 0.3,
      });
   }
});

const menuLinks = document.querySelectorAll('.menu-items a');

menuLinks.forEach((link) => {
   link.addEventListener('click', () => {
      // Remove 'active' class from menu and blur overlay
      menu.classList.remove('active');
      blur.classList.remove('active');

      // Optionally, revert the hamburger menu animation
      gsap.to('.flex-btn svg:nth-child(1)', {
         rotation: 0,
         y: 0,
         duration: 0.3,
      });
      gsap.to('.flex-btn svg:nth-child(2)', { opacity: 1, duration: 0.3 });
      gsap.to('.flex-btn svg:nth-child(3)', {
         rotation: 0,
         y: 0,
         duration: 0.3,
      });
   });
});
