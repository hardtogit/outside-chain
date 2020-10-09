import { extend } from 'umi-request';
const prefix={
    development:'http://161.117.54.209/user',
    production:'https://www.production.com'
}
console.log(process)
export const request = extend({
    prefix: prefix[process.env.NODE_ENV],
    timeout: 1000,
    headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
request.use(async (ctx, next) => {
    console.log('b1');
    await next();
    console.log('b2');
  });
