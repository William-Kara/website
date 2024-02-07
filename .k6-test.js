import { sleep } from 'k6';
import http from 'k6/http';

const environments = open('./environment_url.txt').split('\n');

export let options = {
  duration: '1m',
  vus: 50,
};

export default function () {
  for (const environment of environments) {
    if (typeof environment === 'string' && environment.startsWith('http')) {
      http.get(environment);
    }
  }
}
