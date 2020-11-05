import 'package:flutter/material.dart';
import 'package:booking_app/models/train_model.dart';

class TrainCard extends StatelessWidget {
  const TrainCard({Key key, @required this.train}) : super(key: key);

  final TrainModel train;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Text(train.name),
    );
  }
}
