const api = {
    key:"fdcb833a6ec4aa4784a61f814f0724f3",
    base:"https://api.openweathermap.org/data/2.5/"
//API call by name of city -->
//  https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener('click', getInput);

function getInput(event){
  event.preventDefault();

  if(event.type == 'click'){
       if(search.value == '') //city name
       { alert('plz enter city name')}

   getData(search.value) //1
   console.log(search.value)
   
   }

}


 function getData() {//2
   //based on api call  
   fetch(`${api.base}weather?q=${search.value}&appid=${api.key}`)

   .then(response =>{//response-->XMform  
    return response.json();
      })

       .then(displayData);//.then automaticall pass fulfiled promise data here 

function displayData(response){ //3
  // json get object form ma all clouds,location,wind..
  console.log(response)
  if(response.cod ==='404') {//error
   const errorEl = document.querySelector('.error');
    errorEl.textContent = 'Please enter a valid city'

    search.value =''; //search is empty after  invalid city error
  }
  else{
     const city = document.querySelector('.city');
     city.innerText = `${response.name},${response.sys.country}`
     //in resonse that we get whole object in this name:search city , sys{ country:"country name"} 
      const today = new Date();
     const date = document.querySelector('.date');
     date.innerText = dateFunction(today);

     const  temp = document.querySelector('.temp');

    //  const k to c =  (response.main.temp - 273)
     temp.innerText =` Temp:${Math.round(response.main.temp - 273)}°C`

       const weather = document.querySelector('.weather');
         weather.innerText = `Weather:${response.weather[0].main}`
         
         const tempRange = document.querySelector('.temp-range');

        
    tempRange.innerText = `Temp Range:${Math.round((response.main.temp - 273))}°C ` +'to'+ ' ' +`${Math.round((response.main.temp_min - 273))}°C `
// image...................................
  const weatherIcon = document.querySelector('.weather-icon');
  const iconUrl = 'http://openweathermap.org/img/wn/'

  weatherIcon.src=  iconUrl  + response.weather[0].icon + '.png'

    
search.value='';
    const errorEl = document.querySelector('.error');
 errorEl.innerText = '';
  }
  
}


function dateFunction(d){
    let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()] //if sunday d.getDay() gives ->0
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = [d.getFullYear()];

     return `${day },${date} ,${month} , ${year}`
   

  
}









 }