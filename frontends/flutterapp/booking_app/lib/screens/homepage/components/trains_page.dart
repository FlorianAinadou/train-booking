import 'dart:convert';

import 'package:booking_app/common/components/loader.dart';
import 'package:booking_app/services/routes.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:liquid_pull_to_refresh/liquid_pull_to_refresh.dart';
import 'train_card.dart';
import 'package:http/http.dart' as http;

class TrainPage extends StatefulWidget {
  final String departureCity;
  final String arrivalCity;

  TrainPage({
    Key key,
    this.departureCity,
    this.arrivalCity,
  }) : super(key: key);

  @override
  _TrainPageState createState() => _TrainPageState();
}

class _TrainPageState extends State<TrainPage> {
  Future<List<Widget>> _getAvailableTrains() async {
    dynamic items = <Widget>[];
    // get from backend
    String url = host + trainSelectorRoute + widget.departureCity.trim() + '/' + widget.arrivalCity.trim();
    print(url);
    var data = await http.get(url);
    var jsonData = json.decode(utf8.decode(data.bodyBytes));
    List<Train> trains = [];
    //print(data.body);
    for (var t in jsonData) {
      //print(t["trainId"]);
      Train train = Train(
          id: t["_id"],
          trainId: t["trainId"],
          date: t["date"],
          routes: t["routes"],
          full: t["full"],
          price: t["price"],
          remainingSeats: t["remainingSeats"]);
      trains.add(train);
    }
    // build flutter components
    for (dynamic d in trains) {
      items.add(Column(
        children: <Widget>[
          TrainCard(train: d, parentState: this,),
        ],
      ));
    }
    return items;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.departureCity == null && widget.arrivalCity == null)
      return LiquidPullToRefresh(
        //key: _refreshIndicatorKey,	// key if you want to add
        animSpeedFactor: 10.0,
        onRefresh: () async {
          setState(() {});
        },
        child: ListView(
          children: [
            Text(
              "\n\n\nVoyagez en toute sécurité avec Booking train.\nTrouvez votre itinéraire dans la barre de recherche.",
              style: TextStyle(
                fontFamily: 'Pacifico',
                color: Colors.black54,
                fontSize: 24,
              ),
              textAlign: TextAlign.center,
            ),
          ]
        ),
      );
    else
      return FutureBuilder(
        future: _getAvailableTrains(),
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
          return LiquidPullToRefresh(
            //key: _refreshIndicatorKey,	// key if you want to add
            animSpeedFactor: 10.0,
            onRefresh: () async {
              setState(() {});
            },
            child: ListView(
              children: [
                Text(
                  "\n\n\nAucun train disponible pour cet itinéraire, veuillez réessayer plus tard...",
                  style: TextStyle(
                    fontFamily: 'Pacifico',
                    color: Colors.black,
                    fontSize: 24,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          );
        },
      );
  }
}
