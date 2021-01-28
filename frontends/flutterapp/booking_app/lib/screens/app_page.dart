import 'package:booking_app/common/components/dialogs.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/common/values/box_shadows.dart';
import 'package:booking_app/screens/booking/booking_page.dart';
import 'package:booking_app/screens/ticketspage/tickets_page.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/screens/homepage/home_page.dart';
import 'package:fluttericon/font_awesome5_icons.dart';

class AppPage extends StatefulWidget {
  AppPage({Key key}) : super(key: key);

  @override
  _AppPageState createState() => _AppPageState();
}

class _AppPageState extends State<AppPage> {
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging();

  int _currentIndex = 0;
  List<Widget> _children = [
    HomePage(),
    TicketsPage(todayTickets),
    BookingPage(),
  ];

  @override
  void initState(){
    super.initState();
    notificationsEvents();
    notificationsCallbacks();
  }

  void notificationsEvents(){
    _firebaseMessaging.subscribeToTopic("topic");
  }

  void notificationsCallbacks(){
    _firebaseMessaging.configure(
      // Dans l'application
      onMessage: (message) async {
        print("je passais");
        Dialogs.validationDialog(context, "Notification", "onMessage");
      },
      onResume: (message) async {
        print("je passe");
        Dialogs.validationDialog(context, "Notification", "onResume");
      },
      onLaunch: (message) async {
        print("je passerai");
        Dialogs.validationDialog(context, "Notification", "onLaunch");
      }
    );
  }

  void _onTabTapped(int index) {
    setState(() {
      if (index == 1) todayTickets = true;
      //print(todayTickets);
      _currentIndex = index;
      _children = [
        HomePage(),
        TicketsPage(todayTickets),
        BookingPage(),
      ];
    });
  }

  @override
  Widget build(BuildContext context) {
    //if (_currentIndex == 1) todayTickets = true;
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _children,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(FontAwesome5.home),
            label: 'Accueil',
          ),
          BottomNavigationBarItem(
            icon: Icon(FontAwesome5.ticket_alt),
            label: 'Mes billets',
          ),
          BottomNavigationBarItem(
            icon: Icon(FontAwesome5.bookmark),
            label: 'Réservations',
          ),
        ],
        currentIndex: _currentIndex,
        selectedItemColor: Colors.blue,
        onTap: _onTabTapped,
      ),
    );
  }
}
