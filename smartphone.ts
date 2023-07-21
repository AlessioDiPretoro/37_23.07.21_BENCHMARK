interface Smartphone {
  carica: number; 
  numeroChiamate: number; 
  costoMinuto: number; 
  registroChiamate:{
    id:number,
    durata:number,
    dataEora:string
  }[]
  ricarica(euro: number): void;
  get numero404(): string;
  get getNumeroChiamate(): number;
  chiamata(min: number): void;
  azzeraChiamate(): void;
  mostraRegistroChiamate():{}[]
  filtraChiamatePerDataOra(dataDaRicercare:string):{}[]
}
let filteredCalls:{}[];

class User implements Smartphone {
  
  carica: number
  numeroChiamate: number
  costoMinuto: number
  registroChiamate: {
    id: number,
    durata: number,
    dataEora: string,
  }[]
  constructor(_carica:number, _numeroChiamate:number, _costoMinuto:number = 0.20, _registroChiamate:{id: number,
    durata: number,
    dataEora: string,}[]){
    this.carica = _carica
    this.numeroChiamate = _numeroChiamate
    this.costoMinuto = _costoMinuto
    this.registroChiamate = _registroChiamate
  }
  ricarica(euro: number): void {
    this.carica += euro;
  }
  get numero404(): string {
    return "Saldo disponibile:" + this.carica + "€";
  }
  get getNumeroChiamate(): number {
    return this.numeroChiamate;
  }
  chiamata(min: number): void {
    if (min * this.costoMinuto < this.carica) {
      this.numeroChiamate++;
      this.carica = this.carica - this.costoMinuto * min;
      let today: string = Date();
      //let today: string = "Fri Jul 21 2023 12:24:10 GMT+0200 (Ora legale dell’Europa centrale)"; //usato per prove a mano
      this.registroChiamate.push({ id: this.registroChiamate.length, durata: min, dataEora: today });
    } else throw new Error("Effettuare una ricarica.");
  }
  azzeraChiamate(): void {
    this.numeroChiamate = 0;
    this.registroChiamate.splice(1,this.registroChiamate.length)
    // ok cancella tutto tranne il primo elemento di default
  }
  mostraRegistroChiamate(): {}[] {
    return this.registroChiamate;
  }
  filtraChiamatePerDataOra(dataDaRicercare: string): {}[] {
    
    return this.registroChiamate.filter(item => item.dataEora.includes(dataDaRicercare));
  
};
}
let user1 = new User(20, 0, 0.20, [{id:0, durata:0, dataEora:""}])
user1.chiamata(1)
setTimeout(()=> user1.chiamata(1), 1000)
setTimeout(()=> user1.chiamata(1), 2000)
setTimeout(()=> user1.chiamata(2), 3000)
setTimeout(()=> user1.chiamata(3), 4000)
setTimeout(()=> user1.chiamata(3), 5000)
setTimeout(()=> user1.chiamata(3), 6000)
// setTimeout(()=> console.log(user1.mostraRegistroChiamate()), 5000)
// setTimeout(()=> user1.azzeraChiamate(), 6000) // ok cancella tutto tranne il primo elemento di default
// console.log("Registro Chiamate:", user1.mostraRegistroChiamate());
// console.log("chiamate filtrate:", user1.filtraChiamatePerDataOra("12:59"));
setTimeout(() => console.log(user1.mostraRegistroChiamate()), 7000);
setTimeout(() => console.log("chiamate filtrate", user1.filtraChiamatePerDataOra("13:01:20")), 7000);
// user1.azzeraChiamate()
// console.log(user1.mostraRegistroChiamate());
