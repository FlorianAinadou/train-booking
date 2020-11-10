import 'package:flutter/material.dart';

const mainBgColor = Color(0xFFf2f2f2);
const darkColor = Color(0xFF2A0B35);
const midColor = Color(0xFF522349);
const lightColor = Color(0xFFA52C4D);
const darkRedColor = Color(0xFFFA695C);
const lightRedColor = Color(0xFFFD685A);
const lightMidColor = Color(0xFFBD1A7D);
const blueColor = Colors.blue;
//const blueColor = Color(0xFFB3E5FC);

const purpleGradient = LinearGradient(
  colors: <Color>[darkColor, midColor, lightColor],
  stops: [0.0, 0.5, 1.0],
  begin: Alignment.centerLeft,
  end: Alignment.centerRight,
);

const purpleGradient2 = LinearGradient(
  colors: <Color>[lightColor, midColor, darkColor],
  stops: [0.0, 0.5, 1.0],
  begin: Alignment.centerLeft,
  end: Alignment.centerRight,
);

const blueGradient = LinearGradient(
  //begin: Alignment.center,
  //end: const Alignment(1.0, 1.0),
  stops: [0.0, 0.3],
  begin: Alignment.bottomCenter,
  end: Alignment.topCenter,
  colors: [mainBgColor, blueColor],
);

const redGradient = LinearGradient(
  colors: <Color>[darkRedColor, lightRedColor],
  stops: [0.0, 1.0],
  begin: Alignment.centerLeft,
  end: Alignment.centerRight,
);