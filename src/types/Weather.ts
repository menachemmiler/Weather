export default interface Weather {
  cod: number | string;
  main: { temp: number };
  weather: [{ main: string; description: string; icon: string }];
  name?: string;
  message?: string
}
