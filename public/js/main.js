const cityName=document.getElementById('cityName')
const city_name=document.getElementById('city_name')
const submitBtn=document.getElementById('submitBtn')
const temp_status=document.getElementById('temp_status')
const status_temp=document.getElementById('status_temp')
const temp_real_val=document.getElementById('temp_real_val')
const datahide=document.querySelector('.middle_layer');
const day=document.getElementById("day")
const today=document.getElementById("today")
const time=document.getElementById("time");

// set Time and date 
const setTime=(timezone)=>{
    let now=new Date();
    let string_date,hrs,mnt,period="AM";
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const offset = (timezone)/60/60;
    const curr_time = utc + 3600000 * offset;
    const curr_date = new Date(curr_time);
    string_date=curr_date.toString();
    day.innerText=string_date.slice(0,3);
    today.innerText=`${string_date.slice(4,7)} ${curr_date.getDate()}`
     hrs = curr_date.getHours();
     mnt = curr_date.getMinutes();
    if (hrs > 11) {
      period = 'PM';
      if (hrs > 12) hrs -= 12;
    }
    if (hrs < 10) hrs = `0${hrs}`;
    if (mnt < 10) mnt = `0${mnt}`;
    
    time.innerText=`${hrs}:${mnt}${period}`
}

setTime(19800);


const getInfo=async()=>{
    // alert('hi')
    
    let cityVal=cityName.value;
    if(cityVal===''){
        city_name.innerText='Plz write the city name before search'
        datahide.classList.add('data_hide');
    }
    else{
        try{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=3b1a61cfbb4f144af005b4f5abf96180`;
        const response=await fetch(url);
        const data=await response.json();
        const arrData=[data];
        setTime(arrData[0].timezone);
        temp_real_val.innerText=arrData[0].main.temp;
        const tempMood=arrData[0].weather[0].main;
        city_name.innerText=`${arrData[0].name},${arrData[0].sys.country}`
        datahide.classList.remove('data_hide');

        const icon=arrData[0].weather[0].icon;
        const weather_id=arrData[0].weather[0].id;
        status_temp.innerText=tempMood;
        
        if(tempMood==='Sunny'){
            temp_status.innerHTML=`<i class="fas fa-sun" style='color:#eccc68'></i>`
        }
        else if(tempMood==='Clouds'){
            temp_status.innerHTML=`<i class="fas fa-cloud" style='color:#f1f2f6'></i>`
        }
        else if(tempMood==='Rain'||tempMood==='Drizzle'){
            temp_status.innerHTML=`<i class="fas fa-cloud-rain" style='color:#a4b0be'></i>`
        }
        
        else if(tempMood==='Clear'){
            if(icon==='01d')
            temp_status.innerHTML=`<i class="fas fa-sun" style='color:#eccc68'></i>`
            else
            temp_status.innerHTML=`<i class="fa-solid fa-moon fas" style='color:#f1f2f6'></i>`

        }
        else{
            if(700<weather_id<800)
            temp_status.innerHTML=`<i class="fas fa-smog" style='color:#f1f2f6' ></i>`
            else if(600<=weather_id<=622)
            temp_status.innerHTML=`<i class="fas fa-snow" style='color:#f1f2f6' ></i>`
            else
            temp_status.innerHTML=`<i class="fa-solid fa-cloud-bolt" style='color:#a4b0be'></i>`

        }

        }
        catch{
            setTime(19800);
        city_name.innerText='Plz enter the correct city name ';
        datahide.classList.add('data_hide');
        }

    }

}
submitBtn.addEventListener('click',getInfo);