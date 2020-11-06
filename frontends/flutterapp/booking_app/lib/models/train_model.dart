import 'package:flutter/material.dart';

class Train {
  final String id;
  final int trainId;
  //final String trainName;
  final String date;
  final List<dynamic> routes;
  final bool full;
  final int price;
  final int remainingSeats;

  Train({
    @required this.id,
    @required this.trainId,
    @required this.date,
    @required this.routes,
    @required this.full,
    @required this.price,
    @required this.remainingSeats,
  })  : assert(trainId != null);

  Train.fromMap(Map<String, dynamic> map)
      : id = map["id"],
        trainId = map["trainId"],
        date = map["date"],
        routes = map["routes"],
        full = map["full"],
        price = map["price"],
        remainingSeats = map["remainingSeats"];

  Map<String, dynamic> toMap() => {
        "id": id,
        "trainId": trainId,
        "date": date,
        "routes": routes,
        "full": full,
        "price": price,
        "remainingSeats": remainingSeats,
      };

  @override
  String toString() {
    return 'Train{id: $id, trainId: $trainId, date: $date, routes: $routes, full: $full, price: $price, remainingSeats: $remainingSeats}';
  }
}
