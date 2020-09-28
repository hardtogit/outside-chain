import { process } from 'postcss-url';
import { extend } from 'umi-request';
const prefix={
    development:'https://www.development.com',
    production:'https://www.production.com'
}
const request = extend({
    prefix: prefix[process.env.NODE_ENV],
    timeout: 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export default request  