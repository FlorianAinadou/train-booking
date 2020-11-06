import 'dart:ui';

import 'package:booking_app/common/values/box_shadows.dart';
import 'package:booking_app/mocks/tickets_mocks.dart';
import 'package:booking_app/models/ticket_model.dart';
import 'package:booking_app/screens/ticketspage/components/ordered_tickets_page.dart';
import 'package:booking_app/screens/ticketspage/components/tickets_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class TicketsPage extends StatefulWidget {
  bool todayTickets;
  TicketsPage(this.todayTickets);

  @override
  _TicketsPageState createState() => _TicketsPageState(this.todayTickets);
}

class _TicketsPageState extends State<TicketsPage>
    with SingleTickerProviderStateMixin {
  TabController _tabController;
  bool todayTickets;
  _TicketsPageState(this.todayTickets);

  //bool get todayTickets => null;

  List<Ticket> fetchMockedData() {
    return TICKETS_MOCKS.map((model) => Ticket.fromMap(model)).toList();
  }

  /*List<Widget> _getTickets(data) {
    dynamic items = <Widget>[];
    for (dynamic d in data) {
      items.add(TicketsCard(ticket: d));
    }
    return items;
  }*/

  @override
  void initState() {
    super.initState();
    _tabController = new TabController(vsync: this, length: 3);
    _tabController.addListener(_handleTabSelection);
    if (todayTickets) {
      _tabController.index = 1;
      todayTickets = false;
    }
  }

  void _handleTabSelection() {
    setState(() {
      /*widget.enabledBox = BoxShadow(
        color: Colors.black,
        spreadRadius: 2,
        blurRadius: 2,
      );*/
    });
  }

  @override
  Widget build(BuildContext context) {
    /*if (todayTickets) {
      _tabController.index = 1;
      todayTickets = false;
    }
    if (_tabController.index != 1) todayTickets = false;*/
    return DefaultTabController(
      length: 3,
      child: Scaffold(
          appBar: AppBar(
            centerTitle: true,
            title: Text(
              "Mes billets",
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
                  child: Container(
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
                Tab(
                  child: Container(
                    height: _tabController.index == 1 ? 35.0 : 30.0,
                    //width: 120,
                    //padding: EdgeInsets.all(10),
                    margin: EdgeInsets.only(left: 2),
                    decoration: BoxDecoration(color: Colors.white,
                        //borderRadius: BorderRadius.all(Radius.circular(28)),
                        boxShadow: [
                          _tabController.index == 1 ? enabledBox : disabledBox,
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
                Tab(
                  child: Container(
                    height: _tabController.index == 2 ? 35.0 : 30.0,
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
                          _tabController.index == 2 ? enabledBox : disabledBox,
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
          ),
          body: Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage("images/home_page2_1.jpg"),
                fit: BoxFit.cover,
              ),
            ),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
              child: TabBarView(
                controller: _tabController,
                children: <Widget>[
                  OrderedTicketsPage(period: 1,),
                  OrderedTicketsPage(period: 2,),
                  OrderedTicketsPage(period: 3,),
                ],
              ),
            ),
          )),
    );
  }
}
