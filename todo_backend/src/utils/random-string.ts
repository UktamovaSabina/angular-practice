import { performance } from 'perf_hooks';

export function randomString(): string {
  return (
    Number(String(Math.random()).slice(2)) +
    Date.now() +
    Math.round(performance.now())
  ).toString(36);
}
