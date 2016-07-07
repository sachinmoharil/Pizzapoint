var mysql = require('C:\\webfrontendInstallations\\nodejs\\node_modules\\mysql');
var util = require('util');

module.exports = {
    connection: null,
    // Create a database connection
    connectDB: function () {
        var connectionConfig = {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'swethapizzadb'
        };
        connection = mysql.createConnection(connectionConfig);
        util.log('connection::connecting...');
        connection.connect(function (err) {
            util.log('connection::connected');
        });
    },
    
    // Get Order details
    getOrderDetails: function (res, orderID, callback) {
        connection.query('SELECT * FROM Orderdetails WHERE OrderID = ?', orderID, function (err, rows, fields) {
            if (err)
                throw err;

            var orderDetails = [];
            rows.forEach(function (row) { 
                var orderDetail = {OrderID: row.OrderID, sizeOfPizza: row.sizeOfPizza, kindOfPizza: row.kindOfPizza, cheese: row.cheese, quantity: row.quantity, totalPrice: row.totalPrice, FirstName: row.FirstName, LastName: row.LastName, DeliveryAddress: row.DeliveryAddress, TelephoneNumber: row.TelephoneNumber, SalesType: row.SalesType, CreditCardType: row.CreditCardType, CreditCardNumber: row.CreditCardNumber, CreditCardExpiration: row.CreditCardExpiration}; 
               users.push(orderDetail);
            });

            util.log('getOrderDetails: ' + orderDetails);
            callback(res, orderDetails);
        });
    },
    // Add Order
    insertOrder: function (sizeOfPizza, kindOfPizza, cheese, quantity, totalPrice) {
        var orderDetail = {sizeOfPizza: sizeOfPizza, kindOfPizza: kindOfPizza, cheese: cheese, quantity: quantity, totalPrice: totalPrice};
        connection.query('INSERT INTO Orderdetails SET ?', orderDetail, function (err, results) {
            if (err)
                throw err;

            util.log('insertOrder: ' + results);
        });
    },
    //update Order with card details
    updateOrder: function (orderID, sizeOfPizza, kindOfPizza, cheese, quantity, totalPrice, FirstName, LastName, DeliveryAddress, TelephoneNumber, SalesType, CreditCardType, CreditCardNumber, CreditCardExpiration) {
        var orderDetail = {sizeOfPizza: sizeOfPizza, kindOfPizza: kindOfPizza, cheese: cheese, quantity: quantity, totalPrice: totalPrice, FirstName: FirstName, LastName: LastName, DeliveryAddress: DeliveryAddress, TelephoneNumber: TelephoneNumber, SalesType: SalesType, CreditCardType: CreditCardType, CreditCardNumber: CreditCardNumber, CreditCardExpiration: CreditCardExpiration};
        connection.query('UPDATE Orderdetails SET ? WHERE OrderID = ?', [orderDetail, orderID], function (err, results) {
            if (err)
                throw err;

            util.log('insertOrder: ' + results);
        });
    },
    // Get current OrderID
    getCurrentOrderID: function (res, callback) {
        connection.query("SELECT MAX(OrderID) FROM Orderdetails", function (err, rows, fields) {
            if (err)
                throw err;

            var orderID=-1;
            rows.forEach(function (row) {
                var order=row.OrderID;
                orderID.push(order);
                //return true;
            });

            util.log('getCurrentOrderID: ' + orderID);
            callback(res, orderID);
        });
    }
};