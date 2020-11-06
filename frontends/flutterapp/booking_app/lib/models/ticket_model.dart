import 'package:flutter/material.dart';

class Connection {
  final int connectionNumber;
  final int trainId;
  final String connectionCity;
  final String arrivalDateTime;
  final String departureDateTime;

  Connection(this.connectionNumber, this.trainId, this.connectionCity,
      this.arrivalDateTime, this.departureDateTime);

  @override
  String toString() {
    return 'Connection{connectionNumber: $connectionNumber, trainId: $trainId, connectionCity: $connectionCity, arrivalDateTime: $arrivalDateTime, departureDateTime: $departureDateTime}';
  }
}

class Ticket {
  final int ticketId;
  final int customerId;
  final int trainId;
  final String departureCity;
  final String departureDateTime;
  final String arrivalCity;
  final String arrivalDateTime;
  final List<dynamic> connections;

  Ticket(
      {@required this.ticketId,
      @required this.customerId,
      @required this.trainId,
      this.departureCity,
      this.departureDateTime,
      this.arrivalCity,
      this.arrivalDateTime,
      this.connections})
      : assert(ticketId != null),
        assert(customerId != null),
        assert(trainId != null);

  Ticket.fromMap(Map<String, dynamic> map)
      : ticketId = map["ticketId"],
        customerId = map["customerId"],
        trainId = map["trainId"],
        departureCity = map["departureCity"],
        departureDateTime = map["departureDateTime"],
        arrivalCity = map["arrivalCity"],
        arrivalDateTime = map["arrivalDateTime"],
        connections = map["connections"];

  Map<String, dynamic> toMap() => {
        "ticketId": ticketId,
        "customerId": customerId,
        "trainId": trainId,
        "departureCity": departureCity,
        "departureDateTime": departureDateTime,
        "arrivalCity": arrivalCity,
        "arrivalDateTime": arrivalDateTime,
        "connections": connections,
      };

  @override
  String toString() {
    return 'Ticket{ticketId: $ticketId, customerId: $customerId, trainId: $trainId, departureCity: $departureCity, departureDateTime: $departureDateTime, arrivalCity: $arrivalCity, arrivalDateTime: $arrivalDateTime, connections: $connections}';
  }
}
