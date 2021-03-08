import 'package:flutter/material.dart';

class Train {
  final String id;
  final int trainId;
  //final String trainName;
  final String date;
  final List<dynamic> routes;
  final bool full;
  final int price;
  final bool isGroup;
  final int remainingSeats;
  final String groupName;

  Train({
    @required this.id,
    @required this.trainId,
    @required this.date,
    @required this.routes,
    @required this.full,
    @required this.price,
    @required this.isGroup,
    @required this.remainingSeats,
    @required this.groupName
  })  : assert(trainId != null);

  Train.fromMap(Map<String, dynamic> map)
      : id = map["id"],
        trainId = map["trainId"],
        date = map["date"],
        routes = map["routes"],
        full = map["full"],
        price = map["price"],
        isGroup = map["isGroup"],
        remainingSeats = map["remainingSeats"],
        groupName = map["groupName"];

  Map<String, dynamic> toMap() => {
        "id": id,
        "trainId": trainId,
        "date": date,
        "routes": routes,
        "full": full,
        "price": price,
        "isGroup": isGroup,
        "remainingSeats": remainingSeats,
        "groupName": groupName
      };

  @override
  String toString() {
    return 'Train{id: $id, trainId: $trainId, date: $date, routes: $routes, full: $full, price: $price, isGroup: $isGroup, remainingSeats: $remainingSeats, groupName: $groupName}';
  }
}
