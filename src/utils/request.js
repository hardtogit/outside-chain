import { extend } from 'umi-request';
import { Toast } from "vant";
import router from '@/router'
const prefix={
    development:'http://161.117.54.209/user',
    production:'http://161.117.54.209/user',

    // production:'https://www.production.com'
}
const SELF_ERROR_CODE=88888888;
const errorHandler = error => {
  console.log(error)
  const { response = {} } = error;
  const { errmsg,errcode, handleError } = response;

 if (errcode === SELF_ERROR_CODE) {
    if (!handleError) {
      //如果需要自己处理错误，在config中配置handleError为true即可
      Toast(errmsg);
    }
    throw error;
  }
  throw error;
};

export const request = extend({
    prefix: prefix[process.env.NODE_ENV],
    timeout: 1000,
    errorHandler,
    credentials: 'include',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json;charset=utf-8'
    },
  });
request.use(async (ctx, next) => {
  const { handleError, loading } = ctx.req.options;
  if (loading) {
    Toast.loading(typeof loading === 'string' ? loading : 'loading...', 0);
  }
    await next();
    const response=ctx.res;
    if(response.exception){//服务器出错
      if(response.exception==='NoOperatorException'){//未登录拦截
        router.replace('/login')
        return
      }
      throw {
        response: {
          handleError,
          errmsg:response.message,
          errcode:SELF_ERROR_CODE
        },
      }
    }
  });
