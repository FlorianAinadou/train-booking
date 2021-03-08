import 'package:flutter/material.dart';
import 'package:booking_app/screens/app_page.dart';
import 'package:overlay_support/overlay_support.dart';

void main() => runApp(MyApp());

/// This is the main application widget.
class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AppPage(),
    );
  }
}
