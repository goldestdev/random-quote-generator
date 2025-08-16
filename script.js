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
  {
    quote: "You can’t fix stupid, but you can stop hanging out with it.",
    category: "Blunt Truths",
  },
  {
    quote:
      "Growth feels like losing your mind until you settle into the new one.",
    category: "Blunt Truths",
  },
  {
    quote: "You’ll never feel confident doing something for the first time.",
    category: "Blunt Truths",
  },
  {
    quote: "Nobody’s thinking about you as much as you think they are.",
    category: "Blunt Truths",
  },
  {
    quote: "Not every chapter of your life needs an audience.",
    category: "Blunt Truths",
  },
  {
    quote: "Some people aren’t toxic, they’re just idiots in high definition.",
    category: "Petty Wisdom",
  },
  {
    quote: "Kill them with kindness, but make sure they know you’re aiming.",
    category: "Petty Wisdom",
  },
  {
    quote: "Don’t take criticism from someone you wouldn’t take advice from.",
    category: "Petty Wisdom",
  },
  { quote: "Silence is an underrated power move.", category: "Petty Wisdom" },
  {
    quote: "You can’t argue with stupid, but you can outlive them.",
    category: "Petty Wisdom",
  },
  {
    quote: "Fear is just your brain’s way of asking for popcorn.",
    category: "Chaotic Motivation",
  },
  {
    quote: "If it scares you, it’s probably worth doing.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Make reckless decisions responsibly.",
    category: "Chaotic Motivation",
  },
  {
    quote: "You can’t make an omelette without breaking a few egos.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Confidence is 10% skill, 90% pretending you own the place.",
    category: "Chaotic Motivation",
  },
  {
    quote: "People rarely change; they just get better at hiding who they are.",
    category: "Blunt Truths",
  },
  {
    quote: "If it costs you your peace, it’s overpriced.",
    category: "Blunt Truths",
  },
  {
    quote: "You are replaceable at work. Everywhere else? Priceless.",
    category: "Blunt Truths",
  },
  { quote: "Comfort is more dangerous than risk.", category: "Blunt Truths" },
  {
    quote: "You’ll never run out of excuses, only time.",
    category: "Blunt Truths",
  },
  { quote: "Petty is just justice with better PR.", category: "Petty Wisdom" },
  {
    quote: "If someone ghosts you, haunt them with your success.",
    category: "Petty Wisdom",
  },
  {
    quote: "Play dumb until it’s profitable to be smart.",
    category: "Petty Wisdom",
  },
  { quote: "Not all attention is worth having.", category: "Petty Wisdom" },
  {
    quote: "Sometimes you win just by not caring anymore.",
    category: "Petty Wisdom",
  },
  {
    quote: "Do it badly until you do it well.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Act like the main character — the universe loves drama.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Burn the safety net; you’ll climb faster without it.",
    category: "Chaotic Motivation",
  },
  {
    quote: "If you’re not a little scared, you’re probably bored.",
    category: "Chaotic Motivation",
  },
  {
    quote: "Chaos is just creativity without a leash.",
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
});
