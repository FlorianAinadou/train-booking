import 'package:booking_app/common/values/gradient.dart';
import 'package:flutter/material.dart';

class Header extends StatelessWidget {
  get headerHeight => 60.0*3;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: headerHeight,
      decoration: BoxDecoration(
        gradient: blueGradient,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(40),
          bottomRight: Radius.circular(40),
        ),
      ),
    );
  }
}
