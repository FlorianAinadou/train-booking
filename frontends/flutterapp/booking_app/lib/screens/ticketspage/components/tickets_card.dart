import 'package:booking_app/models/ticket_model.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';

class TicketsCard extends StatelessWidget {
  //final Ticket ticket;
  final Train train;

  const TicketsCard({Key key, this.train}) : super(key: key);

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
              text: train.date.split('T')[0].toString() + '   ' + train.date.split('T')[1].toString().split('.')[0].toString(),
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
                            text: train.routes[0] + '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                          TextSpan(
                            text: '~'/*ticket.departureDateTime
                                .split(' ')[1]
                                .toString()*/,
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
                            text: train.routes[train.routes.length-1] + '\n',
                            style: TextStyle(
                              color: Colors.black45,
                              fontWeight: FontWeight.w400,
                              fontSize: 15,
                            ),
                          ),
                          TextSpan(
                            text: '~'
                                /*ticket.arrivalDateTime.split(' ')[1].toString()*/,
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
        ],
      ),
    );
  }
}
