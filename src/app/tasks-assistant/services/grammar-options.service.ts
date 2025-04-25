import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrammarOptionsService {

  languageLevelList = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  textTypes = [
    {type: 'sentences', title: 'Einfache Sätze'},
    {type: 'text', title: 'Kohärenter Text'},
    {type: 'dialog', title: 'Dialog'},
  ];
  tenses = [
    'Präteritum',
    'Perfekt',
    'Plusquamperfekt',
    'Präsens',
    'Futur 1',
    'Futur 2'
  ];
  formTypes = [
    'Aktiv',
    'Passiv'
  ];

  kasus = [
    'Nominativ',
    'Genitiv',
    'Dativ',
    'Akkusativ',
    'Plural',
  ];
  article = [
    {article: 'bestimte Artikle', title: 'bestimte Artikle'},
    {article: 'unbestimte Artikle', title: 'unbestimte Artikle'},
    {article: 'ohne Artikele', title: 'ohne Artikele'},
  ];
  comparisons = [
    {comparison: 'Positiv', title: 'Positiv'},
    {comparison: 'Komparativ', title: 'Komparativ'},
    {comparison: 'Superlativ', title: 'Superlativ'},
  ];
  verbForm = ['regelmäßig', 'unregelmäßig', 'trennbaren', 'transitive', 'intransitive', 'reflexive'];
  modalsVerbs = ['dürfen', 'können', 'mögen', 'müssen', 'sollen', 'wollen'];
  modus = ['Indikativ', 'Konjunktiv I', 'Konjunktiv II', 'Imperativ'];
  prepositionsType = ['kausale', 'lokale', 'temporale', 'modale', 'wechselpräpositionen'];
  typeOfSentences = ['Einfache Sätze', 'Komplexe Sätze', 'W-Fragen Sätze', 'Ja/Nein Fragen Sätze', 'Imperative Sätze'];
  konnektoren = ['und', 'oder', 'aber', 'denn', 'weil', 'obwohl', 'wenn', 'damit', 'trotzdem', 'deshalb'];
  doppelKonnektoren = ['sowohl ... als auch', 'entweder ... oder', 'nicht nur ... sondern auch', 'weder ... noch', 'je ... desto', 'einerseits ... andererseits'];

}
