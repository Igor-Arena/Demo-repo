import { test, expect } from "@playwright/test";
import { TrafficLight } from "../../pages/trafficLight";

test("Testing isRedActive() function", async () => {
  const trafficLight = new TrafficLight();
  await trafficLight.setLight(2);
  expect(trafficLight.isRedActive()).toBeTruthy();
});
