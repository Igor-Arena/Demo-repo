export class TrafficLight {
    private lightIndex: number;

    constructor() {
        this.lightIndex = 0;
    }

    static get colors(): string[] {
        return ['green', 'yellow', 'red'];
    }

    get light(): string {
        return TrafficLight.colors[this.lightIndex];
    }

    get colorsAmount(): number {
        return TrafficLight.colors.length;
    }

    setLight(index: number): void {
        this.lightIndex = index;
    }

    next(): void {
        this.lightIndex++;
        if (this.lightIndex === TrafficLight.colors.length) {
            this.lightIndex = 0;
        }
    }

    isGreenActive(): boolean {
        return this.light === 'green';
    }

    isYellowActive(): boolean {
        return this.light === 'yellow';
    }

    isRedActive(): boolean {
        return this.light === 'red';
    }
}