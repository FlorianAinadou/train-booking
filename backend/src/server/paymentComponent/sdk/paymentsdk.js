const {strRandom} = require("../../bookingComponent/utils/idGenerator");

const rp = require('request-promise');
const customerRegistration = require('../../customerRegistration/sdk/customerFinder');
const bookingReservation = require('../../bookingComponent/sdk/reservation');
const PaymentGroupModel = require('../models/paymentGroup');
let bookingIdSize = 6;
const request = require('request');
const GroupModel = require('../../groupComponent/models/group') 

// var host = process.env.npm_package_config_bankHost;

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
url = "http://localhost:7000/paid/";

async function pay(idCard,price) {
    return await rp(url+""+idCard+"/"+price);
}


async function payReservationByIdAndEmail(bookingId, userMail,price) {
    const customer = await customerRegistration.getUserByEmail(userMail);
    const rep  = await pay(customer.cardId,price);
    if(rep){
        await bookingReservation.setBookingPayStatus(bookingId,userMail);
        return true;
    }
    return false;
}

async function payGroup(trainId, customerMail, price, placesNumber, groupId){
    const customer = await customerRegistration.getUserByEmail(customerMail);
    const rep  = await pay(customer.cardId,price);
    let bookingId;

    if (rep && customer){
        bookingId = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: bookingIdSize,
            startsWithLowerCase: false
        });

        await PaymentGroupModel.create({
            "bookingId": bookingId,
            "customerMail": customerMail,
            "placesNumber": placesNumber,
            "trainId": trainId,
            "price": price,
            "groupId": groupId
        }, function (err, paymentGroup) {
            if (err) console.log(err);
            return false;
        });

        request.post({
            url: 'http://127.0.0.1:8000/trainList/removeSeats',
            form: {"trainId": trainId,"seats" : placesNumber.length}
        }, function (error, response, body) {
            console.log(body);
        });
        return true;
    }
    return false;
}

async function getAllPaymentsGroupByEmail(userMail){

    const paymentsGroupsResponse = []
    const paymentsGroups = await PaymentGroupModel.find()
    // paymentsGroups.forEach(async paymentGroup => {
        
    //     const group = await getGroupsByGroupId(paymentGroup.groupId,userMail);
    //     // console.log(group)
    //     // console.log(groupsNames);
    //     if( group != null){
    //         const paymentGroupResponse = {
    //             'placesNumber' : paymentGroup.placesNumber,
    //             '_id': paymentGroup._id,
    //             'bookingId': paymentGroup.bookingId,
    //             'customerMail': paymentGroup.customerMail,
    //             'trainId': paymentGroup.trainId,
    //             'price': paymentGroup.price,
    //             'groupId': paymentGroup.groupId,
    //             'groupName' : group.groupName
    
    //         }
    //         // console.log(paymentGroupResponse)
    //         paymentsGroupsResponse.push(paymentGroupResponse)
    //     }
    // //     paymentsGroupsResponse.push(paymentGroupResponse)
    // });
    // return paymentsGroupsResponse;
    // paymentsGroups.forEach(function(paymentGroup){
    //     GroupModel.findOne({_id:paymentGroup.groupId, users: userMail}),function(err, foundGroup){
    //         if(err){

    //         }else{
    //             const paymentGroupResponse = {
    //                             'placesNumber' : paymentGroup.placesNumber,
    //                             '_id': paymentGroup._id,
    //                             'bookingId': paymentGroup.bookingId,
    //                             'customerMail': paymentGroup.customerMail,
    //                             'trainId': paymentGroup.trainId,
    //                             'price': paymentGroup.price,
    //                             'groupId': paymentGroup.groupId,
    //                             'groupName' : foundGroup.groupName
                    
    //                         }
    //             paymentsGroupsResponse.push(paymentGroupResponse)
    //         }
    //     }
    // });

    const response = lookForGroups(paymentsGroups,userMail).then(foundGroups => {
        // process results here
        // console.log(foundGroups)
        let paymentGroupsIndex = 0;
        for (let foundGroup of foundGroups){
            console.log(foundGroup)
            if( foundGroup != null){
                // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
                const paymentGroupResponse = {
                    'placesNumber' : paymentsGroups[paymentGroupsIndex].placesNumber,
                    '_id': paymentsGroups[paymentGroupsIndex]._id,
                    'bookingId': paymentsGroups[paymentGroupsIndex].bookingId,
                    'customerMail': paymentsGroups[paymentGroupsIndex].customerMail,
                    'trainId': paymentsGroups[paymentGroupsIndex].trainId,
                    'price': paymentsGroups[paymentGroupsIndex].price,
                    'groupId': paymentsGroups[paymentGroupsIndex].groupId,
                    'groupName' : foundGroup.groupName
        
                }
                console.log(paymentGroupResponse)
                paymentsGroupsResponse.push(paymentGroupResponse);
            }
            paymentGroupsIndex ++ ;
        }
        return paymentsGroupsResponse;
    }).catch(err => {
        // process error here
    });
    // console.log(paymentsGroupsResponse)
    return response;
}

async function lookForGroups(paymentsGroups,userMail) {
    let foundGroups = [];
    for (let paymentGroup of paymentsGroups) {
        try {
            let found = await GroupModel.findOne({_id: paymentGroup.groupId, users: userMail}).exec();
            foundGroups.push(found);
        } catch(e) {
            console.log(`did not find rider ${paymentGroup} in database`);
        }
    }
    // console.log(foundGroups);
    return foundGroups;
}



async function getGroupsByGroupId(groupId, customerMail){
    return await GroupModel.findOne({_id:groupId, users: customerMail});
}

module.exports = {
    pay,
    payReservationByIdAndEmail,
    payGroup,
    getAllPaymentsGroupByEmail
};


// console.log(`the result ${paymentGroup.groupId}`)
        // GroupModel.findOne({_id:paymentGroup.groupId}, (err,group) => {
        //     if (err) {return 'Error not found group'}
        //     // console.log(`the result ${group.groupName}`);
        //     paymentGroup.groupName = group.groupName;
        //     console.log(`the result ${paymentGroup.groupName}`)
        //     // console.log(`the result ${paymentGroup}`)
        // });
        // console.log(`the result ${typeof paymentGroup.groupName}`)