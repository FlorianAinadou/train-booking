Feature: Train Selector
  Everybody wants to know when it's Friday

  Scenario: Demandez une liste de trains disponible
    Given Un customer veut réverser un train
    When il part de "Nice" vers "Paris"
    Then il reçoit une liste de trains