import 'dart:ui';

import 'package:booking_app/common/values/box_shadows.dart';
import 'package:booking_app/common/values/screen_dimensions.dart';
import 'package:booking_app/screens/booking/components/bookings_page.dart';
import 'package:flutter/material.dart';

class BookingPage extends StatefulWidget {
  @override
  _BookingPageState createState() => _BookingPageState();
}

class _BookingPageState extends State<BookingPage> with SingleTickerProviderStateMixin {
  TabController _tabController;

  void _handleTabSelection() {
    setState(() {
    });
  }

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(vsync: this, length: 2);
    _tabController.addListener(_handleTabSelection);
    //_tabController.index = 1;
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
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
          bottom: TabBar(
              controller: _tabController,
              isScrollable: false,
              indicatorColor: Colors.white,
              indicatorWeight: 2.0,
              tabs: <Widget>[
                Tab(
                  child: /*Container(
                    height: ScreenDimensions(context).height -
                        (2 * ScreenDimensions(context).appBarHeight +
                            ScreenDimensions(context).notificationBarHeight),
                    width: ScreenDimensions(context).width,
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
                  ),*/
                  Container(
                    height: _tabController.index == 0 ? 35.0 : 30.0,
                    //width: 140,
                    //padding: EdgeInsets.all(10),
                    //margin: EdgeInsets.only(left: 10),
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(28),
                          bottomLeft: Radius.circular(28),
                        ),
                        boxShadow: [
                          _tabController.index == 0 ? enabledBox : disabledBox,
                        ]),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          "Mes réservations",
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
                Tab(
                  child: Container(
                    height: _tabController.index == 1 ? 35.0 : 30.0,
                    //width: 120,
                    //padding: EdgeInsets.all(10),
                    margin: EdgeInsets.only(left: 2),
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topRight: Radius.circular(28),
                          bottomRight: Radius.circular(28),
                        ),
                        boxShadow: [
                          _tabController.index == 1 ? enabledBox : disabledBox,
                        ]),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          "Réservations de groupe",
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
              ]
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
            child: TabBarView(
              controller: _tabController,
              children: <Widget>[
                BookingsPage(
                  type: 1,
                ),
                BookingsPage(
                  type: 2,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
