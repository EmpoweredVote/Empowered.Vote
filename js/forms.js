// forms.js

function disableFormInputs(form) {
   const inputs = form.querySelectorAll('input, select, textarea, button');
   inputs.forEach((input) => (input.disabled = true));
}

function enableFormInputs(form) {
   const inputs = form.querySelectorAll('input, select, textarea, button');
   inputs.forEach((input) => (input.disabled = false));
}

// Function to handle button clicks
function handleFormClick(event) {
   const clickedButtonId = event.currentTarget.id;
   const menuMap = {
      playtest: 'playtest-menu',
      volunteer: 'volunteer-menu',
      donate: 'donate-menu',
   };

   const mainMenu = document.getElementById('main-menu');
   mainMenu.style.display = 'none';
   disableFormInputs(mainMenu);

   const menuIdToShow = menuMap[clickedButtonId];
   const menuToShow = document.getElementById(menuIdToShow);

   if (menuToShow) {
      enableFormInputs(menuToShow);

      const menus = document.querySelectorAll('.menu-container');
      menus.forEach((menu) => {
         if (menu !== menuToShow) {
            menu.style.display = 'none';
            disableFormInputs(menu);
         }
      });

      menuToShow.style.display = 'flex';
   } else {
      console.error('Menu not found for button:', clickedButtonId);
   }
}

function goBack() {
   const menus = document.querySelectorAll('.menu-container');
   menus.forEach((menu) => {
      menu.style.display = 'none';
      disableFormInputs(menu);
   });

   const mainMenu = document.getElementById('main-menu');
   mainMenu.style.display = 'flex';
   enableFormInputs(mainMenu);

   const navBar = document.getElementById('form-nav');
   navBar.style.display = 'flex';

   window.scrollTo(0, 0);
}

// Attach event listeners to the buttons
document.addEventListener('DOMContentLoaded', function () {
   const divButtons = document.querySelectorAll('div.form-button');
   divButtons.forEach((button) => {
      button.addEventListener('click', handleFormClick);
   });

   const menus = document.querySelectorAll('.menu-container');
   menus.forEach((menu) => {
      if (menu.style.display === 'none' || menu.style.display === '') {
         disableFormInputs(menu);
      }
   });

   const mainMenu = document.getElementById('main-menu');
   enableFormInputs(mainMenu);
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
            'https://script.google.com/macros/s/AKfycbwziiIQ3z8Uu6EyHzxunYmUWkdVoYkHuphQu7fTJOJNuM4WRWnKc21IQilg_GkEkZMaZw/exec',
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
            'https://script.google.com/macros/s/AKfycbzJpVEs7laM0T7qbNiRswj1K2LV1xZlmYJU8E0gF0z701gR5wAPdyDMhI9sNStqRkoTfA/exec',
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
   const patreonForm = document.getElementById('patreon-donation-form');
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

      const paypalBusinessID = 'jackconnerdoyle2@gmail.com';

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
         patreonForm.style.display = 'none';
      } else if (this.value === 'patreon') {
         paypalForm.style.display = 'none';
         patreonForm.style.display = 'block';
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
