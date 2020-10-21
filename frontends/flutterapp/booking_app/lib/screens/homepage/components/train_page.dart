import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';
import 'package:booking_app/screens/homepage/components/train_list.dart';
import 'package:booking_app/mocks/trains_mocks.dart';
import 'train_card.dart';

class TrainPage extends StatelessWidget {
  TrainPage({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: _getTrains(fetchMockedData()),
    );
  }

  List<TrainModel> fetchMockedData() {
    return TRAINS_MOCKS.map((model) => TrainModel.fromMap(model)).toList();
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
