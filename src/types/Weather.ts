export default interface Weather {
  main: { temp: number };
  weather: [{ main: string; description: string; icon: string }];
  name?: string;
}
