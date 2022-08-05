let client = new Paho.MQTT.Client(
    'd57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud',
    8884,
    'printgo' + Math.random()
)

client = new Paho.MQTT.Client("d57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud", 8884, 'letni-skola' + Math.random())

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
    onSuccess: onConnect,
    userName: "robot",
    password: "P@ssW0rd!",
    useSSL: true
});


function onConnect() {
    console.log("onConnect");
    client.subscribe("/out/queue/buttons");
}
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    try {
        console.log("onMessageArrived:" + message.destinationName);
        console.log("onMessageArrived:" + message.payloadString);
        if (message.payloadString == "A") {
            document.getElementById('sipka').src = "arrow-left.svg";

        } else if (message.payloadString == "B") {
            document.getElementById('sipka').src = "arrow-down.svg";

        } else if (message.payloadString == "C") {
            document.getElementById('sipka').src = "arrow-right.svg";
        }

        objevuje();

    } catch (error) {
        console.error(error);
    }
}

function objevuje() {
    var value = parseInt(document.getElementById('number').textContent, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').textContent = value;
}
