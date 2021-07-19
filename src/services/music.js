import qs from 'querystring';
import jsonp from '../utils/jsonp';

export function searchMusic(name) {
  return new Promise((resolve, reject) => {
    jsonp('http://www.gequdaquan.net/gqss/api.php?'+ qs.stringify({
      types: 'search',
      count: 20,
      source: 'tencent',
      pages: 1,
      name: name
    }),function (err, res) {
      if(err) return reject(err);
      return resolve(res);
    })
  });
}

export function getMusic() {
  return jsonp('https://c.y.qq.com/soso/fcgi-bin/client_search_cp?'+qs.stringify({
    format: 'jsonp',
    p: 1,
    n: 20,
    cr: 1,
    aggr: 1,
    w: 'exo',
    platform: 'yqq.json',
    new_json: 1,
    ct: 24,
  }),{}, function (res) {

  });
}
