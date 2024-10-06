document.getElementById('hamburger-menu-btn').addEventListener('click', () => {
   const menu = document.getElementById('menu');
   const blurOverlay = document.getElementById('blur-overlay');
   const navBtnContainer = document.querySelector('.nav-btn-container');

   if (menu.classList.contains('active')) {
      // Close menu
      menu.classList.remove('active');
      blurOverlay.classList.remove('active');
      navBtnContainer.classList.remove('fixed'); // Remove fixed position

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
      blurOverlay.classList.add('active');
      navBtnContainer.classList.add('fixed'); // Fix the position of buttons

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
