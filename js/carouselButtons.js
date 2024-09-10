document.addEventListener('DOMContentLoaded', () => {
   const carousel = document.querySelector('.pillar-carousel');
   const nextButton = document.querySelectorAll('.arrow')[1]; // Right button
   const prevButton = document.querySelectorAll('.arrow')[0]; // Left button
   const cardWidth = document.querySelector('.pillar-card').offsetWidth + 16; // Adjust for card width and gap
   const totalCards = document.querySelectorAll('.pillar-card').length;
   const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth; // Maximum scroll based on content width
   let isScrolling; // Used for debouncing
   const debounceDelay = 50;

   // Initial state of buttons
   updateButtons();

   nextButton.addEventListener('click', () => {
      carousel.scrollBy({
         left: cardWidth,
         behavior: 'smooth',
      });
      updateButtons(); // Update instantly after click
      debounceUpdateButtons(); // Also debounce for manual scrolling
   });

   prevButton.addEventListener('click', () => {
      carousel.scrollBy({
         left: -cardWidth,
         behavior: 'smooth',
      });
      updateButtons(); // Update instantly after click
      debounceUpdateButtons(); // Also debounce for manual scrolling
   });

   function updateButtons() {
      // Disable previous button when at the far left
      if (carousel.scrollLeft <= 0) {
         prevButton.disabled = true;
      } else {
         prevButton.disabled = false;
      }

      // Disable next button when at the far right (with a small tolerance to account for rounding)
      if (carousel.scrollLeft >= maxScrollLeft - 1) {
         nextButton.disabled = true;
      } else {
         nextButton.disabled = false;
      }
   }

   function debounceUpdateButtons() {
      // Clear any previous scroll debounce timeout
      clearTimeout(isScrolling);
      // Set a timeout to run the update after scrolling finishes (with a reduced delay)
      isScrolling = setTimeout(() => {
         updateButtons();
      }, debounceDelay);
   }

   // Update buttons if user scrolls manually
   carousel.addEventListener('scroll', debounceUpdateButtons);
});
