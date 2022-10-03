import Axios from "axios";
import dateCalculator from "./utils/date-calculator";
import $ from "jquery";
export default function services(getState,token,userCardCode) {
  Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  let fn = function () {
    return {
      async users(){
        return [
            {
                id:'0',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
                state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
              },
              {
                id:'1',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
                state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
              },
              {
                id:'2',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
                state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
              },
              {
                id:'3',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
                state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
              },
              {
                id:'4',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
                state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
              },
        ]
      },
      async darkhaste_bardasht(){
        return [
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'0'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'1'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'1'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'2'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'2'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'3'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'4'},
            {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'4'},
        ]
      },
      async darkhaste_bardasht_history({parameter}){
        let {userId} = parameter;
        return [
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
            {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'}
          ]
      },
      async tarikhche_gardoone(){
        return [
            {winCount:1,tryCount:12,gardooneStatus:true,userId:'0'},
            {winCount:1,tryCount:12,gardooneStatus:false,userId:'1'},
            {winCount:1,tryCount:12,gardooneStatus:true,userId:'2'},
            {winCount:1,tryCount:12,gardooneStatus:false,userId:'3'},
            {winCount:1,tryCount:12,gardooneStatus:true,userId:'4'}
        ]
      },
      async tarikhche_javayeze_barande_shode({parameter}){
        let {userId} = parameter;
        return [
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'},
            {date:'1401/4/5 12:20',award:'جایزه 1'}
          ]
      },
      async sefareshate_bazargah(){
        return [
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'0',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'1',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'2',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'3',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'4',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'1',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'2',"latitude": 35.699739,"longitude": 51.338097},
            {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'3',"latitude": 35.699739,"longitude": 51.338097}
          ]
      },
      async tarikhche_taghire_vaziate_bazargah(){
        return [
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
            {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'}
          ]
      }
    }
  }
  return Service({
    services: fn(),
    baseUrl: 'https://retailerapp.bbeta.ir/api/v1',
    // baseUrl:'https://localhost:44339/api/v1',
    getState,
    cacheAll: true
  })
}



function Service({ services, baseUrl, getState, cacheAll }) {
  let d = dateCalculator();
  function fixDate(obj, field) {
    let date = obj[field];
    try {
      if (date.indexOf("T") !== -1) {
        let time = date.split("T")[1];
        obj._time = time.split(".")[0];
      } else {
        let time = date.split(" ")[1];
        obj._time = time;
      }
    } catch {
      obj._time = undefined;
    }
    try {
      obj[field] = d.gregorianToJalali(date).join("/");
    } catch {
      obj[field] = "";
    }
    return obj;
  }
  function fix(list, { convertDateFields = [], convertArabicFields = [] }) {
    return list.map((o) => {
      for (let i = 0; i < convertDateFields.length; i++) {
        fixDate(o, convertDateFields[i]);
      }
      for (let i = 0; i < convertArabicFields.length; i++) {
        try {
          o[convertArabicFields[i]] = o[convertArabicFields[i]]
            .replace(/ك/g, "ک")
            .replace(/ي/g, "ی");
        } catch {
          o[convertArabicFields[i]] = "";
        }
      }
      return o;
    });
  }
  function getFromCache(key, minutes) {
    if (minutes === true) { minutes = Infinity }
    let storage = localStorage.getItem(key);
    if (storage === undefined || storage === null) { return false }
    let { time, data } = JSON.parse(storage);
    if ((new Date().getTime() / 60000) - (time / 60000) > minutes) { return false }
    return data;
  }
  function setToCache(key, data) {
    let time = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ time, data }))
  }
  return async ({ type, parameter, loading = true, cache, cacheName }) => {
    let p = { fix, fixDate, parameter, dateCalculator: d, getState, baseUrl, services }
    if (loading) {$(".loading").css("display", "flex"); }
    if (cache) {
      let a = getFromCache(cacheName ? 'storage-' + cacheName : 'storage-' + type, cache);
      if (a !== false) {
        $(".loading").css("display", "none");
        return a
      }
      if (!services[type]) {debugger;}
      let result = await services[type](p);
      $(".loading").css("display", "none");
      setToCache(cacheName ? 'storage-' + cacheName : 'storage-' + type, result);
      return result;
    }
    if (!services[type]) {  debugger}

    let result = await services[type](p);
    $(".loading").css("display", "none");
    return result;
  }
}