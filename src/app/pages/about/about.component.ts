import { Component, OnInit } from '@angular/core'
import { UseCase } from './usecases/usecase.model'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  readonly PLAIN_USER = 'Reguliere gebruiker'
  readonly ADMIN_USER = 'Administrator'

  useCasesUser: UseCase[] = [
    {
      id: 'UC-101',
      name: 'Inloggen',
      description: 'Hiermee logt een bestaande gebruiker in.',
      scenario: [
        'Gebruiker vult email en password in en klikt op Login knop.',
        'De applicatie valideert de ingevoerde gegevens.',
        'Indien gegevens correct zijn dan redirect de applicatie naar het startscherm.'
      ],
      actor: this.PLAIN_USER,
      precondition: 'Geen',
      postcondition: 'De actor is ingelogd'
    },
    {
      id: 'UC-102',
      name: 'Registreren',
      description: 'Hiermee kan een gebruiker een account aanmaken op de website',
      scenario: [
        'Gebruiker navigeert naar registratie pagina.',
        'Gebruiker voert in gegevens voor registreren.',
        'Applicatie controlleert ingevoerde gegevens.',
        'Indien gegevens correct zijn wordt een nieuw account aangemaakt en wordt de gebruiker herleid naar de inlog pagina',
        'Gebruiker logt in'
      ],
      actor: this.PLAIN_USER,
      precondition: 'Browser staat open',
      postcondition: 'Account is aangemaakt'
    },
    {
      id: 'UC-103',
      name: 'Wijzigen persoonlijke informatie',
      description: 'Een reguliere gebruiker kan zijn eigen account wijzigen.',
      scenario: [
        'Gebruiker navigeert naar zijn eigen profiel.',
        'Gebruiker drukt wijzig informatie knop.',
        'Gebruiker wijzigt informatie.',
        'Applicatie controlleert ingevoerde informatie wijzingen.',
        'Indien correct wijzigt applicatie de account en wordt de gebruiker herleid naar zijn profiel pagina.'
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Account is gewijzigd.'
    },
    {
      id: 'UC-104',
      name: 'Toevoegen gebruiker',
      description: 'Een administrator kan een nieuwe gebruiker toevoegen aan het systeem.',
      scenario: [
        'Administrator navigeert naar gebruikerslijst.',
        'Administrator drukt op de knop om een gebruiker toe te voegen.',
        'Adminitstator voert in gegevens nieuwe gebruiker.',
        'Applicatie controlleert ingevoerde gegevens.',
        'Indien correct voegt de applicatie het gebruiker toe en wordt de adminitstator herleid naar de profiel pagina van deze gebruiker.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Een nieuwe gebruiker is toegevoegd.'
    },
    {
      id: 'UC-105',
      name: 'Inzien gebruikers',
      description: 'Een gebruiker wil gebruikers kunnen inzien.',
      scenario: [
        'Gebruiker navigeert naar gebruikerslijst.',
        'Gebruiker drukt op link naar detailpagina.',
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker kan een andere gebruiker inzien.'
    },
    {
      id: 'UC-106',
      name: 'Wijzigen persoonlijke informatie administrator',
      description: 'Een administrator kan een gebruikers informatie wijzigen.',
      scenario: [
        'Administrator navigeert naar gebruikerslijst.',
        'Administrator drukt op de link om naar detailpagina van een gebruiker te gaan.',
        'Administrator drukt op de knop om gebruikersgegevens te veranderen.',
        'Adminitstator voert in gewijzigde gegevens gebruiker.',
        'Applicatie controlleert ingevoerde gegevens.',
        'Indien correct wijzigt de applicatie het account en wordt de adminitstator herleid naar de detailpagina van deze gebruiker.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'De gebruiker is gewijzigd.'
    },
    {
      id: 'UC-107',
      name: 'Verwijderen van een gebruiker',
      description: 'Een administrator kan een gebruiker verwijderen uit het systeem.',
      scenario: [
        'Administrator navigeert naar gebruikerslijst.',
        'Administrator drukt op de link om naar detailpagina van een gebruiker te gaan.',
        'Administrator drukt op de knop om gebruiker te verwijderen.',
        'Applicatie verwijdert gebruiker.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'De gebruiker is verwijderd.'
    },
    {
      id: 'UC-108',
      name: 'Toevoegen van een vriend',
      description: 'Een reguliere gebruiker kan zijn een andere gebruiker toevoegen als een vriend.',
      scenario: [
        'Gebruiker navigeert naar gebruikerslijst.',
        'Gebruiker zoekt naar een gebruiker.',
        'Gebruiker drukt op link naar gekozen gebruiker.',
        'Gebruiker drukt op de voeg vriend toe knop in het detailscherm.',
        'De applicatie verstuurd de vriendverzoek naar gekozen gebruiker',
        'Indien accepteren door andere gebruiker is deze gebruiker toegevoegd als een gebruiker.'
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker is toegevoegd als vriend.'
    },
    {
      id: 'UC-109',
      name: 'Verwijderen van een vriend',
      description: 'Een reguliere gebruiker kan zijn een bestaande vriend verwijderen uit zijn lijst.',
      scenario: [
        'Gebruiker navigeert naar profielpagina.',
        'Gebruiker gaat naar vriendenlijst.',
        'Gebruiker zoekt naat gewenste gebruiker.',
        'Gebruiker drukt op de verwijder vriend.'
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker is verwijderd als vriend.'
    }
  ]

  useCasesMuseum: UseCase[] = [
    {
      id: 'UC-201',
      name: 'Toevoegen van een museum',
      description: 'Een administrator kan een museum toevoegen aan het systeem.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop voeg museum toe.',
        'Gebruiker voert in gegevens nieuwe museum.',
        'Applicatie controlleert gegegvens.',
        'Indien correct voegt applicatie museum toe aan systeem.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Museum is toegevoegd.'
    },
    {
      id: 'UC-202',
      name: 'Wijzigen van een museum',
      description: 'Een administrator kan een museum wijzigen in het systeem.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop naar detailpagina museum.',
        'Gebruiker voert in gewijzige gegevens museum.',
        'Applicatie controlleert gegegvens.',
        'Indien correct wijzigt applicatie de museum in het systeem.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Museum is gewijzigd.'
    },
    {
      id: 'UC-203',
      name: 'Verwijderen van een museum',
      description: 'Een administrator kan een museum verwijderen uit het systeem.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop naar detailpagina museum.',
        'Gebruiker drukt op knop verwijder.',
        'Applicatie verwijdert museum.',
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Museum is verwijderd.'
    },
    {
      id: 'UC-204',
      name: 'Inzien van een museum',
      description: 'Een gebruiker kan een museum inzien.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop naar detailpagina museum.',
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker kan museum inzien.'
    },
  ]

  useCasesExhibition: UseCase[] = [
    {
      id: 'UC-301',
      name: 'Toevoegen van een tentoonstelling',
      description: 'Een administrator kan een tentoonstelling toevoegen aan het systeem.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop details museum.',
        'Gebruiker drukt op knop tentoonstelling toevoegen.',
        'Gebruiker voert in gegevens nieuwe tentoonstelling.',
        'Applicatie controlleert gegegvens.',
        'Indien correct voegt applicatie tentoonstelling toe aan systeem.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Tentoonstelling is toegevoegd.'
    },
    {
      id: 'UC-302',
      name: 'Wijzigen van een tentoonstelling',
      description: 'Een administrator kan een tentoonstelling wijzigen in het systeem.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop naar detailpagina museum.',
        'Gebruiker gaat naar lijst tentoonstellingen van het museum.',
        'Gebruiker drukt op knop naar detailpagina tentoonstelling.',
        'Gebruiker drukt op knop naar wijzigen tentoonstelling.',
        'Gebruiker voert in gewijzigde gegevens tentoonstelling.',
        'Applicatie controlleert gegegvens.',
        'Indien correct wijzigt applicatie de tentoonstelling in het systeem.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Tentoonstelling is gewijzigd.'
    },
    {
      id: 'UC-303',
      name: 'Verwijderen van een tentoonstelling',
      description: 'Een administrator kan een tentoonstelling verwijderen uit het systeem.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop naar detailpagina museum.',
        'Gebruiker gaat naar lijst tentoonstellingen van het museum.',
        'Gebruiker drukt op knop naar detailpagina tentoonstelling.',
        'Gebruiker drukt op verwijderen tentoonstelling.',
        'Applicatie verwijdert tentoonstelling.',
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Tentoonstelling is verwijderd.'
    },
    {
      id: 'UC-304',
      name: 'Inzien van een tentoonstelling',
      description: 'Een gebruiker kan een tentoonstelling inzien.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop naar detailpagina museum.',
        'Gebruiker gaat naar lijst tentoonstellingen van het museum.',
        'Gebruiker drukt op knop naar detailpagina tentoonstelling.',
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker kan tentoonstelling inzien.'
    },
  ]

  useCasesTicket: UseCase[] = [
    {
      id: 'UC-401',
      name: 'Kopen van een ticket',
      description: 'Een gebruiker kan een ticket kopen voor een tentoonstelling.',
      scenario: [
        'Gebruiker navigeert naar museum lijst.',
        'Gebruiker drukt op knop details museum.',
        'Gebruiker drukt op knop tentoonstelling toevoegen.',
        'Gebruiker drukt op knop ticket kopen.',
        'Gebruiker voert in gegevens voor het kopen van een ticket.',
        'Applicatie controlleert gegegvens.',
        'Indien correct voegt applicatie ticket toe aan systeem en gebruiker.'
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker heeft ticket gekocht.'
    },
    {
      id: 'UC-402',
      name: 'Annuleren van een ticket',
      description: 'Een gebruiker kan een ticket annuleren.',
      scenario: [
        'Gebruiker navigeert naar zijn tickets.',
        'Gebruiker drukt op gewenste ticket.',
        'Indien annuleerbaar drukt gebruiker op annuleren.',
        'Aanvraag annuleren wordt gecontroleerd.',
        'Indien aanvraag goed gekeurd annulering van ticket.',
        'Applicatie zet ticket als geannuleerd.',
      ],
      actor: this.ADMIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Ticket aankoop is geannuleerd.'
    },
    {
      id: 'UC-403',
      name: 'Inzien van een ticket',
      description: 'Een gebruiker kan een bestaande ticket inzien.',
      scenario: [
        'Gebruiker navigeert naar zijn tickets.',
        'Gebruiker drukt op gewenste ticket.',
      ],
      actor: this.PLAIN_USER,
      precondition: 'De actor is ingelogd',
      postcondition: 'Gebruiker kan ticket inzien.'
    },
  ]

  constructor() {}

  ngOnInit() {}
}
