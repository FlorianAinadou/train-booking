import 'package:booking_app/common/components/header.dart';
import 'package:booking_app/common/values/screen_dimensions.dart';
import 'package:booking_app/screens/ticketspage/components/tickets_status_boxes.dart';
import 'package:flutter/material.dart';

class BookingPage extends StatefulWidget {
  @override
  _BookingPageState createState() => _BookingPageState();
}

class _BookingPageState extends State<BookingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          "Réservations",
          style: TextStyle(
            fontFamily: 'Pacifico',
            color: Colors.white,
            fontSize: 30,
          ),
        ),
      ),
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Stack(
              alignment: AlignmentDirectional.topCenter,
              children: <Widget>[
                //Header(),
                TicketsStatusBoxes(),
              ],
            ),
            Expanded(
              //height: ScreenDimensions(context).height - (2 * ScreenDimensions(context).appBarHeight) - Header().headerHeight - ScreenDimensions(context).notificationBarHeight,
              //width: ScreenDimensions(context).width,
              child: ListView(
                children: [],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
