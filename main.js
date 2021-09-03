const searchInput=document.getElementById("searchInput");
const searchBtn=document.getElementById("search-btn");
const countryContainer=document.getElementById("country-container");
const error=document.getElementById("error");
const countrydetails=document.getElementById("country-details");
searchBtn.addEventListener("click",function(){
 
   const searchValue= searchInput.value;
   searchInput.value="";
   if( searchValue===""){
       error.innerText="Field is empty";
   }
   countryContainer.textContent="";
   const url=`https://restcountries.eu/rest/v2/name/${searchValue}`
   fetch(url)
   .then(res=>res.json())
   .then(data=>ShowData(data))
   .finally()
  })

  function ShowData(data){
    console.log(data)
   if(data.status=== 404){
    error.innerText="No result found";
   }
   else{
    error.innerText="";
   }
     data.forEach(item => {
         
         //console.log(item);
         const createDiv=document.createElement("div");
         createDiv.classList.add('col-md-3', 'col-12');
         createDiv.innerHTML=`<div class="rounded overflow-hidden border p-2">
         <img
           src="${item.flag}"
           class="w-100"
           alt=""
         />
       </div>
       
       <div
         class="
           py-2
           d-flex
           justify-content-between
           align-items-center
           d-md-block
           text-md-center
         "
       >
         <h1>${item.name}</h1>
         <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
       </div>`;
       countryContainer.appendChild(createDiv);
         
     });




}


const showDetails=(code)=>{
  const url=`https://restcountries.eu/rest/v2/alpha/${code}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>country(data))

   }

   const country=(data)=>{
    
    countrydetails.innerHTML=` <h1> Country Name:  ${data.name}</h1>
    <p>Capital:  ${data.capital}</p> 
    <p>Language:  ${data.languages[0].name}</p>`
    
   }