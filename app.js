let apiKey="950d725bb5eb4235bd0b3ac39e60c89c";

let url="https://newsapi.org/v2/everything?q";

window.addEventListener("load",()=>FetchNews("Pakistan"));

async function FetchNews(query){
    try{
    let response= await fetch(`${url}=${query}&apiKey=${apiKey}`);
    let data= await response.json();
    bindData(data.articles);
    }catch(e){
        alert("error in fetching api ",e);
    }
}

function bindData(articles){

    let cardsContainer=document.getElementById("cards-container");
    let cardsTemplate=document.getElementById("template-news-card");

    cardsContainer.innerHTML=" ";

    articles.forEach(article => {
        if(!article.urlToImage){
            return;
        }
        let cardsClone = cardsTemplate.content.cloneNode(true);
        fillDataInCards(cardsClone,article);
        cardsContainer.appendChild(cardsClone);
    });
}

function fillDataInCards(cardClone, article) {
    let newsImage = cardClone.querySelector(".news-image");
    let newsTitle = cardClone.querySelector(".news-title");
    let newsSource = cardClone.querySelector(".news-source");
    let newsDesc = cardClone.querySelector(".news-desc");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}

let currentNav=null;
function onNavItemClick(news){
    FetchNews(news);
    
    const navItem = document.getElementById(news);
    currentNav?.classList.remove("active");
    currentNav = navItem;
    currentNav.classList.add("active");
}

const button=document.querySelector(".search-btn");
const searchInput=document.querySelector(".search-input");

button.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;
    FetchNews(query);
    currentNav?.classList.remove("active");
    currentNav = null;
});



function reload(){
    window.location.reload();
}
