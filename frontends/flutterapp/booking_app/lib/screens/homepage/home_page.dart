import 'package:flutter/material.dart';

import 'components/train_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Column(
        children: [
          Text("Départ"),
          TextField(
            obscureText: false,
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              labelText: "Ville de départ",
            ),
          ),
          Text("Arrivée"),
          TextField(
            obscureText: false,
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              labelText: "Ville d'arrivée",
            ),
          ),
          Expanded(
            child: TrainPage(),
          )
        ],
      ),
    );
  }
}
