import 'package:booking_app/common/gradient.dart';
import 'package:booking_app/mocks/tickets_mocks.dart';
import 'package:booking_app/models/ticket_model.dart';
import 'package:booking_app/screens/ticketspage/components/tickets_card.dart';
import 'package:booking_app/screens/ticketspage/components/tickets_status_boxes.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TicketsPage extends StatefulWidget {
  @override
  _TicketsPageState createState() => _TicketsPageState();
}

class _TicketsPageState extends State<TicketsPage> {

  Container header() {
    return Container(
      height: 60.0,
      decoration: BoxDecoration(
        gradient: blueGradient,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(40),
          bottomRight: Radius.circular(40),
        ),
      ),
    );
  }

  List<Ticket> fetchMockedData() {
    return TICKETS_MOCKS.map((model) => Ticket.fromMap(model)).toList();
  }

  List<Widget> _getTickets(data) {
    dynamic items = <Widget>[];
    for (dynamic d in data) {
      print(d);
      items.add(Column(
        children: <Widget>[
          TicketsCard(ticket: d),
        ],
      ));
    }
    return items;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery
        .of(context)
        .size;
    double screenHeight = size.height;
    double screenWidth = size.width;

    AppBar appBar = AppBar(
      title: Text('Mes billets'),
    );

    return Scaffold(
      appBar: appBar,
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Stack(
              alignment: AlignmentDirectional.topCenter,
              children: <Widget>[
                header(),
                TicketsStatusBoxes(),
              ],
            ),
            Container(
              height: screenHeight - (2 * appBar.preferredSize.height) - 60 - MediaQuery.of(context).padding.top,
              width: screenWidth,
              child: ListView(
                children: _getTickets(fetchMockedData()),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
