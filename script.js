"use strict";
let categoryEl = document.getElementById("category");
const quoteText = document.getElementById("quote-text");
const favoriteBtn = document.getElementById("favorite-btn");
const newQuoteBtn = document.getElementById("new-quote-btn");
const shareBtn = document.getElementById("share-btn");
const favoritesList = document.getElementById("favorites-list");
//safe DOM check
if (
  !categoryEl ||
  !quoteText ||
  !favoriteBtn ||
  !newQuoteBtn ||
  !shareBtn ||
  !favoritesList
) {
  console.error("One or more required elements are missing from the DOM.");
  throw new Error("Missing DOM elements");
}
// quotes array
const quotes = [
  {
    quote: "You’re not stuck, you’re just lazy and scared.",
    category: "Blunt Truths",
  },
  {
    quote: "Time doesn’t heal shit, it just makes you forget where it hurts.",
    category: "Blunt Truths",
  },
  {
    quote: "If you wait until you’re “ready,” you’ll die waiting.",
    category: "Blunt Truths",
  },
  { quote: "Your comfort zone is a velvet coffin.", category: "Blunt Truths" },
  { quote: "The universe doesn’t owe you closure.", category: "Blunt Truths" },
  {
    quote: "Don’t burn bridges unless you’re okay swimming in shark water.",
    category: "Petty Wisdom",
  },
  {
    quote: "The grass isn’t greener — it’s fake turf with better lighting.",
    category: "Petty Wisdom",
  },
  {
    quote: "If they wanted to, they would… and they didn’t.",
    category: "Petty Wisdom",
  },
  {
    quote: "Revenge is best served cold because hot-headed plans suck.",
    category: "Petty Wisdom",
  },
  {
    quote: "Keep receipts — emotional and financial.",
    category: "Petty Wisdom",
  },
  {
    quote: "Jump and hope the net’s drunk enough to catch you.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Stop overthinking — no one survives life anyway.",
    category: "Chaotic Motivation",
  },
  {
    quote: "You don’t need a plan; you need caffeine and a little delusion.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Fail loudly so everyone hears you try.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Kick the door down — you can apologize later.",
    category: "Chaotic Motivation",
  },
];

//random
function generateRandomQuote() {
  const quote = quotes.map((item) => item.quote);
  quoteText.textContent = quote[Math.floor(Math.random() * quote.length)];
}

//filter by category
function groupQuotesByCategory() {
  return quotes.reduce((acc, { category, quote }) => {
    if (!acc[category]) acc[category] = [];
    acc[category].push(quote);
    return acc;
  }, {});
}

// Inject Categories to DOM
function createCategoryOptions() {
  const categories = Object.keys(groupQuotesByCategory());
  categories.forEach((category) => {
    const option = document.createElement("option");
    categoryEl.append(option);
    option.textContent = category;
  });
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
  [...favorites].forEach((favorite) => {
    const item = document.createElement("li");
    item.textContent = favorite;
    favoritesList.append(item);
  });
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

//event listeners
categoryEl.addEventListener("change", generateQuotesByCategories);
newQuoteBtn.addEventListener("click", generateQuotesByCategories);
favoriteBtn.addEventListener("click", displayFavorites);
shareBtn.addEventListener("click", shareQuote);
document.addEventListener("DOMContentLoaded", () => {
  createCategoryOptions();
  generateRandomQuote();
});
