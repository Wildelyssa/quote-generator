//constants
const quoteContainer = document.getElementById('quote-container');
const quoteIcon = document.getElementById('quote-icon');
const quoteIcon2 = document.getElementById('quote-icon2');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const postBtn = document.getElementById('post-button');
const newQuoteBtn = document.getElementById('new-quote-button');
const loader = document.getElementById('loader');

//Show Loader
function showQuote() {
    loader.style.display = "none";
    quoteContainer.style.display = "flex";
}

function loading() {
    loader.style.display = "block";
    quoteContainer.style.display = "none";

}

//Get quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://whispering-everglades-64774.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author is blank add Unknown Author
        if (data.quoteAuthor === '') {
            authorText.innerText = `Unknown Author`;
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //use smaller font and corresponding icon size if quote longer than 120 characters
        if (data.quoteText.length > 100) {
            quoteIcon.classList.remove('quote-icon');
            quoteIcon2.classList.remove('quote-icon');
            quoteText.classList.add('long-quote');
        } else {
            quoteIcon.classList.add('quote-icon');
            quoteIcon2.classList.add('quote-icon');
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Stop loader, show quote
        showQuote();
       
    } catch (error) {
        getQuote();
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text= ${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
postBtn.addEventListener('click', tweetQuote);

//onLoad 
getQuote();
