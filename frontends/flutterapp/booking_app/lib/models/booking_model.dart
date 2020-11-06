import 'package:flutter/material.dart';

class Booking {
  final String bookingId;
  final String trainId;
  final String userMail;
  final bool paid;
  final String placeNumber;

  Booking(
      {@required this.bookingId,
        @required this.trainId,
        @required this.userMail,
        this.paid,
        this.placeNumber})
      : assert(bookingId != null),
        assert(trainId != null);

  @override
  String toString() {
    return 'Booking{bookingId: $bookingId, trainId: $trainId, userMail: $userMail, paid: $paid, placeNumber: $placeNumber}';
  }
}
