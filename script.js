// **Selecting elements**

const container = document.getElementsByClassName('country-container');
const searchbartxt = document.getElementById('search-input');

// **Global variable for all countries data**

let allconuntries = [];

// **Function to fetch and display all countries**

allCountries();
function allCountries(){
    fetch('./data.json')
    .then((value)=>value.json())
    .then((data)=>{
        allconuntries = data;
        data.forEach((element) => {
        const countryanchor1= display(element)
        container[0].append(countryanchor1);
        callmode();
            })
        }).catch(error => console.error('Error fetching data:', error)); 
}
    
// **Function to handle saved mode on page load**

function callmode(){
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        applymode(savedMode);
    }
}

// **Function to create a country card element**

function display(data){

    let capitalCity='';
    if(data.capital){
        capitalCity = data.capital;   
    }else{
        capitalCity = "No capital city";
    }

    const countryanchor2 = document.createElement('a');
    countryanchor2.href=`country.html?countryName=${data.name}`;
    countryanchor2.innerHTML= `<div class="country-card">
                    <img src=${data.flag} alt="flag" /> 
                    <div class="inside-card">
                        <h2>${data.name}</h2>
                        <p><b>Population: </b>${data.population}</p>
                        <p><b>Region: </b>${data.region}</p>
                        <p><b>Capital: </b>${capitalCity}</p>
                    </div>
                </div>`;
     
    return countryanchor2;            
}

// **Selecting elements for mode change**

const modebtn = document.getElementById('modebtn');
const modetxt = document.getElementById('modetxt');

function modechange(){
    const classes = modebtn.getAttribute('class');
    if(classes == 'fa-regular fa-moon'){       
        applymode('dark');
        localStorage.setItem('mode', 'dark');
    }else{       
        applymode('light');
        localStorage.setItem('mode', 'light');
    }
}

// **Selecting elements for region selection**

    const selectField = document.getElementById('selectField');
    const selectText = document.getElementById('selectText');
    const options = document.getElementsByClassName('options');
    const list = document.getElementById('list');
    const icon = document.getElementById('icon');

// **Function to apply light/dark mode styles**

function applymode(mode){

    const main = document.getElementsByTagName('main')[0];
    const header = document.getElementsByTagName('header')[0];
    const insideheader = document.getElementById('header');
    const body = document.getElementsByTagName('body')[0];
    const contrycard = document.getElementsByClassName('country-card');
    const bolds = document.getElementsByTagName('b');
    const p = document.getElementsByTagName('p');
    const searchbar = document.getElementsByClassName('search-bar')[0];  

    if(mode === 'dark'){
        modebtn.setAttribute('class', 'fa-solid fa-sun');
        modetxt.innerText= 'Light Mode';
        main.style.backgroundColor = 'hsl(207, 26%, 17%)';
        body.style.backgroundColor = 'hsl(207, 26%, 17%)';
        header.style.backgroundColor = 'hsl(209, 23%, 22%)';
        insideheader.style.boxShadow = 'none';
        insideheader.style.backgroundColor = 'hsl(209, 23%, 22%)';
        body.style.color = 'white';
        searchbar.style.backgroundColor = 'hsl(209, 23%, 22%)';
        searchbartxt.style.color = 'white';
        selectField.style.backgroundColor='hsl(209, 23%, 22%)'
        selectText.style.color='white'
        list.style.backgroundColor='hsl(209, 23%, 22%)'
        list.style.color='white'
        for( let i = 0; i<contrycard.length; i++){
            contrycard[i].style.backgroundColor = 'hsl(209, 23%, 22%)'; 
        }
        for( let i = 0; i<bolds.length; i++){
            bolds[i].style.color = 'white'; 
        }
        for( let i = 0; i<p.length; i++){
            p[i].style.color = 'rgb(211, 208, 208)'; 
        }
        
    }else{
       
        modebtn.setAttribute('class', 'fa-regular fa-moon') 
        modetxt.innerText= 'Dark Mode';
        main.style.backgroundColor = 'hsl(0, 0%, 98%)';
        body.style.backgroundColor = 'hsl(0, 0%, 98%)';
        header.style.backgroundColor = 'white';
        insideheader.style.boxShadow = '0 0 8px rgb(211, 210, 210)';
        insideheader.style.backgroundColor = 'white';
        body.style.color = 'hsl(200, 15%, 8%)';
        searchbar.style.backgroundColor = 'white';
        searchbartxt.style.color = 'black';
        selectField.style.backgroundColor='white';
        selectText.style.color='black'
        list.style.color='black'
        list.style.backgroundColor='white'

        for( let i = 0; i<contrycard.length; i++){
            contrycard[i].style.backgroundColor = 'white'; 
        }
        
        for( let i = 0; i<bolds.length; i++){
            bolds[i].style.color = 'rgb(66, 65, 65)'; 
        }
        for( let i = 0; i<p.length; i++){
            p[i].style.color = 'rgb(99, 97, 97)'; 
        }

    }
}


// **Event listener for region selection**
for(option of options){
    option.onclick = function(){
        searchbartxt.value=''; 
       container[0].innerHTML='';
       const selectedRegion = this.textContent
        selectText.innerText = selectedRegion;
        list.classList.toggle('heightchange');           
        icon.classList.toggle('rotate');
        if(selectedRegion === 'All') {
           regionalDisplay('ALL')
         }else{
           regionalDisplay(selectedRegion);
         } 
    }
   }
   
   function regionalDisplay(value){
       if(value === 'ALL'){
           allconuntries.forEach((data3)=>{
               const gotit = display(data3);
               container[0].append(gotit);
               callmode()
           })
       }else{
           const regionwise = allconuntries.filter((data2) =>data2.region === value)
           regionwise.forEach((data3)=>{
               const gotit = display(data3);
               container[0].append(gotit);
               callmode()
           })
       }     
   }

selectField.onclick=()=>{
     list.classList.toggle('heightchange');
     icon.classList.toggle('rotate');
}

searchbartxt.addEventListener('input', countriesonsearch);
function countriesonsearch(){
        let value = searchbartxt.value.trim();
        let newsearcheddata = allconuntries.filter((country)=>country.name.toLowerCase().startsWith(value.toLowerCase()));
        container[0].innerHTML = '';
        if(newsearcheddata.length==0){
            container[0].innerHTML=`<p style="margin:280px auto 0; ">No data found</p>`;
        }else{
            newsearcheddata.forEach((data)=>{
               const getsearched = display(data);
               container[0].append(getsearched);
               callmode();
            })     
        }  
    
}

//applyng event listener on the document when it loads
document.addEventListener('DOMContentLoaded', ()=>{
    searchbartxt.value='';
    let modepresence = localStorage.getItem('mode')
    if(modepresence){
    applymode(modepresence);
    }
}) 
window.addEventListener('pageshow', () => {
    let modepresence = localStorage.getItem('mode');
    if (modepresence) {
        applymode(modepresence);
    }
});
