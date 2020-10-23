import 'package:booking_app/screens/ticketspage/tickets_page.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/screens/homepage/home_page.dart';
import 'package:fluttericon/font_awesome5_icons.dart';

class AppPage extends StatefulWidget {
  AppPage({Key key}) : super(key: key);

  @override
  _AppPageState createState() => _AppPageState();
}

class _AppPageState extends State<AppPage> {
  int _currentIndex = 0;
  final List<Widget> _children = [
    HomePage(),
    TicketsPage(),
  ];

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _children,
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(FontAwesome5.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(FontAwesome5.ticket_alt),
            label: 'Mes billets',
          ),
          BottomNavigationBarItem(
            icon: Icon(FontAwesome5.user),
            label: 'Profile',
          ),
        ],
        currentIndex: _currentIndex,
        selectedItemColor: Colors.blue,
        onTap: _onTabTapped,
      ),
    );
  }
}
