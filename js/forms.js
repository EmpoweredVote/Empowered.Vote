// forms.js

// Function to handle button clicks
function handleFormClick(event) {
   // Get the id of the clicked button
   const clickedButtonId = event.currentTarget.id;

   // Map button ids to corresponding menu ids
   const menuMap = {
      playtest: 'playtest-menu',
      volunteer: 'volunteer-menu',
      donate: 'donate-menu',
   };

   // Hide the main menu
   const mainMenu = document.getElementById('main-menu');
   mainMenu.style.display = 'none';

   // Show the corresponding menu
   const menuIdToShow = menuMap[clickedButtonId];
   const menuToShow = document.getElementById(menuIdToShow);
   if (menuToShow) {
      menuToShow.style.display = 'flex';
   } else {
      console.error('Menu not found for button:', clickedButtonId);
   }
}

function goBack() {
   // Hide all menus
   const menus = document.querySelectorAll('.menu-container');
   menus.forEach((menu) => {
      menu.style.display = 'none';
   });

   // Show the main menu
   const mainMenu = document.getElementById('main-menu');
   mainMenu.style.display = 'flex';

   const navBar = document.getElementById('form-nav');
   navBar.style.display = 'flex';

   // Optionally, scroll to the top of the page
   window.scrollTo(0, 0);
}

// Attach event listeners to the buttons
document.addEventListener('DOMContentLoaded', function () {
   const divButtons = document.querySelectorAll('div.form-button');
   divButtons.forEach((button) => {
      button.addEventListener('click', handleFormClick);
   });
});

// forms.js

document.addEventListener('DOMContentLoaded', function () {
   const playtestForm = document.getElementById('playtest-form');
   const thankYou = document.getElementById('thank-you');
   const navBar = document.getElementById('form-nav');

   if (playtestForm) {
      playtestForm.addEventListener('submit', function (event) {
         event.preventDefault(); // Prevent default form submission

         // Gather form data
         const formData = new FormData(playtestForm);

         // Convert FormData to a URL-encoded string
         const formParams = new URLSearchParams();
         for (const pair of formData) {
            formParams.append(pair[0], pair[1]);
         }

         // Send data to Google Apps Script Web App
         fetch(
            'https://script.google.com/macros/s/AKfycbzukjju7u-pfsZFGCbBGhMs0uDnNShNh0qMv3yQu0axbE3Nea0A5kwV5Z-HQ6Eh7kmC/exec',
            {
               method: 'POST',
               mode: 'no-cors',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formParams.toString(),
            }
         )
            .then(() => {
               // Show a thank-you message or redirect

               playtestForm.reset();
               document.getElementById('playtest-menu').style.display = 'none';
               thankYou.style.display = 'flex';
               navBar.style.display = 'none';
            })
            .catch((error) => {
               console.error('Error!', error.message);
            });
      });
   }

   const volunteerForm = document.getElementById('volunteer-form');

   if (volunteerForm) {
      volunteerForm.addEventListener('submit', function (event) {
         event.preventDefault(); // Prevent default form submission

         // Gather form data
         const formData = new FormData(volunteerForm);

         // Convert FormData to a URL-encoded string
         const formParams = new URLSearchParams();
         for (const pair of formData) {
            formParams.append(pair[0], pair[1]);
         }

         // Send data to Google Apps Script Web App
         fetch(
            'https://script.google.com/macros/s/AKfycbzukjju7u-pfsZFGCbBGhMs0uDnNShNh0qMv3yQu0axbE3Nea0A5kwV5Z-HQ6Eh7kmC/exec',
            {
               method: 'POST',
               mode: 'no-cors',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: formParams.toString(),
            }
         )
            .then(() => {
               // Show a thank-you message or redirect
               volunteerForm.reset();
               document.getElementById('volunteer-menu').style.display = 'none';
               thankYou.style.display = 'flex';
               navBar.style.display = 'none';
            })
            .catch((error) => {
               console.error('Error!', error.message);
            });
      });
   }

   const donationPlatformSelect = document.getElementById('donation-platform');
   const paypalForm = document.getElementById('paypal-donation-form');
   const zeffyForm = document.getElementById('zeffy-donation-form');
   const suggestedButtons = document.querySelectorAll('.contribution-button');
   const customAmountInput = document.getElementById('custom-amount-input');
   let selectedAmount = null;
   const donateButton = document.getElementById('donate-button');

   donateButton.addEventListener('click', function () {
      let amount = customAmountInput.value || selectedAmount;
      if (!amount || amount <= 0) {
         alert('Please enter a valid amount');
         return;
      }

      const paypalBusinessID = 'chris@empowered.vote';

      const paypalURL = `https://www.paypal.com/donate?business=${encodeURIComponent(
         paypalBusinessID
      )}&currency_code=USD&amount=${amount}`;

      window.location.href = paypalURL;
   });

   // Show the PayPal form by default
   paypalForm.style.display = 'block';

   // Handle platform selection
   donationPlatformSelect.addEventListener('change', function () {
      if (this.value === 'paypal') {
         paypalForm.style.display = 'block';
         zeffyForm.style.display = 'none';
      } else if (this.value === 'zeffy') {
         paypalForm.style.display = 'none';
         zeffyForm.style.display = 'block';
      }
   });

   // Handle suggested contribution buttons
   suggestedButtons.forEach(function (button) {
      button.addEventListener('click', function () {
         // Deselect other buttons
         suggestedButtons.forEach((btn) => btn.classList.remove('selected'));
         // Select this button
         this.classList.add('selected');
         // Set the selected amount
         selectedAmount = this.getAttribute('data-amount');
         // Clear custom amount input
         customAmountInput.value = '';
      });
   });

   // Handle custom amount input
   customAmountInput.addEventListener('input', function () {
      // Deselect suggested buttons
      suggestedButtons.forEach((btn) => btn.classList.remove('selected'));
      selectedAmount = this.value;
   });
});
