const reponse = await fetch("/scripts/matchs.json");

const matchs = await reponse.json();

// Retenir l'ID correspondant au match dont le bouton a été cliqué
const urlParams = new URLSearchParams(window.location.search);
const idMatch = urlParams.get("matchId");

//Afficher les details du match
function viewDetails(matchID) {
  const matchContent = matchs.find((match) => match.id == matchID);
//let formattedPrice = price.toLocaleString('en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2 });
  if (matchContent) {
    const contentWeek = document.querySelector(".week_days");
    contentWeek.innerHTML = " ";
    const firstCont = document.createElement("div");
    firstCont.className = "min-h-fit lg:grid lg:grid-cols-3 flex flex-wrap-reverse justify-center";

    const secondCont = document.createElement("div");
    secondCont.className = "bg-white w-full lg:h-[90vh] h-fit";

    secondCont.innerHTML = `
            <!--Match, date, lieu-->
        <div class="mt-6 px-4">
            <h1 class="mt-4 heading text-blue-950 font-bold text-xl mb-2">${matchContent.teams.home} vs. ${matchContent.teams.away}  (Semifinals Euro 2024)</h1>
            <p class="text-gray-500 font-medium text-sm">${matchContent.simpleDate} at ${matchContent.teams.hour}, ${matchContent.location}</p>    
        </div>

        <!--choix du ticket (1,2,3,4)-->
        <div class="my-4 px-4">
            <div class="relative inline-block">
                <!-- Dropdown toggle button -->
                <button id="dropdown_btn" class="bg-blue-950 text-white relative flex items-center z-10 p-2 text-sm text-gray-600 border border-transparent rounded-3xl">
                    <span class="mx-1" id="num_tickets">Click to select number of tickets</span> 
                </button>
            
                <!-- Dropdown menu -->
                <div id="dropdown_menu" class="list_tickets absolute hidden ease-out transition-opacity z-20 w-24 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-2xl">
                    
                    <button  class="my-2  w-full inline-block font-semibold text-sm text-blue-950 transition-colors duration-300 transform hover:bg-gray-100">1 ticket</button>
                
                    <hr class="border-gray-200">

                    <button  class="my-2  w-full inline-block font-semibold text-sm text-blue-950 transition-colors duration-300 transform hover:bg-gray-100">2 tickets</button>
                
                    <hr class="border-gray-200">

                    <button class="my-2  w-full inline-block font-semibold text-sm text-blue-950 transition-colors duration-300 transform hover:bg-gray-100">3 tickets</button>
                    
                    <hr class="border-gray-200">

                    <button class="my-2  w-full inline-block font-semibold text-sm text-blue-950 transition-colors duration-300 transform hover:bg-gray-100">4 tickets</button>

                    <hr class="border-gray-200">

                    <button class="my-2  w-full inline-block font-semibold text-sm text-blue-950 transition-colors duration-300 transform hover:bg-gray-100">5 tickets</button>

                    <hr class="border-gray-200">

                    <button class="my-2  w-full inline-block font-semibold text-sm text-blue-950 transition-colors duration-300 transform hover:bg-gray-100">6 tickets</button>

                </div>
            </div>
        </div>

        <!--List des categories et prices-->
        <div class="py-2 border-t grid grid-cols-2 px-4">
                <div class="text-blue-950 font-semibold">Availables tickets</div>
               <!-- <div class="text-gray-400 font-medium text-sm text-right">Price per ticket</div> -->
            </div>
     `;

    const imgCont = document.createElement("div");
    //const imgContainer = document.createElement('div');
    
    // <img src="" alt="">  
    imgCont.className = "w-full lg:h-auto items-center lg:col-span-2 object-center justify-center";
    //imgContainer.className = `h-4/5 w-1/2 mx-auto  my-auto  bg-contain bg-no-repeat bg-[url('${matchContent.stadium}')]`;
       imgCont.innerHTML = `
       <img src="${matchContent.stadium}" alt="" class="h-11/12 w-3/4 lg:m-auto my-4 mx-auto"> 
       `;
  // imgCont.appendChild(imgContainer);
    const thirdCont = document.createElement("div");
    thirdCont.className = "cursor-pointer box_category";
    let j = 0;
    for (let j = 0; j < matchContent.categories.length; j++) {
      const thirdCont = document.createElement("div");
      thirdCont.className = "cursor-pointer box_category mb-2";
thirdCont.innerHTML = `
                  <div class="grid grid-cols-8 items-center py-2 px-4 border-t">
                     <div class="rounded w-1/4 h-6 ${matchContent.categories[j].color}"></div>
                     <div class="col-start-2 col-end-6 text-sm ">${matchContent.categories[j].name}</div>
                     <div class="col-span-3 text-right font-semibold text-normal">€${matchContent.categories[j].price.toLocaleString('en-GB')}<div class="text-gray-400 font-normal text-xs text-right">Price per ticket</div>
</div>
                  </div>
       `;
      secondCont.appendChild(thirdCont);
    }
    firstCont.appendChild(secondCont);

    firstCont.appendChild(imgCont);

    contentWeek.appendChild(firstCont);

    // Afficher un dropdown pour afficher les tickets

    const dropBtn = document.getElementById("dropdown_btn");

    const dropMenu = document.getElementById("dropdown_menu");

    const numTickets = document.querySelectorAll(".list_tickets button");

    const valueCase = document.getElementById("num_tickets");

    // Retenir la valeur du nombre de tickets
    numTickets.forEach((ticket, index) => {
      ticket.addEventListener("click", () => {
        let idT =  index + 1;
        valueCase.innerHTML =
          `${idT}` + `${idT === 1 ? " ticket" : " tickets"}`;
        dropMenu.classList.add("hidden");
        valueCase.setAttribute('data-index', index + 1 );

          const contPopup = document.querySelector(".popup");

          function showFirstp(index) {
            contPopup.className = "absolute poppins bg-gray-800/50 h-[180vh] sm:h-[200vh] lg:h-[120vh] md:h-[220vh] flex justify-center z-30 m-auto w-full";
            const containerPop = document.createElement("div");
            containerPop.className = "w-96 bg-white rounded-lg p-4 mt-8 h-fit";
            containerPop.innerHTML = `
                        <!--Infos Category, Nbre Tickets, Totals-->
                      <div class="grid grid-cols-6 ">
                        <div class="col-span-5">
                          <div class="font-medium mb-2">Section ${
                            matchContent.categories[index].name
                          }</div>
                          <div class="text-sm text-gray-400">${valueCase.getAttribute('data-index')} ${valueCase.getAttribute('data-index') == 1 ? " Nice Seat" : " Seats together"}
                        </div>
                          <div class="text-base font-medium">${valueCase.getAttribute('data-index')} × €${matchContent.categories[index].price.toLocaleString('en-GB')} / <span class="inline-block text-green-400 font-bold">Total price : €${(valueCase.getAttribute('data-index') * matchContent.categories[index].price).toLocaleString('en-GB')} </span></div>  
                        </div>
                        <div class="flex justify-end cursor-pointer close_btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                 </svg>
      
                        </div>
                      </div> 
                        <!--Infos Where are my seats-->
                        <div class="bg-gray-100 py-4 px-2 mt-6 rounded-md">
                          <div class="font-medium mb-2 text-sm">Where are my seats?</div>
                          <div class="text-gray-400 text-xs">After you make your purchase, we will assign you the best available seats in the  ${
                            matchContent.categories[index].name
                          }.</div>
                      </div>
                      <hr class="my-4 border-gray-200"> 
                      <!--Infos Security One-->
                       <div class="grid grid-cols-6 mb-2 items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                             </svg>
      
                           <div class="col-start-2 col-span-5">
                              <div class="font-medium text-sm">Buy safely and securely</div>
                              <div class="text-gray-400 text-xs">More than 12.000 users like you have already bought from us and rate 4.7 out of 5.</div>
                               </div>
                       </div>
          
                       <!--Infos Security Two-->
                       <div class="grid grid-cols-6 mb-2 items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                               <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                       </svg>
      
                          <div class="col-start-2 col-span-5">
                              <div class="font-medium text-sm">${
                                matchContent.teams.home
                              } vs. ${
              matchContent.teams.away
            } - Semifinals Euro 2024</div>
                              <div class="text-gray-400 text-xs">${
                                matchContent.simpleDate
                              }, ${matchContent.teams.hour}, ${
              matchContent.location
            }</div>
                          </div>
                       </div>
          
                      <!--Infos Security Three-->
                      <div class="grid grid-cols-6 mb-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
      
                          <div class="col-start-2 col-span-5">
                             <div class="font-medium text-sm">Electronics tickets</div>
                             <div class="text-gray-400 text-xs">Tickets will be automatically sent to your email address.</div>
                              </div>
                      </div>
          
                      <!--Infos Security Four-->
                      <div class="grid grid-cols-6 mb-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
      
                          <div class="col-start-2 col-span-5">
                             <div class="font-medium text-sm">24-hour support</div>
                             <div class="text-gray-400 text-xs">We are to help you in your language 24 hours a day, 7 days a week</div>
                              </div>
                      </div>
                      <hr class="my-4 border-gray-200"> 
          
                      <button id="btn_nextStepF" class="inline-block text-sm w-full  text-center rounded border  transition ease-out duration-200 border-blue-950 bg-blue-950 py-4 px-2 text-white hover:bg-transparent hover:text-blue-950 mt-2">Next Step</button>
          
            `;
            contPopup.appendChild(containerPop);
            //Close Popup Btn
            document.querySelector(".close_btn").addEventListener("click", () => {
                contPopup.className = " ";
                contPopup.innerHTML = "";
              });

            // Cliquer le btn Popup Infos pour conduire au popup Form
              const btnNForm = document.getElementById('btn_nextStepF');
              const containerForm = document.createElement('div');
              btnNForm.addEventListener('click', ()=>{
                      containerPop.classList.add('hidden');
                      containerForm.className = "w-96 bg-white rounded-lg py-4 px-6 mt-8 h-fit"
                      containerForm.innerHTML = `
                                  <div class="flex justify-end cursor-pointer close_btnF">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>    
            </div>
                <form class="mx-6">
                    <div class="font-medium my-4">Where do you want to receive your tickets?</div>
                    <div>
                        <label for="name" class="inline-block mb-2 text-sm font-medium">NAME</label><br>
                        <input type="text" name="name" id="name" class="text-sm w-fit inline-block h-fit rounded bg-gray-200 mb-4 focus:outline-none p-2" required>    
                    </div>
                    <div>
                        <label for="surname" class="inline-block mb-2 text-sm font-medium">SURNAME</label><br>
                        <input type="text" name="surname" id="surname" class="text-sm w-fit inline-block h-fit rounded bg-gray-200 mb-4 focus:outline-none p-2" required>    
                    </div>

                    <div>
                        <label for="email" class="inline-block mb-2 text-sm font-medium">EMAIL</label><br>
                         <input type="email" name="email" id="email" class="text-sm w-full inline-block h-fit rounded bg-gray-200 mb-4 focus:outline-none p-2" required>
                    </div>              
                    <div>
                        <label for="email" class="inline-block mb-2 text-sm font-medium">CONFIRM EMAIL</label><br>
                         <input type="email" name="confirm_email" id="confirm_email" class="text-sm w-full inline-block h-fit rounded bg-gray-200 mb-4 focus:outline-none p-2" required>
                    </div>
                    <div class="mx-2 flex items-center">
                        <input type="checkbox" name="checkbox" id="checkbox" class="mr-2" required>
                        <div class="inline text-[10px]">I have read and accept the <a href="#" class="underline text-blue-950">Terms & conditions</a> and the <a href="#" class="underline text-blue-950">Privacy Policy</a></div>
                    </div>
                    <button id="btn_P" type="button" class="inline-block text-sm w-full mx-auto text-center rounded border  transition ease-out duration-200 border-blue-950 bg-blue-950 p-2 text-white hover:bg-transparent hover:text-blue-950 mt-2">Next Step</button>
                </form>
                      `;
                contPopup.appendChild(containerForm);
              
                //Bouton Close pour fermer le formulaire
               document.querySelector(".close_btnF").addEventListener("click", () => {
               contPopup.className = " ";
               contPopup.innerHTML = "";
                   });

   

             //Cliquer le btn Popup Infos pour conduire à la page de paiements , Paramètres : nbr_tickets, category, price, mail, location, date, teams
             const btnNPayment = document.getElementById('btn_P');
             btnNPayment.addEventListener('click', ()=>{
                //containerForm.classList.remove('bg-white');
                //containerForm.classList.add('bg-red-200');
                if(document.getElementById('email').value === "" || document.getElementById('name').value === ""){
                //Alert
                const divAlert = document.createElement('div');
                divAlert.className = "rounded text-xs text-red-800 my-2  px-12 transition ease-out duration-200";
                divAlert.textContent = "You should complete all informations before to continue.";
                containerForm.appendChild(divAlert);                 }
                else{
                  const email = document.getElementById('email').value;
                  const name = document.getElementById('name').value;
                  const ticketCount = valueCase.getAttribute('data-index');
                  const matchVersus = matchContent.teams.home + " vs. " + matchContent.teams.away + " - Quarter Finals Euro 2024";
                  const matchDate = matchContent.simpleDate;
                  const location = matchContent.location;
                  const matchHour = matchContent.teams.hour;
                  const category = matchContent.categories[index].name;
                  const price = matchContent.categories[index].price;
                  const total = ticketCount * price;
                  
                  const queryParams = new URLSearchParams({
                   email: email,
                   name: name,
                   ticketCount: ticketCount,
                   matchVersus: matchVersus,
                   matchDate: matchDate,
                   location: location,
                   matchHour: matchHour,
                   category: category,
                   price: price,
                   total: total
                  }).toString();
      
      
                  window.location.href = `/tickets/paymentDetails.html?${queryParams}`;
                }
         
              });
              });


          }

          const allCategory = document.querySelectorAll(".box_category");

          allCategory.forEach((category, index) => {
            category.addEventListener("click", () => {
              showFirstp(index);
            });
          });

      });

    });


    // Afficher la liste pour choisir le nombre de tickets

    function dropAction() {
      dropBtn.addEventListener("click", () => {
        dropMenu.classList.toggle("hidden");
      });
    }
    dropAction();
  } else {
    console.log("match non trouvé");
  }
}

viewDetails(idMatch);

//Close Popup Btn for form
const contPopupx = document.querySelector(".popupx");
