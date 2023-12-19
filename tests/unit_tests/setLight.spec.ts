import { test, expect } from "@playwright/test"
import { TrafficLight } from "../../pages/trafficLight"

test("Testing setLight function", async () => {
    const trafficLight = new TrafficLight;
    await trafficLight.setLight(1);
    expect(trafficLight.light).toBe("yellow");
})