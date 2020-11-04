Feature: Customer Registration
  Everybody wants to know when it's Friday

  Scenario: Inscription d'un customer alors qu'on est déjà inscrit
    Given Un customer veut s'incrire
    When il renseigne ses informations "Paul" "KOFFI" "pkoffi5@gmail.com" "12345" "3 RUE SOUTRANE" "0766881636" "M"
    Then il reçoit le message "An user with that email already exists"