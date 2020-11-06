import 'dart:ui';

import 'package:booking_app/common/values/screen_dimensions.dart';
import 'package:booking_app/screens/booking/components/bookings_page.dart';
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
        height: ScreenDimensions(context).height - (2 * ScreenDimensions(context).appBarHeight + ScreenDimensions(context).notificationBarHeight),
        width: ScreenDimensions(context).width,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("images/home_page2_4.jpg"),
            fit: BoxFit.cover,
          ),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
          child: BookingsPage(),
        ),
      ),
    );
  }
}
