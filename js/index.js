// Store initial values and history
let totalAmount = 98600; // Initial amount in BDT
let donationHistory = [];
let cardAmounts = [0, 0, 0]; // Track amounts for each card

// Get DOM elements
document.addEventListener('DOMContentLoaded', () => {
    const totalAmountDisplay = document.querySelector('.navbar-end h3 span');
    const donationInputs = document.querySelectorAll('.card input[type="number"]');
    const donateButtons = document.querySelectorAll('.card .btn.bg-lime-400');
    const historyButton = document.querySelector('button:not(.bg-lime-400)');
    const donationButton = document.querySelector('button.bg-lime-400:not(.card .btn)');
    
    // Update total amount display
    totalAmountDisplay.textContent = totalAmount;

    // Add event listeners to donate buttons
    donateButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const input = donationInputs[index];
            const amount = parseInt(input.value);
            
            // Validate input
            if (!amount || amount <= 0) {
                alert('Please enter a valid donation amount');
                return;
            }
            
            if (amount > totalAmount) {
                alert('Insufficient funds for donation');
                return;
            }
            
            // Process donation
            makeDonation(amount, index);
            
            // Clear input
            input.value = '';
        });
    });
    
    // Add event listeners to navigation buttons
    if (historyButton) {
        historyButton.addEventListener('click', () => showPage('history'));
    }
    if (donationButton) {
        donationButton.addEventListener('click', () => showPage('donation'));
    }

    // Update card amounts display
    updateCardAmounts();
});

// Function to process donation
function makeDonation(amount, cardIndex) {
    // Get card title
    const cardTitle = document.querySelectorAll('.card-title')[cardIndex].textContent;
    
    // Update total amount
    totalAmount -= amount;
    document.querySelector('.navbar-end h3 span').textContent = totalAmount;
    
    // Update card amount
    cardAmounts[cardIndex] += amount;
    updateCardAmounts();
    
    // Add to history
    const date = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    donationHistory.push({
        amount: amount,
        cause: cardTitle,
        date: date
    });
    
    // Save to localStorage
    saveToStorage();
}

// Function to update card amounts display
function updateCardAmounts() {
    const cardAmountDisplays = document.querySelectorAll('.card .btn span');
    cardAmountDisplays.forEach((display, index) => {
        if (display) {
            display.textContent = cardAmounts[index];
        }
    });
}

// Function to save data to localStorage
function saveToStorage() {
    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));
    localStorage.setItem('totalAmount', totalAmount);
    localStorage.setItem('cardAmounts', JSON.stringify(cardAmounts));
}

// Function to show specified page
function showPage(page) {
    if (page === 'history') {
        const historyHTML = `
        <!DOCTYPE html>
        <html lang="en" data-theme="light">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Donation History - Donate Bangladesh</title>
            <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-base-100">
            <header class="bg-base-200 p-4">
                <nav class="container mx-auto">
                    <div class="navbar">
                        <div class="navbar-start">
                            <div>
                                <button class="btn bg-lime-400 px-8 font-bold">Blog</button>
                            </div>
                        </div>
                        <div class="navbar-center space-x-2">
                            <div><img src="assets/logo.png" alt=""></div>
                            <div><h3 class="font-bold">Donate Bangladesh</h3></div>
                        </div>
                        <div class="navbar-end space-x-1">
                            <div><img src="assets/coin.png" alt=""></div>
                            <div><h3 class="font-bold"><span>${totalAmount}</span> BDT</h3></div>
                        </div>
                    </div>
                    <section class="container mx-auto">
                        <div class="flex justify-center items-center gap-4 my-8">
                            <button class="btn bg-lime-400 font-bold">Donation</button>
                            <button class="font-bold border-2 border-black px-5 py-2 rounded-lg">History</button>
                        </div>
                    </section>
                </nav>
            </header>
            
            <main class="container mx-auto py-8">
                <div class="space-y-4">
                    ${generateHistoryItems()}
                </div>
            </main>

            <footer class="footer footer-center bg-base-300 text-base-content p-4">
                <aside>
                    <p>Copyright © - All right reserved by Donate Bangladesh</p>
                </aside>
            </footer>

            <script src="js/index.js"></script>
        </body>
        </html>
        `;
        
        document.open();
        document.write(historyHTML);
        document.close();
    } else {
        window.location.href = 'index.html';
    }
}

// Function to generate history items HTML
function generateHistoryItems() {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('donationHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    
    return history.map(item => `
        <div class="card bg-base-100 shadow-xl border-2 border-base-200">
            <div class="card-body">
                <h2 class="card-title">${item.amount} Taka is Donated for ${item.cause}</h2>
                <p>Date: ${item.date} (Bangladesh Standard Time)</p>
            </div>
        </div>
    `).join('');
}

// Rest of the previous code remains the same until the showPage function

// Function to show specified page
function showPage(page) {
  if (page === 'history') {
      const historyHTML = `
      <!DOCTYPE html>
      <html lang="en" data-theme="light">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Donation History - Donate Bangladesh</title>
          <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css" rel="stylesheet" type="text/css" />
          <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-base-100">
          <header class="bg-base-200 p-4">
              <nav class="container mx-auto">
                  <div class="navbar">
                      <div class="navbar-start">
                          <div>
                              <button class="btn bg-lime-400 px-8 font-bold">Blog</button>
                          </div>
                      </div>
                      <div class="navbar-center space-x-2">
                          <div><img src="assets/logo.png" alt=""></div>
                          <div><h3 class="font-bold">Donate Bangladesh</h3></div>
                      </div>
                      <div class="navbar-end space-x-1">
                          <div><img src="assets/coin.png" alt=""></div>
                          <div><h3 class="font-bold"><span>${totalAmount}</span> BDT</h3></div>
                      </div>
                  </div>
                  <section class="container mx-auto">
                      <div class="flex justify-center items-center gap-4 my-8">
                          <button onclick="window.location.href='index.html'" class="btn bg-lime-400 font-bold">Donation</button>
                          <button class="font-bold border-2 border-black px-5 py-2 rounded-lg">History</button>
                      </div>
                  </section>
              </nav>
          </header>
          
          <main class="container mx-auto py-8">
              <div class="space-y-4">
                  ${generateHistoryItems()}
              </div>
          </main>

          <footer class="footer footer-center bg-base-300 text-base-content p-4">
              <aside>
                  <p>Copyright © - All right reserved by Donate Bangladesh</p>
              </aside>
          </footer>
      </body>
      </html>
      `;
      
      document.open();
      document.write(historyHTML);
      document.close();
  }
}

// Rest of the previous code remains the same

// Load saved data on page load
window.addEventListener('load', () => {
    const savedAmount = localStorage.getItem('totalAmount');
    const savedHistory = localStorage.getItem('donationHistory');
    const savedCardAmounts = localStorage.getItem('cardAmounts');
    
    if (savedAmount) {
        totalAmount = parseInt(savedAmount);
        document.querySelector('.navbar-end h3 span').textContent = totalAmount;
    }
    
    if (savedHistory) {
        donationHistory = JSON.parse(savedHistory);
    }
    
    if (savedCardAmounts) {
        cardAmounts = JSON.parse(savedCardAmounts);
        updateCardAmounts();
    }
});