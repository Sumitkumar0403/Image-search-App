const key="6zX_blNoFYtZxKBlXsBtJ4EkRZJnvbFr-xLFDJ5apU4"

const input = document.getElementById('search_input')
const searchButton=document.getElementById("search_button")
const showMoreButton=document.getElementById('show_more')
const showResults=document.querySelector(".search_results")
const form=document.querySelector('form')

let inputData="";
let page;

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    page=1;
    imageSearch()
})

showMoreButton.addEventListener('click',(e)=>{
    imageSearch();
})

async function imageSearch(){
    inputData=input.value;
    let url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`

    const response= await fetch(url)
    const data=await response.json();
    const results=data.results;

    if(page==1){
        showResults.innerHTML='';
    }

    results.forEach((result)=>{
        const div=document.createElement('div')
        div.classList.add("search_result");
        const image=document.createElement('img')
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const a=document.createElement('a')
        a.href=result.links.html;
        a.textContent=result.alt_description;
        a.target="_blank"
        div.appendChild(image)
        div.appendChild(a)
        showResults.appendChild(div)
    })
    page++;
    if(page>1){
        input.value.innerHTML=''; 
        showMoreButton.style.display="block";
    }
}