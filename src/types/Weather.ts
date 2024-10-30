export default interface Weather {
  cod: string;
  main: { temp: number };
  weather: [{ main: string; description: string; icon: string }];
  name?: string;
}
