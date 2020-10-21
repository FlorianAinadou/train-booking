import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';

import 'train_card.dart';

class TrainList extends StatefulWidget {
  TrainList({Key key, @required List<TrainModel> data})
      : _data = data,
        super(key: key);

  final List<TrainModel> _data;

  @override
  _TrainListState createState() => _TrainListState();
}

class _TrainListState extends State<TrainList> {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: _getTrains(this.widget._data),
    );
  }

  List<Widget> _getTrains(data) {
    dynamic items = <Widget>[];
    for (dynamic d in data) {
      items.add(Column(
        children: <Widget>[
          TrainCard(train: d),
        ],
      ));
    }
    return items;
  }
}
