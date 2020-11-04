Feature: Train Selector
  Everybody wants to know when it's Friday

Scenario: Réserver un train
    Given Un customer veut réverser un train
    When il part de "Nice" vers "Paris"
    Then il choisi le train avec id 6178 et donne son email "pkoffi5@gmail.com"
    Then il regarde ces réservations via son mail "pkoffi5@gmail.com" et voit 1 réservation
    Then il paie son billet de 10€ qui a l'id "RA8V1J" avec son mail "pkoffi5@gmail.com"