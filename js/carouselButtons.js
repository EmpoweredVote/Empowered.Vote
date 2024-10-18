// Include GSAP and ScrollToPlugin scripts or import them
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
   const carousel = document.querySelector('.pillar-carousel');
   const nextButton = document.querySelectorAll('.arrow')[1]; // Right button
   const prevButton = document.querySelectorAll('.arrow')[0]; // Left button
   const cards = document.querySelectorAll('.pillar-card');
   const totalCards = cards.length;
   let currentIndex = 0; // Keep track of current card index
   let isAnimating = false; // Flag to track if animation is in progress

   // Define widths
   const activeWidth = 55; // Active pillar width in %
   const inactiveWidth = (98 - activeWidth) / (totalCards - 1); // Distribute remaining width
   const svgActiveWidth = 50;
   const svgInactiveWidth = 100;

   // Initial setup
   // setInitialScales();
   setActiveCard(currentIndex);
   updateButtons();

   nextButton.addEventListener('click', () => {
      if (currentIndex < totalCards - 1 && !isAnimating) {
         currentIndex++;
         setActiveCard(currentIndex);
         updateButtons();
      }
   });

   prevButton.addEventListener('click', () => {
      if (currentIndex > 0 && !isAnimating) {
         currentIndex--;
         setActiveCard(currentIndex);
         updateButtons();
      }
   });

   // function setInitialScales() {
   //    cards.forEach((card, idx) => {
   //       const svg = card.querySelector('svg');
   //       if (idx === currentIndex) {
   //          gsap.set(svg, { scaleY: 1, y: '0%', width: `${svgActiveWidth}%` });
   //       } else {
   //          const scaleY = 1; // Inactive scale factor
   //          const yTranslation = `${(1 - scaleY) * 100}%`;
   //          gsap.set(svg, { scaleY, y: yTranslation });
   //       }
   //    });
   // }

   function setActiveCard(index) {
      isAnimating = true; // Set flag to true

      // Remove 'active' class from all cards
      cards.forEach((card) => card.classList.remove('active'));

      // Add 'active' class to current card
      const activeCard = cards[index];
      activeCard.classList.add('active');

      // Calculate the target scroll position
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      const carouselWidth = carousel.clientWidth;
      const scrollToPosition = cardLeft - (carouselWidth - cardWidth) / 2;

      // Create a GSAP timeline
      const tl = gsap.timeline({
         onComplete: () => {
            isAnimating = false; // Reset flag when animation completes
         },
      });

      if (window.innerWidth >= 1024) {
         cards.forEach((card, idx) => {
            const svg = card.querySelector('svg');
            const header = card.querySelector('h1');
            const paragraph = card.querySelector('p');

            if (idx === index) {
               tl.to(card, { width: `${activeWidth}%`, duration: 0.5 }, 0);

               // Animate SVG width
               tl.to(
                  svg,
                  {
                     width: `${svgActiveWidth}%`,
                     duration: 0.5,
                  },
                  0
               );

               // Animate paragraph height and opacity
               tl.to(
                  paragraph,
                  {
                     height: '162px',
                     fontSize: `${window.innerWidth > 1280 ? '24px' : '20px'}`,
                     opacity: 1,
                     duration: 0.35,
                     ease: 'power2.out',
                  },
                  0.5 // Start after card expansion
               );

               tl.to(
                  header,
                  {
                     y: '-12px', // Move up slightly
                     duration: 0.35,
                     ease: 'power2.out',
                  },
                  0.5 // Align with paragraph animation
               );
            } else {
               // Inactive cards
               tl.to(card, { width: `${inactiveWidth}%`, duration: 0.5 }, 0);

               // Reset header position
               tl.to(
                  header,
                  {
                     y: '0px',
                     duration: 0.5,
                     ease: 'power2.inOut',
                  },
                  0
               );

               // Animate paragraph height and opacity
               tl.to(
                  paragraph,
                  {
                     height: '0',
                     opacity: 0,
                     duration: 0.35,
                     ease: 'power2.out',
                  },
                  0 // Start after card expansion
               );

               // Animate SVG width
               tl.to(
                  svg,
                  {
                     width: `${svgInactiveWidth}%`,
                     duration: 0.5,
                  },
                  0
               );
            }
         });
      }

      // Adjust scroll position during width animation
      tl.to(
         carousel,
         {
            scrollTo: { x: scrollToPosition },
            duration: 0.5,
            ease: 'power2.inOut',
         },
         0 // Start at the same time as width animation
      );
   }
   function updateButtons() {
      prevButton.disabled = currentIndex <= 0;
      nextButton.disabled = currentIndex >= totalCards - 1;
   }

   // Scroll event listener and related functions
   carousel.addEventListener('scroll', debounceUpdateCurrentIndex);

   let isScrolling;
   const debounceDelay = 100;

   function debounceUpdateCurrentIndex() {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
         updateCurrentIndex();
         updateButtons();
      }, debounceDelay);
   }

   function updateCurrentIndex() {
      if (isAnimating) return; // Do not update currentIndex if animating

      const scrollLeft = carousel.scrollLeft;
      let closestIndex = 0;
      let minDistance = Infinity;
      cards.forEach((card, index) => {
         const cardLeft = card.offsetLeft;
         const cardWidth = card.offsetWidth;
         const carouselWidth = carousel.clientWidth;
         const cardCenter = cardLeft + cardWidth / 2;
         const carouselCenter = scrollLeft + carouselWidth / 2;
         const distance = Math.abs(carouselCenter - cardCenter);
         if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
         }
      });
      if (currentIndex !== closestIndex) {
         currentIndex = closestIndex;
         setActiveCard(currentIndex);
         updateButtons();
      }
   }
});
