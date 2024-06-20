let backbtn2;
const querystr = window.location.search;
const params = new URLSearchParams(querystr);
var countryname = params.get('countryName');

//Fetching data from data.json file
            if(countryname !== null){
                fetch('./data.json')
                    .then((value)=>value.json())
                        .then((data)=>{
                            const countryData = data.find(country=>country.name === countryname);
                            let bordercountries='';

//fetching boder countries                            
                            if(countryData.borders){
                                countryData.borders.forEach((countrycode)=>{
                                    let borderCountries = data.find((country) => country.alpha3Code === countrycode)
                                    bordercountries += `<a href="country.html?countryName=${borderCountries.name}" class="borderbtn">${borderCountries.name}</a>`;
                                })
                            }else{
                                bordercountries += `<p>No border countries available</p>`;
                            }

//Fetching currencies                           
                            let currency = '';
                            if(countryData.currencies){                            
                                currency = countryData.currencies.map((data)=>{
                                return data.name;
                               }).join(', ');
                            }
                            else{
                                currency = 'No currency';
                            }

                            let capitalCity='';
                            if(countryData.capital){
                               capitalCity = countryData.capital;   
                            }else{
                                capitalCity = "No capital city";
                            }
                       
//Dynamically updating HTML                    
                            const container = document.getElementsByTagName('main')[0];
                            const div = document.createElement('div');
                            container.innerHTML = `<button id="backbtn" onclick="history.back()"><i id="icon" class="fa-solid fa-arrow-left"></i>&nbsp&nbspBack</button>
                                <div class="country-container">
                                    <img id="flag" src="${countryData.flag}" alt="flag">
                                    <div id="countrydetails">
                                        <h2>${countryData.name}</h2>
                                        <div id="detailcolumns">
                                            <div>
                                                <p><b>Native Name: </b>${countryData.nativeName
                                                }</p>
                                                <p><b>Population: </b>${countryData.population}</p>
                                                <p><b>Region: </b>${countryData.region}</p>
                                                <p><b>Sub Region: </b>${countryData.subregion}</p>
                                                <p><b>Capital: </b>${capitalCity}</p>
                                            </div>
                                            <div id="detailed">
                                                <p><b>Top Level Domain: </b>${countryData.topLevelDomain
                                                }</p>
                                                <p><b>Currencies: </b>${currency
                                                }</p>
                                                <p><b>Languages: </b>${countryData.languages.map(lang => lang.name).join(', ')}</p>
                                             
                                            </div>
                                        </div>
                                        <div id="bordercountries">
                                            <b>Border Countries:</b>
                                            <div id="border-container">
                                            ${bordercountries}
                                            </div>
                                        </div>
                                    </div>                 
                                </div>`
                            backbtn2 = document.getElementById('backbtn');
                            const savedMode = localStorage.getItem('mode');
                            if (savedMode) {
                                applymode(savedMode);
                            }
                })
                .catch(error => console.error('Error in fetching data:', error));
            } else {
            console.log('Invalid Country');
            }

            const main = document.getElementsByTagName('main')[0];
            const header = document.getElementsByTagName('header')[0];
            const insideheader = document.getElementById('header');
            const body = document.getElementsByTagName('body')[0];  
            const homehead = document.getElementById('homehead');
            
//function to dark to light mode and vice-versa
            function modechange(){
                const classes = modebtn.getAttribute('class');
                if(classes == 'fa-regular fa-moon'){
                    applymode('dark');
                    localStorage.setItem("mode", "dark");
                }else{
                   applymode('light');
                    localStorage.setItem("mode", "light");

                }
            }

//Mode Switcher function
            function applymode(mode){
                const borderbtn = document.getElementsByClassName('borderbtn');
                const bolds = document.getElementsByTagName('b');
                const p = document.getElementsByTagName('p');

                if(mode === 'dark'){
                    modebtn.setAttribute('class', 'fa-solid fa-sun')
                    modetxt.innerText= 'Light Mode'
                    modebtn.style.backgroundColor='hsl(207, 26%, 17%)';
                    body.style.color='white';
                    insideheader.style.boxShadow = 'none';
                    insideheader.style.backgroundColor = 'hsl(209, 23%, 22%)'
                    header.style.backgroundColor = 'hsl(209, 23%, 22%)';
                    main.style.backgroundColor = 'hsl(207, 26%, 17%)';
                    body.style.backgroundColor = 'hsl(207, 26%, 17%)';
                    backbtn2.style.backgroundColor = 'hsl(209, 23%, 22%)'; 
                    backbtn2.style.color = 'white'; 
                    homehead.style.color = 'white';
                    for( let i = 0; i<borderbtn.length; i++){
                        borderbtn[i].style.backgroundColor = 'hsl(209, 23%, 22%)'; 
                        borderbtn[i].style.color = 'white';   
                    }
                    for( let i = 0; i<bolds.length; i++){
                        bolds[i].style.color = 'white'; 
                    }
                    for( let i = 0; i<p.length; i++){
                        p[i].style.color = 'rgb(211, 208, 208)'; 
                    }
                    
                }else{
                    modebtn.setAttribute('class', 'fa-regular fa-moon') 
                    modetxt.innerText= 'Dark Mode'
                    modebtn.style.backgroundColor='white';
                    body.style.color='black';
                    insideheader.style.boxShadow = '0 0 10px rgb(211, 210, 210)';
                    insideheader.style.backgroundColor = 'hsl(209, 23%, 22%)'
                    body.style.backgroundColor = 'hsl(0, 0%, 98%)';
                    insideheader.style.backgroundColor = 'white'
                    header.style.backgroundColor = 'white';
                    main.style.backgroundColor = 'hsl(0, 0%, 98%)';
                    backbtn2.style.backgroundColor = 'white'; 
                    backbtn2.style.color = 'black'; 
                    homehead.style.color = 'black';
                    for( let i = 0; i<borderbtn.length; i++){
                        borderbtn[i].style.backgroundColor = 'white'; 
                        borderbtn[i].style.color = 'black';         
                    }
                    for( let i = 0; i<bolds.length; i++){
                        bolds[i].style.color = 'rgb(66, 65, 65)'; 
                    }
                    for( let i = 0; i<p.length; i++){
                        p[i].style.color = 'rgb(99, 97, 97)'; 
                    }
                }
            }

//applyng event listener on the document when it loads
document.addEventListener('DOMContentLoaded', ()=>{
    // main.innerText='loading...';
    if(backbtn2){
        let modepresence = localStorage.getItem('mode')
        if(modepresence){
            applymode(modepresence);
        }
    }
}) 

//By back button history.back() browser doesn't reloads the page completely it just restores the previous version so DOMContentLoaded may not be called when user comes back by back button
window.addEventListener('pageshow', () => {
    let modepresence = localStorage.getItem('mode');
    if (modepresence) {
        applymode(modepresence);
    }
});
