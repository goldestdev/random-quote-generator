"use strict";
let categoryEl = document.getElementById("category");
const quoteText = document.getElementById("quote-text");
const favoritesList = document.getElementById("favorites-list");
const actions = document.querySelector(".actions");

//safe DOM check
if (!categoryEl || !quoteText || !favoritesList || !actions) {
  console.error("One or more required elements are missing from the DOM.");
  throw new Error("Missing DOM elements");
}

//random
const generateRandomQuote = () => {
  const quote = quotes.map((item) => item.quote);
  quoteText.textContent = quote[Math.floor(Math.random() * quote.length)];
};

//filter by category
const groupQuotesByCategory = () => {
  return quotes.reduce((acc, { category, quote }) => {
    if (!acc[category]) acc[category] = [];
    acc[category].push(quote);
    return acc;
  }, {});
};

// Inject Categories to DOM
function createCategoryOptions() {
  const categories = Object.keys(groupQuotesByCategory());
  const fragment = document.createDocumentFragment();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.textContent = category;
    fragment.append(option);
  });
  categoryEl.append(fragment);
}

// generate by categories
function generateQuotesByCategories() {
  const selectedCategory = categoryEl.value;
  const grouped = groupQuotesByCategory();
  const quotesInCategory = grouped[selectedCategory] || [];

  if (quotesInCategory.length > 0) {
    const randomQuote =
      quotesInCategory[Math.floor(Math.random() * quotesInCategory.length)];
    quoteText.textContent = randomQuote;
    // exixted in html:   <option value="all" selected>All</option>
  } else if (categoryEl.value === "all") {
    generateRandomQuote();
  } else {
    quoteText.textContent = "No quotes found for this category.";
  }
}

//add to favorite
const favorites = new Set();
const addToFavorites = () => favorites.add(quoteText.textContent);
function displayFavorites() {
  addToFavorites();
  favoritesList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  [...favorites].forEach((favorite) => {
    const item = document.createElement("li");
    item.textContent = favorite;
    fragment.append(item);
  });
  favoritesList.append(fragment);
}

//share
function shareQuote() {
  //   navigator.clipboard.writeText(quoteText.textContent);
  navigator.share({
    title: "Random Quotes",
    text: quoteText.textContent,
    url: window.location.href,
  });
}

//generate new quote when the page is idle for 10secs
function generateQuoteAfter10Sec() {
  let idleInterval = null;
  let lastActivity = Date.now();

  function fadeQuoteChange() {
    quoteText.classList.add("fade-out");
    setTimeout(() => {
      generateQuotesByCategories();
      quoteText.classList.remove("fade-out");
    }, 500);
  }

  const startIdleInterval = () => {
    if (idleInterval) clearInterval(idleInterval);
    idleInterval = setInterval(() => {
      if (Date.now() - lastActivity >= 10000) {
        fadeQuoteChange();
        lastActivity = Date.now(); // reset so it waits another 10s
      }
    }, 1000);
  };

  const activityHandler = () => {
    lastActivity = Date.now();
  };

  ["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) => {
    document.addEventListener(event, activityHandler);
  });

  startIdleInterval();
}
//event listeners
categoryEl.addEventListener("change", generateQuotesByCategories);

actions.addEventListener("click", (e) => {
  if (e.target.matches("#favorite-btn")) displayFavorites();
  if (e.target.matches("#new-quote-btn")) generateQuotesByCategories();
  if (e.target.matches("#share-btn")) shareQuote();
});

document.addEventListener("DOMContentLoaded", () => {
  createCategoryOptions();
  generateRandomQuote();
  generateQuoteAfter10Sec();
});
