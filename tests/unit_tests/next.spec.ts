import { test, expect } from "@playwright/test";
import { TrafficLight } from "../../pages/trafficLight";

const lights = [
  {
    number: 0,
    light: "green",
    nextLight: "yellow",
  },
  {
    number: 1,
    light: "yellow",
    nextLight: "red",
  },
  {
    number: 2,
    light: "red",
    nextLight: "green",
  },
];

for (const { number, light, nextLight } of lights) {
  test(`Testing next() function with light ${light}`, async () => {
    const trafficLight = new TrafficLight();
    await trafficLight.setLight(`${number}`);
    await trafficLight.next();
    expect(nextLight).toBe(`${nextLight}`);
  });
}
