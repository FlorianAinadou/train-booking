import 'package:flutter/material.dart';

class TrainModel {
  final int id;
  final String name;

  TrainModel({
    @required this.id,
    @required this.name,
  })  : assert(id != null),
        assert(name != null);

  TrainModel.fromMap(Map<String, dynamic> map)
      : id = map["id"],
        name = map["name"];

  Map<String, dynamic> toMap() => {
        "id": id,
        "name": name,
      };
}
