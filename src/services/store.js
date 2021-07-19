import request from '../utils/request';

export function getProducts(typeCode) {
  const hash = +new Date();
  return request(`/store/${typeCode}.json?t=${hash}`);
}
