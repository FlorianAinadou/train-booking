import 'dart:ui';

import 'package:booking_app/common/components/circular_button.dart';
import 'package:booking_app/common/components/header.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'components/train_page.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          "Trouver un itinéraire",
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
            image: AssetImage("images/home_page1.jpg"),
            fit: BoxFit.cover,
          ),
        ),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
          child: Column(
            children: [
              Stack(
                alignment: AlignmentDirectional.topCenter,
                children: <Widget>[
                  Header(),
                  Positioned(
                      child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Container(
                        height: 60.0,
                        margin: EdgeInsets.only(left: 10, top: 10, right: 10),
                        padding: EdgeInsets.all(10),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.all(Radius.circular(28)),
                            boxShadow: []),
                        child: TextField(
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(Radius.circular(28)),
                            ),
                            labelText: "Ville de départ",
                            labelStyle: TextStyle(
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ),
                      Container(
                        height: 60.0,
                        margin: EdgeInsets.only(left: 10, top: 10, right: 10),
                        padding: EdgeInsets.all(10),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.all(Radius.circular(28)),
                            boxShadow: []),
                        child: TextField(
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.all(Radius.circular(28)),
                            ),
                            labelText: "Ville d'arrivée",
                            labelStyle: TextStyle(
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ),
                      Center(
                        child:
                            /*RaisedButton(
                          color: Colors.blue,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),

                          child: Text(
                            'Enregistrer',
                            style: TextStyle(color: Colors.black, fontSize: 18),
                          ),
                          onPressed: () async {},
                        ),*/
                            CircularButton(
                          color: Colors.blue,
                          height: 50,
                          width: 160,
                          margin: EdgeInsets.only(left: 10, top: 10, right: 10),
                          padding: EdgeInsets.all(10),
                          icon: Icon(
                            FontAwesomeIcons.search,
                            color: Colors.white,
                          ),
                          onClick: () {},
                          text: 'Rechercher',
                        ),
                      ),
                    ],
                  )),
                ],
              ),
              Expanded(
                child: TrainPage(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
