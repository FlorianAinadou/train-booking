import 'package:booking_app/common/values/variables.dart';
import 'package:booking_app/screens/homepage/components/trains_page.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

enum DialogAction { yes, abort, submit }
var _types = ['Solo', 'Groupe'];
var _typeSelected = 'test';

//--------------------------------------------------> VARIABLES

class Dialogs {
  static Future<DialogAction> validationDialog(
    BuildContext context,
    String title,
    String body,
  ) async {
    final action = await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          title: Text(title, textAlign: TextAlign.center),
          content: Text(body),
          actions: <Widget>[
            FlatButton(
              onPressed: () => Navigator.of(context).pop(DialogAction.submit),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
    return (action != null) ? action : DialogAction.abort;
  }

  static Future<DialogAction> yesAbortDialog(
    BuildContext context,
    String title,
    String body,
  ) async {
    final action = await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          title: Text(title, textAlign: TextAlign.center),
          content: Text(body),
          actions: <Widget>[
            FlatButton(
              onPressed: () => Navigator.of(context).pop(DialogAction.abort),
              child: const Text('Non'),
            ),
            RaisedButton(
              onPressed: () => Navigator.of(context).pop(DialogAction.yes),
              child: const Text(
                'Oui',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
          ],
        );
      },
    );
    return (action != null) ? action : DialogAction.abort;
  }

  static Future<DialogAction> reservationDialog(BuildContext context, State<TrainPage> parentState) async {
    TextEditingController textEditingController = TextEditingController();
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();



    final action = await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          title: Text(
            "Réservation de votre voyage",
            textAlign: TextAlign.center,
          ),
          content: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                DropdownButton<String>(
                  isExpanded: true,
                  hint: Text("Type de réservation"),
                  items: <String>['Solo', 'Groupe'].map((String dropDownStringItem) {
                    return DropdownMenuItem<String> (
                      value: dropDownStringItem,
                      child: Text(dropDownStringItem),
                    );
                  }).toList(),
                  value: 'test',
                  onChanged: (String valueSelectedByUser) {
                    parentState.setState(() {
                      _typeSelected = valueSelectedByUser;
                    });
                  }
                ),
                TextFormField(
                  controller: textEditingController,
                  decoration: InputDecoration(labelText: "JJ-MM-YYYY"),
                  validator: (String value) {
                    if (value.isEmpty) {
                      return "Champ vide";
                    }
                    return null;
                  },
                  onSaved: (String value) {
                    selectedDate = value;
                  },
                ),
              ],
            ),
          ),
          actions: <Widget>[
            FlatButton(
              onPressed: () => Navigator.of(context).pop(DialogAction.abort),
              child: const Text('Annuler'),
            ),
            RaisedButton(
              child: Text(
                'Valider',
                style: TextStyle(color: Colors.black, fontSize: 16),
              ),
              onPressed: () {
                if (!_formKey.currentState.validate()) {
                  return;
                }
                _formKey.currentState.save();
                //_formKey.currentState.reset();
                /*SnackBar snackbar = new SnackBar(
                    content: Text("Date entrée"));
                Scaffold.of(context).showSnackBar(snackbar);*/
                //selectedDate = textEditingController.text;
                //departureDate = DateFormat.MMMEd("fr").format(DateFormat("dd-MM-yyyy").parse(textEditingController.text));
                //print(departureDate);
                Navigator.of(context).pop(DialogAction.submit);
              },
            )
          ],
        );
      },
    );
    return (action != null) ? action : DialogAction.abort;
  }

  static Future<DialogAction> dateDialog(BuildContext context) async {
    TextEditingController textEditingController = TextEditingController();
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

    final action = await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          title: Text("Entrez la date de départ", textAlign: TextAlign.center),
          content: Form(
            key: _formKey,
            child: TextFormField(
              controller: textEditingController,
              decoration: InputDecoration(labelText: "JJ-MM-YYYY"),
              validator: (String value) {
                if (value.isEmpty) {
                  return "Champ vide";
                }
                return null;
              },
              onSaved: (String value) {
                selectedDate = value;
              },
            ),
          ),
          actions: <Widget>[
            FlatButton(
              onPressed: () => Navigator.of(context).pop(DialogAction.abort),
              child: const Text('Annuler'),
            ),
            RaisedButton(
              child: Text(
                'Valider',
                style: TextStyle(color: Colors.black, fontSize: 16),
              ),
              onPressed: () {
                if (!_formKey.currentState.validate()) {
                  return;
                }
                _formKey.currentState.save();
                //_formKey.currentState.reset();
                /*SnackBar snackbar = new SnackBar(
                    content: Text("Date entrée"));
                Scaffold.of(context).showSnackBar(snackbar);*/
                //selectedDate = textEditingController.text;
                //departureDate = DateFormat.MMMEd("fr").format(DateFormat("dd-MM-yyyy").parse(textEditingController.text));
                //print(departureDate);
                Navigator.of(context).pop(DialogAction.submit);
              },
            )
          ],
        );
      },
    );
    return (action != null) ? action : DialogAction.abort;
  }
}
