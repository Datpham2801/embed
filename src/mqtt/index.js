// controller.js
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");
const Temperature = require("../model/temperature");
var temperatureState = {};

client.on("connect", () => {
  client.subscribe("smarthouse/connected");
  client.subscribe("smarthouse/temparature");
});

client.on("message", (topic, message) => {
  switch (topic) {
    case "smarthouse/connected":
      return handleSmartHouseConnected(message);
    case "smarthouse/temparature":
      return handleSmartHouseTemperature(message);
  }
  console.log("No handler for topic %s", topic);
});

function handleSmartHouseConnected(message) {
  console.log("smarthouse connected status %s", message);
}

async function handleSmartHouseTemperature(message) {
  try {
    let data = await Temperature.find();
    // console.log(data);
    // let d = data[data.length - 1];
    const buff = message;
    // console.log(JSON.parse(message.toString()));
    // console.log(Number(JSON.parse(message.toString())));
    let temperatureState = JSON.parse(message.toString());
    // if (
    //   d.temperature != temperatureState.temperature ||
    //   d.humidity != temperatureState.humidity
    // ) {}
    temperatureState.date = Date.now();
    const res = await Temperature.create(temperatureState);
    console.log({ status: true });
  } catch (error) {
    console.log({ status: false });
  }
}

function turnLed(state) {}
