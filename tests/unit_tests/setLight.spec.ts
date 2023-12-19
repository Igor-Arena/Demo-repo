import { test, expect } from "@playwright/test";
import { TrafficLight } from "../../pages/trafficLight";

const lights = [
  {
    number: 0,
    light: "green",
  },
  {
    number: 1,
    light: "yellow",
  },
  {
    number: 2,
    light: "red",
  },
];

for (const { number, light } of lights) {
  test(`Testing setLight function with ${light} colour`, async () => {
    const trafficLight = new TrafficLight();
    await trafficLight.setLight(`${number}`);
    expect(trafficLight.light).toBe(`${light}`);
  });
}
