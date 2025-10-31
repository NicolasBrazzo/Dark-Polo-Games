export const GAMES = {
  "indovina-chi": {
    title: "Indovina chi Rapper",
    subtitle:
      "Questo gioco funziona esattamente come indovina chi, solo con i Rapper",
    route: "/indovinaChiRapper",
    rules: [
      "Puoi escludere i rapper solo dopo aver visto la risposta",
      "Non puoi rifare la stessa domanda più di una volta",
      "Quando elimini un rapper puoi rimetterlo in gioco",
      "Hai massimo 10 domande tra quelle disponibili",
    ],
    howTo: [
      "Seleziona la domanda",
      "Chiedi la domanda selezionata",
      "Vedi la risposta",
      "Elimina i rapper",
    ],
    disabledButton: false,
  },
  "indovina-anno-album": {
    title: "Indovina Anno dell'album",
    subtitle:
      "Metti alla prova la tua conoscenza della scena italiana indovinando l'anno di uscita degli album",
    route: "/indovinaAlbumAnno",
    rules: ["SHOUT"],
    howTo: [
      "Leggi il nome dell'album",
      "Fai la scelta dell'anno di quell'album",
      "Selezione l'anno e premi su Verifica",
      "Alla fine delle 20 domande avrai il tuo risultato",
    ],
    disabledButton: false,
  },
  "uwufufu-trap": {
    title: "Uwufufu Trap",
    subtitle:
      "Crea la tua classifica dei tuoi trapper italiani preferiti lasciandone uno solo",
    route: "/uwufufu",
    rules: ["SHOUT"],
    howTo: [
      "da inserire"
    ],
    disabledButton: true,
  },
};
