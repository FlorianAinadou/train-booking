import 'package:flutter/material.dart';

class CircularButton extends StatelessWidget {
  final double width;
  final double height;
  final EdgeInsetsGeometry margin;
  final EdgeInsetsGeometry padding;
  final Color color;
  final Icon icon;
  final Function onClick;
  String text = "";

  CircularButton(
      {this.color, this.width, this.height, this.icon, this.onClick, this.text, this.padding, this.margin});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onClick,
      child: Container(
        height: height,
        width: width,
        margin: margin,
        padding: padding,
        decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.all(Radius.circular(28)),
            boxShadow: [
              BoxShadow(
                color: Colors.black12,
                spreadRadius: 5.5,
                blurRadius: 5.5,
              )
            ]),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            icon,
            SizedBox(
              width: 10,
            ),
            if (text != null)
              Text(
                text,
                style: TextStyle(
                  fontSize: 18,
                  //fontWeight: FontWeight.w300,
                  color: Colors.white,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
