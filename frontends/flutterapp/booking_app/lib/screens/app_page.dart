import 'package:booking_app/common/components/dialogs.dart';
import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/common/values/box_shadows.dart';
import 'package:booking_app/screens/booking/booking_page.dart';
import 'package:booking_app/screens/ticketspage/tickets_page.dart';
import 'package:booking_app/services/routes.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:booking_app/screens/homepage/home_page.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:fluttericon/font_awesome5_icons.dart';
import 'package:http/http.dart' as http;
import 'package:overlay_support/overlay_support.dart';

class AppPage extends StatefulWidget {
  AppPage({Key key}) : super(key: key);

  @override
  _AppPageState createState() => _AppPageState();
}

class _AppPageState extends State<AppPage> {
  FirebaseMessaging _firebaseMessaging = FirebaseMessaging();
  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
  FlutterLocalNotificationsPlugin();

  int _currentIndex = 0;
  List<Widget> _children = [
    HomePage(),
    TicketsPage(todayTickets),
    BookingPage(),
  ];

  @override
  void initState() {
    super.initState();
    initializeLocalNotifications();
    //notificationsEvents();
    updateFirebaseToken();
    notificationsCallbacks();
  }

  Future<void> initializeLocalNotifications() async {
// initialise the plugin. app_icon needs to be a added as a drawable resource to the Android head project
    const AndroidInitializationSettings initializationSettingsAndroid =
    AndroidInitializationSettings('ic_launcher_round');
    var iOSinitilize = new IOSInitializationSettings();
    final InitializationSettings initializationSettings = InitializationSettings(
        android: initializationSettingsAndroid,
        iOS: iOSinitilize);
    await flutterLocalNotificationsPlugin.initialize(initializationSettings,
        onSelectNotification: (String payload) async {
          if(payload != null) debugPrint('notification payload: ' + payload);
          if(_currentIndex != 1){
            _currentIndex = 1;
            setState(() {
              _children = [
                HomePage(),
                TicketsPage(todayTickets),
                BookingPage(),
              ];
            });
          }
        });
  }

  Future _showNotification(String title, String body, [String payload]) async {
    const AndroidNotificationDetails androidPlatformChannelSpecifics =
    AndroidNotificationDetails(
        'channelId', 'local notification', 'my notification',
        importance: Importance.max,
        priority: Priority.high,
        showWhen: false);
    const NotificationDetails platformChannelSpecifics =
    NotificationDetails(android: androidPlatformChannelSpecifics);
    await flutterLocalNotificationsPlugin.show(
        0, title, body, platformChannelSpecifics,
        payload: payload);
  }

  void notificationsEvents(){
    _firebaseMessaging.subscribeToTopic("topic");
  }

  void notificationsCallbacks(){
    _firebaseMessaging.configure(
      // Dans l'application
      onMessage: (Map<String, dynamic> message) async {
        await _showNotification(message["notification"]["title"], message["notification"]["body"]);
        if(_currentIndex == 1){
          setState(() {
            _children = [
              HomePage(),
              TicketsPage(todayTickets),
              BookingPage(),
            ];
          });
        }
        //debugPrint("onMessage: $message");
        /*
        print("in app");
        toast('in app');
        showSimpleNotification(
            Text("in app notification"),
            background: Colors.green);
        Dialogs.validationDialog(context, "Notification", "onMessage");
         */
      },
        // En arrière plan
      onResume: (message) async {
        await _showNotification(message["notification"]["title"], message["notification"]["body"]);
        _currentIndex = 1;
      },
        // Eteint
      onLaunch: (message) async {
        await _showNotification(message["notification"]["title"], message["notification"]["body"]);
        _currentIndex = 1;
      }
    );
  }

  updateFirebaseToken() {
    String _token = "";
    _firebaseMessaging.getToken().then((String token) async {
      assert(token != null);
      setState(() {
        _token = "$token";
      });
      debugPrint("Token Login Page: $token");
      var res = await http.post(host + tokenRoute, body: {"mail": defaultUser, "token": _token});
      if (res.statusCode == 200) print('Response body: ${res.body}');
    });
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
