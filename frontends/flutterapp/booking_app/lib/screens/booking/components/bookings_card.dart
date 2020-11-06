import 'dart:convert';

import 'package:booking_app/common/components/circular_button.dart';
import 'package:booking_app/common/components/dialogs.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/models/ticket_model.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:booking_app/services/routes.dart';
import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;

class BookingsCard extends StatefulWidget {
  final Train train;
  final String bookingId;
  final BuildContext parent;

  const BookingsCard({Key key, this.train, this.bookingId, this.parent}) : super(key: key);

  @override
  _BookingsCardState createState() => _BookingsCardState(this.parent, this.train, this.bookingId);
}

class _BookingsCardState extends State<BookingsCard> {
  final BuildContext parent;
  final Train train;
  final String bookingId;

  _BookingsCardState(this.parent, this.train, this.bookingId);


  Future<String> _payReservation() async {
    String url = host + paymentRoute;
    print(url);
    var data = {
      'bookingId': this.bookingId,
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

  Future<String> _cancelReservation() async {
    String url = host + removeBookingRoute + this.bookingId;
    print(url);
    var res = await http.delete(url);
    print(res.statusCode);
    if (res.statusCode == 200) return res.body;
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
              text: this.train.date.split('T')[0].toString() + ' ~ TGV ' + this.train.trainId.toString() + ' ~ ' + this.train.price.toString() + '€',
              style: TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontWeight: FontWeight.w600,
                //height: 1.5,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 30.0, right: 30.0, bottom: 8.0),
            child: Divider(
              color: Colors.grey,
              height: 3,
              thickness: 1,
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
                            text: this.train.routes[0] + '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                          TextSpan(
                            text: this.train.date.split('T')[1].toString().split('.')[0].toString(),
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
                            text: this.train.routes[this.train.routes.length-1] + '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                          TextSpan(
                            text: this.train.date.split('T')[1].toString().split('.')[0].toString(),
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
                color: Colors.red,
                //height: 50,
                width: 120,
                //margin: EdgeInsets.only(left: 10, top: 10, right: 10),
                padding: EdgeInsets.all(10),
                icon: Icon(
                  FontAwesomeIcons.trashAlt,
                  color: Colors.white,
                ),
                onClick: () async {
                  final action = await Dialogs.yesAbortDialog(context, "Annulation de votre réservation", "Voulez-vous effectuer l'annulation de votre réservation?");
                  if (action == DialogAction.yes) {
                    await _cancelReservation();
                    SnackBar snackbar = new SnackBar(
                        content: Text("Réservation annulée avec succès."));
                    Scaffold.of(context).showSnackBar(snackbar);
                  }
                },
                text: 'Annuler',
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
                    await _payReservation();
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
