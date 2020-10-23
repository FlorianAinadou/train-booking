import 'package:booking_app/models/ticket_model.dart';
import 'package:flutter/material.dart';
import 'package:fluttericon/font_awesome5_icons.dart';

class TicketsCard extends StatelessWidget {
  final Ticket ticket;

  const TicketsCard({Key key, this.ticket}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 10),
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Color(0xFFB3E5FC),
        borderRadius: BorderRadius.circular(50),
      ),
      child: Column(
        //crossAxisAlignment: CrossAxisAlignment.center,
        //mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Wrap(
            //alignment: WrapAlignment.center,
            //mainAxisAlignment: MainAxisAlignment.start,
            spacing: 4.0,
            // gap between adjacent chips
            runSpacing: 4.0,
            // gap between lines
            direction: Axis.horizontal,
            // main axis (rows or columns)
            children: <Widget>[
              CircleAvatar(
                backgroundColor: Color(0xFFD9D9D9),
                backgroundImage: AssetImage('images/train.png'),
                radius: 36.0,
              ),
              SizedBox(
                width: 10.0,
              ),
              SizedBox(
                width: 200,
                child: Column(
                  children: [
                    RichText(
                      text: TextSpan(
                        text: 'Départ : ' + ticket.departureCity + '\n',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          height: 1.5,
                        ),
                        children: <TextSpan>[
                          if (ticket.connections.isNotEmpty)
                            TextSpan(
                              text: 'Correspondance(s) : ' +
                                  ticket.connections.length.toString() +
                                  '\n',
                              style: TextStyle(
                                color: Colors.black45,
                                fontWeight: FontWeight.w400,
                                fontSize: 15,
                              ),
                            ),
                          TextSpan(
                            text: 'Arrivée : ' + ticket.arrivalCity + '\n',
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
          /*Divider(
            color: Colors.white,
            height: 1,
            thickness: 1,
          ),*/
        ],
      ),
    );
  }
}
