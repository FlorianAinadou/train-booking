import 'package:booking_app/common/values/box_shadows.dart';
import 'package:booking_app/common/values/screen_dimensions.dart';
import 'package:flutter/material.dart';

class TicketsStatusBoxes extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40.0,
      width: ScreenDimensions(context).width,
      margin: EdgeInsets.only(top: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          GestureDetector(
            onTap: () {
              passedTicketsBox = enabledBox;
              todayTicketsBox = disabledBox;
              futureTicketsBox = disabledBox;
              (context as Element).reassemble;
            },
            child: Container(
              height: 40.0,
              width: 120,
              //padding: EdgeInsets.all(10),
              //margin: EdgeInsets.only(left: 10),
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(28),
                    bottomLeft: Radius.circular(28),
                  ),
                  boxShadow: [
                    passedTicketsBox,
                  ]),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    "Passés",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w300,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
            ),
          ),
          GestureDetector(
            onTap: () {
              passedTicketsBox = disabledBox;
              todayTicketsBox = enabledBox;
              futureTicketsBox = disabledBox;
              (context as Element).reassemble;
            },
            child: Container(
              height: 40.0,
              width: 120,
              //padding: EdgeInsets.all(10),
              margin: EdgeInsets.only(left: 2),
              decoration: BoxDecoration(color: Colors.white,
                  //borderRadius: BorderRadius.all(Radius.circular(28)),
                  boxShadow: [
                    todayTicketsBox,
                  ]),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    "Aujourd'hui",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w300,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
            ),
          ),
          GestureDetector(
            onTap: () {
              passedTicketsBox = disabledBox;
              todayTicketsBox = disabledBox;
              futureTicketsBox = enabledBox;
              //(context as Element).reassemble;
            },
            child: Container(
              height: 40.0,
              width: 120,
              //padding: EdgeInsets.all(10),
              margin: EdgeInsets.only(left: 2),
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topRight: Radius.circular(28),
                    bottomRight: Radius.circular(28),
                  ),
                  boxShadow: [
                    futureTicketsBox,
                  ]),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    "À venir",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w300,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
