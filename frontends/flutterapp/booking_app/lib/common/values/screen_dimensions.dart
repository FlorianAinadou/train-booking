import 'package:flutter/material.dart';

class ScreenDimensions {
  BuildContext context;
  AppBar appBar = AppBar();

  ScreenDimensions(this.context) : assert(context != null);

  double get width => MediaQuery.of(context).size.width;

  double get height => MediaQuery.of(context).size.height;

  double get appBarHeight => appBar.preferredSize.height;

  double get appBarWidth => appBar.preferredSize.width;

  double get notificationBarHeight => MediaQuery.of(context).padding.top;
}
