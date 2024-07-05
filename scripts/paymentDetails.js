const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
const name = urlParams.get('name');
const ticketCount = urlParams.get('ticketCount');
const matchVersus = urlParams.get('matchVersus');
const matchDate = urlParams.get('matchDate');
const location = urlParams.get('location');
const matchHour = urlParams.get('matchHour');
const category = urlParams.get('category');
const price = urlParams.get('price');
const total = urlParams.get('total');



const feeTickets = (price * 0.3).toFixed(0);
const totalFee = ((ticketCount * price) + (ticketCount * feeTickets)).toFixed(0);

const contGrid = document.createElement('div');
contGrid.className = " poppins bg-gray-800 h-screen grid md:grid-cols-2  m-auto w-full";

const firstGrid = document.createElement('div');
firstGrid.className = "bg-cover bg-[url('/assets/euro2024_img.jpg')] h-full hidden md:block text-white";
firstGrid.innerHTML = `
         <div class="bg-gray-800/50 h-full">
             <div class="p-8">
                 <h1 class="text-4xl mb-4 font-semibold"> ${matchVersus}</h1>
                 <h3 class="text-base  font-semibold mb-2">${matchDate}, ${matchHour}</h3>
                 <h3 class="text-sm mb-2">${location}</h3>
                 <h2 class="text-sm my-4">Section <span class="font-semibold">${category}</span></h2>
                 <h2 class="text-sm my-4"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-green-500 inline">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                </svg>
                
                  PDF tickets will be sent to ${email}</h2>
             </div>
    </div>
`;


const secGrid = document.createElement('div');
secGrid.className = "bg-white py-8 px-6 lg:px-16";
secGrid.innerHTML = `
     <div>
          <div class="w-full mb-4"><img src="/assets/paypalX.svg" alt="" class="m-auto border-b-2 border-blue-400 w-24 pb-2"></div>
         <h2 class="mb-4">Order summary</h2>
         <hr class="bg-gray-400 mb-4">
         <h2 class="text-sm mb-8">Section <span class="font-medium">${category} </span></h2>

         <!--Payment Type-->
         <div class="mb-6 payment_form">
          <div class="font-semibold mb-4 pb-2 border-b">Payment Type <span class="text-gray-400 text-sm">  (Option you'll choose in the PayPal procedure)</span> </div>
               
            <input id="draft" class="peer/draft" type="radio" name="status" value="draft" data--id="${total}" checked/>
            <label for="draft" class="peer-checked/draft:text-sky-500 text-sm mr-12">For Friends and family</label>
          
            <input id="published" class="peer/published" type="radio" name="status" value="published" data--id="${totalFee}"/>
            <label for="published" class="peer-checked/published:text-sky-500 text-sm">For goods and services</label>
          
            <div class="hidden peer-checked/draft:block text-sm">
              <div class="mt-4">              With this option, you will facilitate transactions between our suppliers for quick satisfaction and be spared fee on tickets.              <div>
              </div>
                <div class="grid grid-cols-2 items-center my-4">
                  <h1 class="text-sm">Tickets</h1>
                  <h1 class="text-sm text-right text-gray-400">${ticketCount} × <span class="text-black">€ ${price}</span></h1>
                </div>
                <div class="grid grid-cols-2 items-center mb-4">
                  <h1 class="text-sm">Fee</h1>
                  <h1 class="text-sm text-right text-gray-400">-</span></h1>
                </div>
                <div class="grid grid-cols-2 items-center mb-4 font-medium text-xl">
                  <h1>Total Price</h1>
                  <h1 class="text-right">€ ${total}</h1>
                </div>
              </div>
            </div>
            
            <div class="hidden peer-checked/published:block text-sm">
              <div class="mt-4">              You will be obliged to pay taxes. We advise against this, to ensure that your orders are processed quickly.                <div>
              </div>
              <div class="grid grid-cols-2 items-center my-4">
                  <h1 class="text-sm">Tickets</h1>
                  <h1 class="text-sm text-right text-gray-400">${ticketCount} × <span class="text-black">€ ${price} </span></h1>
                </div>
                <div class="grid grid-cols-2 items-center mb-4">
                  <h1 class="text-sm">Fee</h1>
                  <h1 class="text-sm text-right text-gray-400">${ticketCount} × <span class="text-black">€ ${feeTickets}</span></h1>
                </div>
                <div class="grid grid-cols-2 items-center mb-4 font-medium text-xl">
                  <h1>Total Price</h1>
                  <h1 class="text-right">€ ${totalFee} </h1>
                </div>
              </div>
            </div>
        </div>



         <hr class="bg-gray-400 mb-4">
         <div class="my-4" id="next_payment">
          <div class="font-medium text-xl mb-4">Paypal: What happens next</div>
          <ul style="list-style-type: disc;" class="text-sm ml-6">
             <li>You will be redirected to PayPal website to complete the payment</li>
             <li>Make sure you complete all the steps with PayPal and choose the correct option</li>
             <li>You'll receive confirmation after you pay</li>
          </ul>
                    <p class="text-sm my-4">If you have encountered a problem during payment, please  <a class="text-sky-400" href="mailto:sportseventticket@gmail.com?subject=Payment%20issues&body=Hello%20Admin,%0D%0A%0D%0Awe%20have%20encountered%20a%20problem%20when%20paying%20for%20tickets.%0D%0AI'm%20buying%20${ticketCount}%20tickets%20for%20the%20${matchVersus}%20game%20in%20section%20${category}.%20This%20is%20a%20total%20of%20%E2%82%AC${total}.%0D%0APlease%20check%20and%20let%20us%20know%20the%20next%20steps.%0D%0A%0D%0AAll%20the%20best.">click here</a> to keep us informed.</p>

                   <a target="_blank" id="paypal_Btn" href="https://paypal.me/sportseventst/${total}"class="paypal_btn inline-block mt-8 w-1/2 mx-auto flex rounded-lg py-4 px-8 bg-yellow-500 h-fit hover:bg-white hover:border-blue-950 transition-colors ease-out duration-200 border border-yellow-500 "><img src="/assets/paypalX.svg" alt="" class="w-24 m-auto"></a>
         </div>
     </div>
`;

contGrid.appendChild(firstGrid);
contGrid.appendChild(secGrid);
document.querySelector('body').appendChild(contGrid);

//const btnRadios = document.querySelectorAll('input[name="status"]');

//console.log(document.querySelector('input[name="status"]:checked').getAttribute('data--id'));
//console.log(document.querySelector('.paypal_btn').getAttribute('href'));
document.addEventListener('DOMContentLoaded', () =>{
     const paymentBtn = document.querySelector('.paypal_btn');
              // Récupère l'input radio déjà coché au départ
              const form = document.querySelector('.payment_form');
            const defaultChecked = document.querySelector('input[name="status"]:checked');
            let defaultValue = defaultChecked ? defaultChecked.getAttribute('data--id') : null;

  

            // Initialise l'affichage avec la valeur par défaut
            if (defaultValue) {
           // console.log(defaultValue);
            paymentBtn.setAttribute('href', 'https://paypal.me/sportseventst/'+ defaultValue);

            
            }

            // Ajoute un gestionnaire d'événements change pour les inputs radio
            form.addEventListener('change', (event) => {
                 event.preventDefault();
                if (event.target.name === 'status') {
                   // console.log(event.target.getAttribute('data--id'));
                    paymentBtn.setAttribute('href', 'https://paypal.me/sportseventst/'+event.target.getAttribute('data--id'));
                    console.log(paymentBtn);
                }
            });
});

 
