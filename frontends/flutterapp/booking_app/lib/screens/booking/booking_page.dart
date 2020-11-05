import 'dart:ui';

import 'package:booking_app/common/components/header.dart';
import 'package:booking_app/common/values/screen_dimensions.dart';
import 'package:booking_app/screens/booking/components/bookings_page.dart';
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
