import 'dart:convert';

import 'package:booking_app/common/components/loader.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/models/booking_model.dart';
import 'package:booking_app/screens/ticketspage/components/tickets_card.dart';
import 'package:booking_app/services/routes.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:http/http.dart' as http;
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';

class OrderedTicketsPage extends StatefulWidget {
  final int period;

  OrderedTicketsPage({
    Key key,
    this.period,
  }) : super(key: key);

  @override
  _OrderedTicketsPageState createState() =>
      _OrderedTicketsPageState(this.period);
}

class _OrderedTicketsPageState extends State<OrderedTicketsPage> {
  final int period;

  _OrderedTicketsPageState(this.period);

  Future<List<Widget>> _getPaidAvailableTickets() async {
    dynamic items = <Widget>[];
    // get from backend
    String url = host + paidBookingRoute + defaultUser;
    print(url);
    var data = await http.get(url);
    var jsonData = json.decode(utf8.decode(data.bodyBytes));
    List<Booking> bookingPaids = [];
    print(data.body);
    for (var t in jsonData) {
      Booking bookingPaid = Booking(
          bookingId: t["bookingId"],
          trainId: t["trainId"],
          userMail: t["userMail"],
          paid: t["paid"],
          placeNumber: t["placeNumber"],
          isGroup: t["isGroup"],
          price: t["price"],
          groupName: t["groupName"]);
      bookingPaids.add(bookingPaid);
    }
    //print(bookingPaids);
    // build flutter components
    for (Booking d in bookingPaids) {
      url = host + trainSelectorRoute + d.trainId.toString();
      data = await http.get(url);
      jsonData = json.decode(utf8.decode(data.bodyBytes));
      print("cic");
      print(jsonData);
      List<Train> trains = [];
      for (var t in jsonData) {
        //print(t["trainId"]);
        Train train = Train(
            id: t["_id"],
            trainId: t["trainId"],
            date: t["date"],
            routes: t["routes"],
            full: t["full"],
            price: d.isGroup ? d.price : t["price"],
            isGroup: d.isGroup,
            remainingSeats: t["remainingSeats"],
            groupName: d.groupName);
        //print(DateTime.parse(train.date).difference(DateTime.now()).inDays);
        switch (this.period) {
          case 1:
            if (DateTime.parse(train.date)
                    .difference(DateTime.now())
                    .inSeconds <
                0) trains.add(train);
            break;
          case 2:
            if (DateTime.parse(train.date)
                    .difference(DateTime.now())
                    .inSeconds ==
                0) trains.add(train);
            break;
          case 3:
            if (DateTime.parse(train.date)
                    .difference(DateTime.now())
                    .inSeconds >
                0) trains.add(train);
            break;
          default:
            print('unexpected number error');
            break;
        }
        //trains.sort((a, b) => DateTime.parse(a.date).compareTo(DateTime.parse(b.date)));
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
              return LiquidPullToRefresh(
                //key: _refreshIndicatorKey,	// key if you want to add
                animSpeedFactor: 10.0,
                onRefresh: () async {
                  setState(() {});
                },
                child: ListView(
                  children: availableTrains,
                ),
              );
          }
        } else {
          return Loader();
        }
        switch (this.period) {
          case 1:
            return LiquidPullToRefresh(
              //key: _refreshIndicatorKey,	// key if you want to add
              animSpeedFactor: 10.0,
              onRefresh: () async {
                setState(() {});
              },
              child: ListView(
                children: [
                  Text(
                    "\n\n\n\n\n\n\n\nAucun voyage effectué récemment.",
                    style: TextStyle(
                      fontFamily: 'Pacifico',
                      color: Colors.white,
                      fontSize: 24,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            );
            break;
          case 2:
            return LiquidPullToRefresh(
              //key: _refreshIndicatorKey,	// key if you want to add
              animSpeedFactor: 10.0,
              onRefresh: () async {
                setState(() {});
              },
              child: ListView(
                children: [
                  Text(
                    "\n\n\n\n\n\n\n\nAucun voyage prévu aujourd'hui.",
                    style: TextStyle(
                      fontFamily: 'Pacifico',
                      color: Colors.white,
                      fontSize: 24,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            );
            break;
          case 3:
            return LiquidPullToRefresh(
              //key: _refreshIndicatorKey,	// key if you want to add
              animSpeedFactor: 10.0,
              onRefresh: () async {
                setState(() {});
              },
              child: ListView(
                children: [
                  Text(
                    "\n\n\n\n\n\n\n\nAucun voyage prévu prochainement.",
                    style: TextStyle(
                      fontFamily: 'Pacifico',
                      color: Colors.white,
                      fontSize: 24,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
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
