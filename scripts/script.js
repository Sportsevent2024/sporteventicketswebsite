
const reponse = await fetch('/scripts/matchs.json');

const matchs = await reponse.json();

//Navbar
const btnNav = document.getElementById('nav_btn');
const mobileNav = document.getElementById('mobile_nav');

btnNav.addEventListener('click', ()=>{
  mobileNav.classList.toggle('-translate-x-full');
});

//Fin Navbar

// afficher les matchs du jour j
  const contDay = document.querySelector('.content_jj');
// Fonction pour afficher les matchs du jour J
  function displayTodayMatches() {
    const today = new Date().toISOString().split('T')[0]; // Obtenez la date d'aujourd'hui au format YYYY-MM-DD
    const todayMatches = matchs.filter(match => match.date.startsWith(today));
    //code pour afficher les matchs sur le front-end
   if(todayMatches){
    let i = 0;
    for(i = 0; i < todayMatches.length; i++){
      const contentJj = document.querySelector('.next_days');

      const cardMatch = document.createElement('div');
      cardMatch.className = "grid grid-cols-6 md:mx-auto lg:grid-cols-1 bg-white justify-center w-full items-center rounded-md p-2 shadow";
 
      cardMatch.innerHTML = `
       <img alt=""  src="./assets/UEFA_Euro_2024_Logo.svg.png" class="h-32 w-full p-2  object-contain"/>
       
       <div class="my-2 col-span-3 w-full ml-2 mx-auto lg:text-center">
       <h2 class="font-semibold text-[15px] md:text-[20px]  text-blue-950">${todayMatches[i].teams.home} vs. ${todayMatches[i].teams.away}</h2>
       <h4 class="text-[10px] md:text-[15px]">${todayMatches[i].simpleDate} • ${todayMatches[i].teams.hour}</h4>
       <p class="text-[8px] md:text-[13px]">${todayMatches[i].location}</p>
       </div>

       <button onclick="viewDetails(${todayMatches[i].id})" class="inline-block text-[9px] md:text-[14px] col-span-2 text-center rounded border  transition ease-out duration-200 border-blue-950 bg-blue-950 py-4 px-2 mx-2 text-white hover:bg-transparent hover:text-blue-950">View Tickets</button>
        `;
       contentJj.appendChild(cardMatch);
  
    }
   }else{
   console.log('match non trouvé');

  }
  }

displayTodayMatches(); // Affiche les matchs du jour J


// Rediriger vers les détails du matchs du match Jour J

const allBtn = document.querySelectorAll('.next_days button');

allBtn.forEach((btn, index) =>{
   btn.addEventListener('click', () => {
    const matchId = index + 1;
    window.location.href = '/tickets/detailsMatchs.html?matchId=' + matchId;
   });
});
// Afficher les détails à chaque match pour la page allTickets
/*
const singleBtn = document.querySelectorAll('.next_days button');
singleBtn.forEach((btn, index) =>{
   btn.addEventListener('click', () => {
    const id = index + 1;
    viewDetails(id);
   });
});*/
