const API_KEY = '8c997a0cf5a548a482c40b7410e6b8f9';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', () => fetchNews('India'));



function reload() {
    window.location.reload();
}

async function fetchNews(query){
  const res= await fetch(`${url}${query}&apikey=${API_KEY}`)
  const data = await res.json();

  bindData(data.articles);
}

function bindData(articles){
    const cardContainer= document.getElementById('card-container');
    const cardTemplate= document.getElementById('template-news-card');

    cardContainer.innerHTML ="";

    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
         fillData(cardClone, article);
        cardContainer.appendChild(cardClone);
    })
}

function fillData(cardClone, article){
    const newsimg= cardClone.querySelector("#news-img");
    const newstitle= cardClone.querySelector("#news-title");
    const newssource= cardClone.querySelector("#news-source");
    const newsdesc= cardClone.querySelector("#news-desc");

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:'Asia/jakarta'
    })
    newssource.innerHTML = `${article.source.name}, ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank")
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id)
   const navitem = document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = navitem;
   curSelectedNav.classList.add('active');
}

const searchbtn = document.getElementById('news-btn');
const newsInput = document.getElementById('news-input');

searchbtn.addEventListener('click', ()=>{
    const value= newsInput.value;
    if(!value) return;
    fetchNews(value);
    curSelectedNav?.classList.remove('active')
    curSelectedNav = null;
})