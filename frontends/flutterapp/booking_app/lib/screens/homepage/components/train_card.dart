import 'dart:convert';
import 'dart:math';

import 'package:booking_app/common/components/circular_button.dart';
import 'package:booking_app/common/components/dialogs.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/services/routes.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:http/http.dart' as http;

class TrainCard extends StatefulWidget {
  final BuildContext parent;
  final Train train;

  const TrainCard({Key key, @required this.train, this.parent}) : super(key: key);

  @override
  _TrainCardState createState() => _TrainCardState(this.parent, this.train);
}

class _TrainCardState extends State<TrainCard> {
  final BuildContext parent;
  final Train train;

  _TrainCardState(this.parent, this.train);

  Future<String> _payReservation(String bookingId) async {
    String url = host + paymentRoute;
    print(url);
    var data = {
      'bookingId': bookingId.split('"')[1],
      'userMail': defaultUser,
      'price' : this.train.price
    };
    print(data);
    var body = json.encode(data);
    var res = await http.post(
      url,
      body: body,
      headers: {"Content-Type": "application/json"},
    );
    print(res.statusCode);
    if (res.statusCode == 200) return res.body;
    return null;
  }

  Future<String> _bookOrPayATrip(bool pay) async {
    String url;
    url = host + addBookingRoute;
    /*if (pay)
      url = host + addPaidBookingRoute;
    else
      url = host + addBookingRoute;*/
    print(url);
    var data = {
      'userMail': defaultUser,
      'placeNumber': (new Random()).nextInt(1000000000),
      'trainId' : train.id
    };
    print(data);
    var body = json.encode(data);
    var res = await http.post(
      url,
      body: body,
      headers: {"Content-Type": "application/json"},
    );
    print(res.statusCode);
    if (res.statusCode == 200) return res.body.toString();
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(10),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Color(0xFFB3E5FC),
        borderRadius: BorderRadius.circular(60),
      ),
      child: Column(
        //mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          RichText(
            text: TextSpan(
              text: 'ID : ' + widget.train.trainId.toString() + ' - TGV ?',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontWeight: FontWeight.w600,
                //height: 1.5,
              ),
            ),
          ),
          Row(
            //alignment: WrapAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //spacing: 2.0,
            // gap between adjacent chips
            //runSpacing: 2.0,
            // gap between lines
            //direction: Axis.horizontal,
            // main axis (rows or columns)
            children: <Widget>[
              CircleAvatar(
                backgroundColor: Color(0xFFD9D9D9),
                backgroundImage: AssetImage('images/train.png'),
                radius: 36.0,
              ),
              /*SizedBox(
              width: 10.0,
            ),*/
              SizedBox(
                //width: 70,
                child: Column(
                  children: [
                    RichText(
                      text: TextSpan(
                        text: 'Départ\n',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          height: 1.5,
                        ),
                        children: <TextSpan>[
                          /*if (ticket.connections.isNotEmpty)
                          TextSpan(
                            text: 'Correspondance(s) : ' +
                                ticket.connections.length.toString() +
                                '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),*/
                          TextSpan(
                            text: widget.train.routes[0].toString() + '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                          TextSpan(
                            text: 'Heure ?',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    /*Icon(FontAwesome5.people_arrows),*/
                  ],
                ),
              ),
              SizedBox(
                //width: 70,
                child: Column(
                  children: [
                    RichText(
                      text: TextSpan(
                        text: 'Arrivée\n',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          height: 1.5,
                        ),
                        children: <TextSpan>[
                          /*if (ticket.connections.isNotEmpty)
                          TextSpan(
                            text: 'Correspondance(s) : ' +
                                ticket.connections.length.toString() +
                                '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),*/
                          TextSpan(
                            text: widget.train.routes[widget.train.routes.length-1].toString() + '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                          TextSpan(
                            text: 'Heure ?',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    /*Icon(FontAwesome5.people_arrows),*/
                  ],
                ),
              ),
              SizedBox(
                //width: 90,
                child: Column(
                  children: [
                    RichText(
                      text: TextSpan(
                        text: 'Correspondances\n',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          height: 1.5,
                        ),
                        children: <TextSpan>[
                          /*if (ticket.connections.isNotEmpty)
                          TextSpan(
                            text: 'Correspondance(s) : ' +
                                ticket.connections.length.toString() +
                                '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),*/
                          TextSpan(
                            text: '?\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                        ],
                      ),
                    ),
                    /*Icon(FontAwesome5.people_arrows),*/
                  ],
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Divider(
              color: Colors.grey,
              height: 3,
              thickness: 1,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              CircularButton(
              color: Colors.blue,
              //height: 50,
              width: 120,
              //margin: EdgeInsets.only(left: 10, top: 10, right: 10),
              padding: EdgeInsets.all(10),
              icon: Icon(
                FontAwesomeIcons.bookmark,
                color: Colors.white,
              ),
              onClick: () async {
                final action = await Dialogs.yesAbortDialog(context, "Réservation de votre voyage", "Voulez-vous effectuer la réservation de ce voyage?");
                if (action == DialogAction.yes) {
                  _bookOrPayATrip(false);
                  (parent as Element).reassemble();
                  SnackBar snackbar = new SnackBar(
                      content: Text("Réservation effectuée avec succès."));
                  Scaffold.of(context).showSnackBar(snackbar);
                }
              },
              text: 'Réserver',
            ),
            CircularButton(
                color: Colors.green,
                //height: 50,
                width: 120,
                //margin: EdgeInsets.only(left: 10, top: 10, right: 10),
                padding: EdgeInsets.all(10),
                icon: Icon(
                  FontAwesomeIcons.moneyCheckAlt,
                  color: Colors.white,
                ),
                onClick: () async {
                  final action = await Dialogs.yesAbortDialog(context, "Paiement de votre voyage", "Voulez-vous effectuer le paiement de votre voyage?");
                  if (action == DialogAction.yes) {
                    final String res = await _bookOrPayATrip(true);
                    //print(res);
                    await _payReservation(res);
                    (parent as Element).reassemble();
                    SnackBar snackbar = new SnackBar(
                        content: Text("Paiement effectué avec succès."));
                    Scaffold.of(context).showSnackBar(snackbar);
                  }
                },
                text: 'Payer',
              ),
            ],
          ),
        ],
      ),
    );
  }
}
