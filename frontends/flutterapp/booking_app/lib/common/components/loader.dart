import 'package:flutter/material.dart';
import 'dart:math';

enum DotType {
  square, circle, diamond, icon
}

final Color dotOneColor = Colors.white;
final Color dotTwoColor = Colors.white;
final Color dotThreeColor = Colors.white;
final Duration duration = const Duration(milliseconds: 1000);
final DotType dotType = DotType.circle;
final Icon dotIcon = const Icon(Icons.blur_on);

class Loader extends StatefulWidget {

  @override
  _LoaderState createState() => _LoaderState();

  Loader();
}

class _LoaderState extends State<Loader>
    with SingleTickerProviderStateMixin {
  Animation<double> animation_1;
  Animation<double> animation_2;
  Animation<double> animation_3;
  AnimationController controller;

  @override
  void initState() {
    super.initState();

    controller = AnimationController(
        duration: duration, vsync: this);

    animation_1 = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: controller,
        curve: Interval(0.0, 0.70, curve: Curves.linear),
      ),
    );

    animation_2 = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: controller,
        curve: Interval(0.1, 0.80, curve: Curves.linear),
      ),
    );

    animation_3 = Tween(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: controller,
        curve: Interval(0.2, 0.90, curve: Curves.linear),
      ),
    );

    controller.addListener(() {
      setState(() {
        //print(animation_1.value);
      });
    });

    controller.repeat();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      key: Key("loader"),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Opacity(
                opacity: (animation_1.value <= 0.4 ? 2.5 * animation_1.value : (animation_1.value > 0.40 && animation_1.value <= 0.60) ? 1.0 : 2.5 - (2.5 * animation_1.value)),
                child: new Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: Dot(
                    radius: 10.0,
                    color: dotOneColor,
                    type: dotType,
                    icon: dotIcon,
                  ),
                ),
              ),
              Opacity(
                opacity: (animation_2.value <= 0.4 ? 2.5 * animation_2.value : (animation_2.value > 0.40 && animation_2.value <= 0.60)? 1.0 : 2.5 - (2.5 * animation_2.value)),
                child: new Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: Dot(
                    radius: 10.0,
                    color: dotTwoColor,
                    type: dotType,
                    icon: dotIcon,
                  ),
                ),
              ),
              Opacity(
                opacity: (animation_3.value <= 0.4 ? 2.5 * animation_3.value : (animation_3.value > 0.40 && animation_3.value <= 0.60) ? 1.0 : 2.5 - (2.5 * animation_3.value)),
                child: new Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: Dot(
                    radius: 10.0,
                    color: dotThreeColor,
                    type: dotType,
                    icon: dotIcon,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(
            width: 10,
          ),
          Text(
            "Chargement",
            style: TextStyle(
              fontFamily: 'Pacifico',
              color: Colors.white,
              fontSize: 24,
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {

    controller.dispose();
    super.dispose();
  }
}

class Dot extends StatelessWidget {
  final double radius;
  final Color color;
  final DotType type;
  final Icon icon;

  Dot({this.radius, this.color, this.type, this.icon});

  @override
  Widget build(BuildContext context) {
    return new Center(
      child: type == DotType.icon ?
      Icon(icon.icon, color: color, size: 1.3 * radius,)
          : new Transform.rotate(
        angle: type == DotType.diamond ? pi/4 : 0.0,
        child: Container(
          width: radius,
          height: radius,
          decoration: BoxDecoration(color: color, shape: type == DotType.circle? BoxShape.circle : BoxShape.rectangle),
        ),
      ),
    );
  }
}