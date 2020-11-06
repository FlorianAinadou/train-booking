import 'dart:convert';

import 'package:booking_app/common/components/loader.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/models/booking_model.dart';
import 'package:booking_app/screens/booking/components/bookings_card.dart';
import 'package:booking_app/services/routes.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:http/http.dart' as http;

class BookingsPage extends StatefulWidget {

  BookingsPage({
    Key key,
  }) : super(key: key);

  @override
  _BookingsPageState createState() => _BookingsPageState();
}

class _BookingsPageState extends State<BookingsPage> {
  Future<List<Widget>> _getBookingTrains() async {
    dynamic items = <Widget>[];
    // get from backend
    String url = host + bookingRoute + defaultUser;
    print('1 --> ' + url);
    var data = await http.get(url);
    var jsonData = json.decode(utf8.decode(data.bodyBytes));
    List<Booking> bookingPaids = [];
    //print(data.body);
    for (var t in jsonData) {
      Booking bookingPaid = Booking(
          bookingId: t["bookingId"],
          trainId: t["trainId"],
          userMail: t["userMail"],
          paid: t["routes"],
          placeNumber: t["placeNumber"]);
      bookingPaids.add(bookingPaid);
    }
    //print(bookingPaids);
    // build flutter components
    for (Booking d in bookingPaids) {
      url = host + trainSelectorRoute + d.trainId.toString();
      print('2 --> ' + url);
      data = await http.get(url);
      jsonData = json.decode(utf8.decode(data.bodyBytes));
      //print(jsonData);
      //List<Train> trains = [];
      for (var t in jsonData) {
        Train train = Train(
            id: t["_id"],
            trainId: t["trainId"],
            date: t["date"],
            routes: t["routes"],
            full: t["full"],
            price: t["price"],
            remainingSeats: t["remainingSeats"]);
        //print(DateTime.parse(train.date).difference(DateTime.now()).inDays);
        //print(train);
        items.add(Column(
          children: <Widget>[
            BookingsCard(train: train, bookingId: d.bookingId, parent: context,),
          ],
        ));
        //trains.add(train);
        //trains.sort();
      }
      // build flutter components
      /*for (dynamic d in trains) {
        items.add(Column(
          children: <Widget>[
            BookingsCard(train: d),
          ],
        ));
      }*/
    }
    return items;
  }

  @override
  Widget build(BuildContext context) {
      return FutureBuilder(
        future: _getBookingTrains(),
        builder: (BuildContext context, AsyncSnapshot snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            List<Widget> availableTrains = snapshot.data;
            if (availableTrains != null) {
              int taille = availableTrains.length;
              if (taille != 0)
                return ListView(
                  children: availableTrains,
                );
            }
          } else {
            return Loader();
          }
          return Text(
            "\n\n\n\n\n\n\n\nAucune réservation en cours.",
            style: TextStyle(
              fontFamily: 'Pacifico',
              color: Colors.black,
              fontSize: 24,
            ),
            textAlign: TextAlign.center,
          );
        },
      );
  }
}
