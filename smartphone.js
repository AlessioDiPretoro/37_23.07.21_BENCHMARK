"use strict";
let filteredCalls;
class User {
    constructor(_carica, _numeroChiamate, _costoMinuto = 0.20, _registroChiamate) {
        this.carica = _carica;
        this.numeroChiamate = _numeroChiamate;
        this.costoMinuto = _costoMinuto;
        this.registroChiamate = _registroChiamate;
    }
    ricarica(euro) {
        this.carica += euro;
    }
    get numero404() {
        return "Saldo disponibile:" + this.carica + "€";
    }
    get getNumeroChiamate() {
        return this.numeroChiamate;
    }
    chiamata(min) {
        if (min * this.costoMinuto < this.carica) {
            this.numeroChiamate++;
            this.carica = this.carica - (this.costoMinuto * min);
            let today = Date();
            //let today: string = "Fri Jul 21 2023 12:24:10 GMT+0200 (Ora legale dell’Europa centrale)"; //usato per prove a mano
            this.registroChiamate.push({ id: this.registroChiamate.length, durata: min, dataEora: today });
        }
        else
            alert(`Hai credito per ${this.carica / this.costoMinuto} minuti, effettuare una ricarica`);
        //throw new Error("Effettuare una ricarica.");
    }
    azzeraChiamate() {
        this.numeroChiamate = 0;
        this.registroChiamate.splice(1, this.registroChiamate.length);
        // ok cancella tutto tranne il primo elemento di default
    }
    mostraRegistroChiamate() {
        return this.registroChiamate;
    }
    filtraChiamatePerDataOra(dataDaRicercare) {
        return this.registroChiamate.filter(item => item.dataEora.includes(dataDaRicercare));
    }
    ;
}
/* decommentare per effettuare test in console
let user1 = new User(20, 0, 0.20, [{id:0, durata:0, dataEora:""}])
user1.chiamata(1)
setTimeout(()=> user1.chiamata(1), 1000)
setTimeout(()=> user1.chiamata(1), 2000)
setTimeout(()=> user1.chiamata(2), 3000)
setTimeout(()=> user1.chiamata(3), 4000)
setTimeout(()=> user1.chiamata(3), 5000)
setTimeout(()=> user1.chiamata(3), 6000)
*/
// setTimeout(()=> user1.azzeraChiamate(), 6000) // ok cancella tutto tranne il primo elemento di default
// console.log("Registro Chiamate:", user1.mostraRegistroChiamate());
// console.log("chiamate filtrate:", user1.filtraChiamatePerDataOra("12:59"));
/*
setTimeout(() => console.log(user1.mostraRegistroChiamate()), 7000);
setTimeout(() => console.log("chiamate filtrate", user1.filtraChiamatePerDataOra("13:08:46")), 7000);
*/
// user1.azzeraChiamate()
// console.log(user1.mostraRegistroChiamate());
let users = [];
let instance;
let createPhone = document.getElementById("createSmart");
let mainRow = document.getElementById("mainRow");
createPhone === null || createPhone === void 0 ? void 0 : createPhone.addEventListener("click", () => {
    instance = new User(0, 0, 0.20, [{ id: 0, durata: 0, dataEora: "" }]);
    users.push(instance);
    let thisPhone = document.createElement("div");
    thisPhone.classList.add("card", "col-3");
    thisPhone.innerHTML = `
  <img
    src="https://media.istockphoto.com/id/1161116588/photo/mobile-phone-top-view-with-white-screen.jpg?s=612x612&w=0&k=20&c=6nGTbnTvQUiq2XXSYuT411pC-5B1SUjhpLhE3eGrNIw="
    class="card-img-top"
    alt="phonePic"
  />
  <div class="card-body">
    <h5 class="card-title">Utente ${users.length}</h5>
    <p class="card-text credit">Credito Residuo:</p>
    <p class="card-text nCalls">Chiamate Effettuate:</p>
    <p class="card-text">Elenco chiamate:</p>
    <ul class="calls">
    </ul>
    <form class="addCreditForm">
    <input type="numer" name="addCredit" placeholder="Inserie Credito" class="addCreditInput mb-2" required />
    <button class="btn btn-primary addCreditButton mb-2">Aggiungi credito</button>
  </form>
    <form class="addCallForm">
      <input type="numer" name="timeCall" placeholder="Durata Chiamata" class="timeCallInput mb-2" required />
      <button class="btn btn-primary timeCallInputButton mb-2">Effettua chiamata</button>
    </form>
    <button class="btn btn-primary resetCalls mb-2">Resetta chiamate</button>
    <form class="findCallForm">
      <input type="numer" name="findCall" placeholder="Data / ora ricerca" class="findCallInput mb-2" required />
      <button class="btn btn-primary findCallInputButton mb-2">Cerca chiamate</button>
    </form>
    <p>Ricerca:</p>
    <ul class="searchedCalls"></ul>
  </div>

  `;
    mainRow.appendChild(thisPhone);
    let addCredit = thisPhone.querySelector(".addCreditForm");
    let credit = thisPhone.querySelector(".credit");
    let nCalls = thisPhone.querySelector(".nCalls");
    let addCreditInput = thisPhone.querySelector(".addCreditInput");
    let calls = thisPhone.querySelector(".calls");
    let findCallInput = thisPhone.querySelector(".findCallInput");
    let searchedCalls = thisPhone.querySelector(".searchedCalls");
    let resetCalls = thisPhone.querySelector(".resetCalls");
    resetCalls.addEventListener("click", (r) => {
        instance.azzeraChiamate();
        updateUI();
    });
    addCredit === null || addCredit === void 0 ? void 0 : addCredit.addEventListener("submit", (e) => {
        e.preventDefault();
        instance.ricarica(parseInt(addCreditInput.value));
        addCreditInput.value = "";
        // credit.innerText = "Credito Residuo: " + instance.carica.toFixed(2)
        updateUI();
    });
    let addCall = thisPhone.querySelector(".addCallForm");
    addCall.addEventListener("submit", (e) => {
        e.preventDefault();
        let timeCallInput = thisPhone.querySelector(".timeCallInput");
        // console.log("instance.carica",instance.carica, typeof(instance.carica) );
        // console.log("costoMinuto", instance.costoMinuto);
        // console.log("instanceBefore", instance);
        instance.chiamata(parseInt(timeCallInput.value));
        // console.log("instanceAfter", instance);
        timeCallInput.value = "";
        // credit.innerText = "Credito Residuo: " + instance.carica.toFixed(2)
        // nCalls.innerText = "Chiamate Effettuate:" + (instance.registroChiamate.length -1) 
        updateUI();
        // calls.innerText = ""
        for (let i = 1; i < instance.registroChiamate.length; i++) {
            let li = document.createElement("li");
            li.innerText = instance.registroChiamate[i].id + instance.registroChiamate[i].durata + instance.registroChiamate[i].dataEora.slice(0, 25);
            calls.appendChild(li);
        }
        /* fatto con classico for per escludere il primo elemento della lista
        instance.registroChiamate.forEach((e) => {
          let li = document.createElement("li")
          li.innerText = e.id + e.durata + e.dataEora
          calls.appendChild(li)
    
        }) */
    });
    let findCall = thisPhone.querySelector(".findCallForm");
    findCall.addEventListener("submit", (e) => {
        e.preventDefault();
        searchedCalls.innerText = "";
        instance.filtraChiamatePerDataOra(findCallInput.value).forEach((c) => {
            let li = document.createElement("li");
            li.innerText = c.id + c.durata + c.dataEora.slice(0, 25);
            searchedCalls.appendChild(li);
        });
        findCallInput.value = "";
    });
    let updateUI = () => {
        credit.innerText = "Credito Residuo: " + instance.carica.toFixed(2);
        nCalls.innerText = "Chiamate Effettuate:" + (instance.registroChiamate.length - 1);
        calls.innerText = "";
    };
});
