interface Smartphone {
  carica: number; 
  numeroChiamate: number; 
  costoMinuto: number; 
  ricarica(euro: number): void;
  numero404(): string;
  getNumeroChiamate(): number;
  chiamata(min: number): void;
  azzeraChiamate(): void;
}

let Smartphone1: Smartphone = {
  carica: 0,
  numeroChiamate: 0,
  costoMinuto: 0.2,
  ricarica: function (euro: number): void {
    this.carica += euro;
  },
  numero404: function (): string {
    return "Saldo disponibile:" + this.carica + "€";
  },
  getNumeroChiamate: function (): number {
    return this.numeroChiamate;
  },
  chiamata: function (min: number): void {
    if (min * this.costoMinuto < this.carica) {
      this.numeroChiamate ++;
      this.carica = this.carica - this.costoMinuto * min;
    } else throw new Error("Effettuare una ricarica.");
  },
  azzeraChiamate: function (): void {
    this.numeroChiamate = 0;
  },
};

Smartphone1.ricarica(20);
console.log("Smartphone1 dopo prima ricarica", Smartphone1);
console.log("numero404",Smartphone1.numero404());
console.log("getNumeroChiamate",Smartphone1.getNumeroChiamate());
//Smartphone1.chiamata(1000) //mostra l'errore dovuto al credito residuo non sufficiente
Smartphone1.chiamata(10)
console.log("Smartphone1 dopo prima chiamata", Smartphone1);
Smartphone1.azzeraChiamate()
console.log("Smartphone1 dopo azzera chiamata", Smartphone1);