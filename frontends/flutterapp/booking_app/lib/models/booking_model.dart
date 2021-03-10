import 'package:flutter/material.dart';

class Booking {
  final String bookingId;
  final String trainId;
  final String userMail;
  final bool paid;
  final String placeNumber;
  final bool isGroup;
  final int price;
  final String groupName;

  Booking(
      {@required this.bookingId,
        @required this.trainId,
        @required this.userMail,
        this.paid,
        this.placeNumber,
        this.isGroup,
        this.price,
        this.groupName})
      : assert(bookingId != null),
        assert(trainId != null);

  @override
  String toString() {
    return 'Booking{bookingId: $bookingId, trainId: $trainId, userMail: $userMail, paid: $paid, placeNumber: $placeNumber, isGroup: $isGroup, price: $price, groupName: $groupName}';
  }
}
