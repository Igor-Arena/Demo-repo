import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { TrafficLight } from "../../../src/trafficLight";

const trafficLight = new TrafficLight();

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

test("Testing colors() function", async () => {
  expect(TrafficLight.colors).toStrictEqual(["green", "yellow", "red"]);
});

test("Testing light() function", async () => {
  expect(trafficLight.light).toBe("green");
});

test("Testing colorsAmount() function", async () => {
  expect(trafficLight.colorsAmount).toBe(3);
});

for (const { number, light } of lights) {
  test(`Testing setLight() function with ${light} color`, async () => {
    trafficLight.setLight(`${number}`);
    expect(trafficLight.light).toBe(`${light}`);
  });
}

for (const { number, light, nextLight } of lights) {
  test(`Testing next() function with light ${light}`, async () => {
    trafficLight.setLight(`${number}`);
    trafficLight.next();
    expect(nextLight).toBe(`${nextLight}`);
  });
}

test("Testing next() function with negative scenario", async () => {
  trafficLight.setLight(3);
  trafficLight.next();
  expect(trafficLight.light).toBeUndefined();
});

test("Testing isGreenActive() function", async () => {
  trafficLight.setLight(0);
  expect(trafficLight.isGreenActive()).toBeTruthy();
});

test("Testing isGreenActive() function with negative scenario", async () => {
  trafficLight.setLight(faker.number.int({ min: 1, max: 2 }));
  expect(trafficLight.isGreenActive()).toBeFalsy();
});

test("Testing isYellowActive() function", async () => {
  trafficLight.setLight(1);
  expect(trafficLight.isYellowActive()).toBeTruthy();
});

test("Testing isYellowActive() function with negative scenario", async () => {
  trafficLight.setLight(0 | 2);
  expect(trafficLight.isGreenActive()).toBeFalsy();
});

test("Testing isRedActive() function", async () => {
  trafficLight.setLight(2);
  expect(trafficLight.isRedActive()).toBeTruthy();
});

test("Testing isRedActive() function with negative scenario", async () => {
  trafficLight.setLight(0 | 1);
  expect(trafficLight.isGreenActive()).toBeFalsy();
});
