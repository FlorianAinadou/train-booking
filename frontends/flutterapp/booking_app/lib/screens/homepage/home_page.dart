import 'dart:ui';

import 'package:booking_app/common/components/circular_button.dart';
import 'package:booking_app/common/components/dialogs.dart';
import 'package:booking_app/common/components/header.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'components/train_page.dart';

import 'package:intl/intl.dart'; //for date format
import 'package:intl/date_symbol_data_local.dart'; //for date locale

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String departureDate;
  String departureCity;
  String arrivalCity;
  Widget trains;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  TextEditingController textDepartureCity = TextEditingController();
  TextEditingController textArrivalCity = TextEditingController();

  @override
  void initState() {
    super.initState();
    const locale = "fr";
    initializeDateFormatting(locale);
    departureDate = DateFormat.MMMEd("fr").format(DateTime.now());
    trains = TrainPage();
  }

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
                      child: Form(
                    key: _formKey,
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
                              borderRadius:
                                  BorderRadius.all(Radius.circular(28)),
                              boxShadow: []),
                          child: TextFormField(
                            controller: textDepartureCity,
                            decoration: InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(28)),
                              ),
                              labelText: "Ville de départ",
                              labelStyle: TextStyle(
                                fontSize: 18,
                              ),
                            ),
                            /*validator: (String value) {
                              if (value.isEmpty) {
                                return "Champ vide";
                              }
                              return null;
                            },*/
                            onSaved: (String value) {
                              departureCity = value;
                            },
                          ),
                        ),
                        Container(
                          height: 60.0,
                          margin: EdgeInsets.only(left: 10, top: 10, right: 10),
                          padding: EdgeInsets.all(10),
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(28)),
                              boxShadow: []),
                          child: TextFormField(
                            controller: textArrivalCity,
                            decoration: InputDecoration(
                              border: OutlineInputBorder(
                                borderRadius:
                                    BorderRadius.all(Radius.circular(28)),
                              ),
                              labelText: "Ville d'arrivée",
                              labelStyle: TextStyle(
                                fontSize: 18,
                              ),
                            ),
                            /*validator: (String value) {
                              if (value.isEmpty) {
                                return "Champ vide";
                              }
                              return null;
                            },*/
                            onSaved: (String value) {
                              arrivalCity = value;
                            },
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            CircularButton(
                              color: Colors.blue,
                              height: 50,
                              //width: 50,
                              margin:
                                  EdgeInsets.only(left: 10, top: 10, right: 10),
                              padding: EdgeInsets.all(10),
                              icon: Icon(
                                FontAwesomeIcons.calendar,
                                color: Colors.white,
                              ),
                              onClick: () async {
                                await Dialogs.validationDialog(context);
                                setState(() {
                                  departureDate = DateFormat.MMMEd("fr").format(
                                      DateFormat("dd-MM-yyyy")
                                          .parse(selectedDate));
                                });
                              },
                              text: departureDate,
                            ),
                            CircularButton(
                              color: Colors.blue,
                              height: 50,
                              width: 160,
                              margin:
                                  EdgeInsets.only(left: 10, top: 10, right: 10),
                              padding: EdgeInsets.all(10),
                              icon: Icon(
                                FontAwesomeIcons.search,
                                color: Colors.white,
                              ),
                              onClick: () async {
                                if (!_formKey.currentState.validate()) {
                                  return;
                                }
                                _formKey.currentState.save();
                                setState(() {
                                  trains = TrainPage(departureCity: departureCity, arrivalCity: arrivalCity,);
                                });
                              },
                              text: 'Rechercher',
                            ),
                          ],
                        ),
                      ],
                    ),
                  )),
                ],
              ),
              Expanded(
                child: trains,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
