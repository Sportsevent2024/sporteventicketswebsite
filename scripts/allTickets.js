

const reponse = await fetch('/scripts/matchs.json');

const matchs = await reponse.json();

const contentWeek = document.querySelector('.min_week_days');

export function displayUpcomingMatches(daysAhead) {
    const today = new Date();
    const upcomingMatches = matchs.filter(match => {
    const matchDate = new Date(match.date);
    const timeDiff = matchDate - today;
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
      return dayDiff > 0 && dayDiff <= daysAhead;
    });
    
        //code pour afficher les matchs sur le front-end
        let i = 0;
        for(i = 0; i < upcomingMatches.length; i++){
          const cardMatchs = document.createElement('div');
          cardMatchs.className = "grid grid-cols-6 md:mx-auto lg:grid-cols-1 w-full items-center bg-white rounded-md p-2 shadow";
     
     cardMatchs.innerHTML = `
          <img alt="" src="/assets/UEFA_Euro_2024_Logo.svg.png"
        class="h-32 w-full p-2 object-contain" />
    
      <div class="my-2 col-span-3 w-full ml-2 mx-auto lg:text-center">
           <h2 class="font-semibold text-[15px] md:text-[20px]  text-blue-950">${upcomingMatches[i].teams.home} vs. ${upcomingMatches[i].teams.away}</h2>
           <h4 class="text-[10px] md:text-[15px]">${upcomingMatches[i].simpleDate} • ${upcomingMatches[i].teams.hour}</h4>
           <p class="text-[8px] md:text-[13px]">${upcomingMatches[i].location}</p>
      </div>
      <button id="item${upcomingMatches[i].id}" class="inline-block text-[9px] md:text-[14px] col-span-2 text-center rounded border  transition ease-out duration-200 border-blue-950 bg-blue-950 py-4 px-2 mx-2 text-white hover:bg-transparent hover:text-blue-950">View Tickets</button>
     `;


     contentWeek.appendChild(cardMatchs);
        };
  // console.log(`Matchs pour les ${daysAhead} prochains jours :`, upcomingMatches);
  };
displayUpcomingMatches(7); // Affiche les matchs des 7 prochains jours


  const allBtn = document.querySelectorAll('.content_week_days button');


// Ouvrir la page detailsMatchs avec l'id correspondant au match, dont le paramètre est l'ID
allBtn.forEach((btn, index) =>{
   btn.addEventListener('click', () => {
    const matchId = index + 1;
    window.location.href = '/tickets/detailsMatchs.html?matchId=' + matchId;
   });
});

