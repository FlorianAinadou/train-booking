import 'dart:convert';

import 'package:booking_app/common/components/loader.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/models/booking_model.dart';
import 'package:booking_app/screens/ticketspage/components/tickets_card.dart';
import 'package:booking_app/services/routes.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:http/http.dart' as http;

class OrderedTicketsPage extends StatelessWidget {
  final int period;

  OrderedTicketsPage({
    Key key,
    this.period,
  }) : super(key: key);

  Future<List<Widget>> _getPaidAvailableTickets() async {
    dynamic items = <Widget>[];
    // get from backend
    String url = host + paidBookingRoute + defaultUser;
    print(url);
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
    print(bookingPaids);
    // build flutter components
    for (Booking d in bookingPaids) {
      url = host + trainSelectorRoute + d.trainId.toString();
      data = await http.get(url);
      jsonData = json.decode(utf8.decode(data.bodyBytes));
      List<Train> trains = [];
      for (var t in jsonData) {
        //print(t["trainId"]);
        Train train = Train(
            trainId: t["trainId"],
            date: t["date"],
            routes: t["routes"],
            full: t["full"],
            price: t["price"],
            remainingSeats: t["remainingSeats"]);
        //print(DateTime.parse(train.date).difference(DateTime.now()).inDays);
        switch(period){
          case 1:
            if (DateTime.parse(train.date).difference(DateTime.now()).inDays < 0)
              trains.add(train);
            break;
          case 2:
            if (DateTime.parse(train.date).difference(DateTime.now()).inDays == 0)
              trains.add(train);
            break;
          case 3:
            if (DateTime.parse(train.date).difference(DateTime.now()).inDays > 0)
              trains.add(train);
            break;
          default:
            print('unexpected number error');
            break;
        }
      }
      // build flutter components
      for (dynamic d in trains) {
        items.add(Column(
          children: <Widget>[
            TicketsCard(train: d),
          ],
        ));
      }
    }
    return items;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _getPaidAvailableTickets(),
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
        switch(period){
          case 1:
            return Text(
              "\n\n\n\n\n\n\n\nAucun voyage effectué récemment.",
              style: TextStyle(
                fontFamily: 'Pacifico',
                color: Colors.white,
                fontSize: 24,
              ),
              textAlign: TextAlign.center,
            );
            break;
          case 2:
            return Text(
              "\n\n\n\n\n\n\n\nAucun voyage prévu aujourd'hui.",
              style: TextStyle(
                fontFamily: 'Pacifico',
                color: Colors.white,
                fontSize: 24,
              ),
              textAlign: TextAlign.center,
            );
            break;
          case 3:
            return Text(
              "\n\n\n\n\n\n\n\nAucun voyage prévu prochainement.",
              style: TextStyle(
                fontFamily: 'Pacifico',
                color: Colors.white,
                fontSize: 24,
              ),
              textAlign: TextAlign.center,
            );
            break;
          default:
            return Text('unexpected number error');
            break;
        }
      },
    );
  }
}
