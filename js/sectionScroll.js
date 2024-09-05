document.addEventListener('DOMContentLoaded', function () {
   const sections = document.querySelectorAll('.scroll-section');

   gsap.registerPlugin(ScrollTrigger);

   sections.forEach((section) => {
      const text = section.querySelector('.scroll-text');
      const numberIcon = section.querySelector('.number-icon svg'); // Correctly target the SVG
      const rect = numberIcon.querySelector('#rect1');
      const num = numberIcon.querySelector('#num1');
      const bgColor = section.getAttribute('data-color');
      const numRotation = section.getAttribute('rotation');
      const defaultRectColor = section.getAttribute('data-default-rect');
      const defaultNumColor = section.getAttribute('data-default-num');

      // Create a timeline for the section animations
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: section,
            start: 'top 25%',
            end: 'top 0%',
            toggleActions: 'play none none reverse',
         },
      });

      // Animate section background color first
      tl.to(section, {
         backgroundColor: bgColor, // Section background color
         duration: 0.35,
      });

      // Animate text color next
      tl.to(
         text,
         {
            color: '#FFF', // Text color
            duration: 0.35,
         },
         '-=0.25'
      ); // Overlap by 0.25s to make it more fluid

      if (rect && num) {
         // Animate the rect fill color after text color change
         tl.to(
            rect,
            {
               fill: '#FFF', // Initially set to match the final text color
               duration: 0.35,
            },
            '-=0.35'
         ); // Sync with text color

         // Animate the num fill color after rect color change
         tl.to(
            num,
            {
               fill: bgColor, // Match number fill to section background color
               duration: 0.35,
            },
            '-=0.35'
         ); // Sync with text color
      }

      // Animate SVG rotation if needed
      tl.to(
         numberIcon,
         {
            rotate: numRotation, // Rotate the SVG icon if needed
            duration: 0.35,
         },
         '-=0.35'
      ); // Sync with text color
   });
});
