import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 200,
  duration: '50s',
};

export default function () {
  let questionID = Math.floor(Math.random() * 1000000);
  http.get(`http://localhost:3200/api/1/questionsAndAnswers/${questionID}`, {
    timeout: 180000, // 180 seconds
});
  sleep(1);
}