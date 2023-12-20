import { test, expect } from "@playwright/test";
import { TrafficLight } from "../../pages/trafficLight";

test("Testing isYellowActive() function", async () => {
  const trafficLight = new TrafficLight();
  await trafficLight.setLight(1);
  expect(trafficLight.isYellowActive()).toBeTruthy();
});
