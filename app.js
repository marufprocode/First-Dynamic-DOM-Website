const carObject = {
    vechile: 'Car',
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    farePerKilo: 3,
    capacity: 5,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil ipsam inventore, officiis perspiciatis adipisci quidem nesciunt quo modi quos."
}
const BikeObject = {
    vechile: 'Bike',
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    farePerKilo: 2,
    capacity: 2,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil ipsam inventore, officiis perspiciatis adipisci quidem nesciunt quo modi quos."
}
const busObject = {
    vechile: 'Bus',
    imageUrl: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    farePerKilo: 6,
    capacity: 20,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur nihil ipsam inventore, officiis perspiciatis adipisci quidem nesciunt quo modi quos."
}

const objArray = [carObject, busObject, BikeObject];

document.getElementById('search-btn').addEventListener('click', function(){
    const searchInput = document.getElementById('search-value');
    const mainSec = document.getElementById('main-section');
    for (const obj of objArray){
        if(searchInput.value.toLowerCase() == obj.vechile.toLowerCase()){
            mainSec.innerHTML='';
            createServiceCard(obj);
            return;
        }
        else{
            mainSec.innerHTML=`<h3 class="text-center text-danger">Sorry! We have no services that matches the search criteria.</h3>`;
        }
    }
})

function createServiceCard (serviceObject){
    const stringfyObj = JSON.stringify(serviceObject);
    const mainSection = document.getElementById('main-section');
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mt-3  mx-auto" style="max-width: 800px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${serviceObject.imageUrl}" class="img-fluid rounded-start h-100" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Transport Mood ${serviceObject.vechile}</h5>
          <p class="card-text">${serviceObject.description}</p>
          <p class="card-text"><small class="text-muted">Fare per kilo ${serviceObject.farePerKilo}</small> <small class="text-muted">Capacity ${serviceObject.capacity}</small></p>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick='handleBooking(${stringfyObj})'>
            see details
        </button>
        </div>
      </div>
    </div>
    </div>
    `;
    mainSection.appendChild(div);
    
}

/* function displayAllArrayCards(arrayObjet){
    for (let obj of arrayObjet){
        createServiceCard(obj);
    }
}

displayAllArrayCards(objArray); */

for (let obj of objArray){
    createServiceCard(obj);
}

function handleBooking (object){
    const stringfyObj = JSON.stringify(object);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML=`
    <div class="card" style="width: 100%;">
    <img src="${object.imageUrl}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">Transport Mood ${object.vechile}</h5>
      <p class="card-text"><small class="text-muted">Fare per kilo ${object.farePerKilo}</small> <small class="text-muted">Capacity ${object.capacity}</small></p>
      <h6>Fare: <span id="fare" class="text-secondary"></span></h6>
      <h6>Tax: <span id="tax" class="text-secondary"></span></h6>
      <h6>Total Cost: <span id="total-cost" class="text-secondary"></span></h6>
      <div class="d-flex mt-3">
        <input class="input-group-text w-50 me-1 border-primary" type="number" id="distance-to-go" placeholder="Distance To Travel">
        <input class="input-group-text w-50 me-1 border-primary" type="number" id="vachile-need" placeholder="How Many Vachile Need?">
        <button class="btn btn-primary" onclick='totalCostCal(${stringfyObj})'>Submit</button>
        </div>
    </div>
  </div>
    `;
    
}

function totalCostCal(obj){
    const farePerKilo = parseFloat(obj.farePerKilo);
    const distanceToGo = parseFloat(document.getElementById('distance-to-go').value);
    const vehileNeed = parseFloat(document.getElementById('vachile-need').value);
    const totalFare = farePerKilo*distanceToGo*vehileNeed;
    const totalTax = totalFare*0.08;
    const totalCost = totalFare+totalTax;
    const fareHTML = document.getElementById('fare');
    const taxHTML = document.getElementById('tax');
    const totalCostHTML = document.getElementById('total-cost');
    fareHTML.innerText = `$${totalFare}`;
    taxHTML.innerText = `$${totalTax}`;
    totalCostHTML.innerText = `$${totalCost}`;
    document.getElementById('vachile-need').value='';
    document.getElementById('distance-to-go').value='';

}

