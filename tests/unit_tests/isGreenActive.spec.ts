import { test, expect } from "@playwright/test";
import { TrafficLight } from "../../pages/trafficLight";

test("Testing isGreenActive() function", async () => {
  const trafficLight = new TrafficLight();
  await trafficLight.setLight(0);
  expect(trafficLight.isGreenActive()).toBeTruthy();
});
