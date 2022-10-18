// eslint-disable-next-line import/no-anonymous-default-export
export default function ({Axios,getState,getDateAndTime,arabicToFarse}) {
  debugger
  let token = getState().token;
  Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  let baseUrl = 'https://retailerapp.bbeta.ir/api/v1';
  return {
    async users(){

      let result = await Axios.get(`${baseUrl}/Users`);
      if(!result.data.isSuccess) return;

      var users=result.data.data;
      return users.map(u=>{
        return {
          id:u.id,firstname:u.firstName,lastname:u.lastName,code:u.cardCode,mobile:u.phoneNumber,phone:u.landline,cardNumber:u.cardNumber,
          state:u.userProvince,city:u.userCity,activityStatus:'0',latitude: u.latitude,longitude: u.longitude,shopName:u.storeName
        };
      })
      // return [
      //     {
      //         id:'0',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
      //         state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
      //       },
      //       {
      //         id:'1',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
      //         state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
      //       },
      //       {
      //         id:'2',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
      //         state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
      //       },
      //       {
      //         id:'3',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
      //         state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
      //       },
      //       {
      //         id:'4',firstname:'محمد',lastname:'فیض',code:'123456',mobile:'09123534314',phone:'02188050006',cardNumber:'6219861033538751',
      //         state:'تهران',city:'تهران',activityStatus:'0',"latitude": 35.699739,"longitude": 51.338097,shopName:'فروشگاه 1'
      //       },
      // ]
    },
    async darkhaste_bardasht(){

      let result = await Axios.get(`${baseUrl}/WithdrawRequest`);
      if(!result.data.isSuccess) return;

      var users=result.data.data;
      return users.map(u=>{

        const userRequestCount=users.filter(x=>x.userId===u.userId).length;
        return {requestCount:userRequestCount,requestDate:u.createdDate,amount:u.amount,darkhasteBardashtStatus:'0',userId:u.userId};
      });

      // return [
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'0'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'1'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'1'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'2'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'2'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'3'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'4'},
      //     {requestCount:1,requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0',userId:'4'},
      // ]
    },
    async darkhaste_bardasht_history({parameter}){
      let {userId} = parameter;
      let result = await Axios.get(`${baseUrl}/WithdrawRequest/WithFilter?filters=UserId==${userId}`);
      if(!result.data.isSuccess) return;
      
      return result.data.data.map(x=>{
        return {requestDate:x.createdDate,amount:x.amount,darkhasteBardashtStatus:'0'};
      });
      // return [
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'},
      //     {requestDate:'1401/4/5 12:20',amount:1234567,darkhasteBardashtStatus:'0'}
      //   ]
    },
    async tarikhche_gardoone(){

      let result = await Axios.get(`${baseUrl}/UserAwards/WithFilter`);
      if(!result.data.isSuccess) return;
      
      const slotData=result.data.data;
      return slotData.map(x=>{
        
        const userTryCount=slotData.filter(i=>i.userId===x.userId);
        const winCount=userTryCount.filter(i=>i.win).length;
        return {winCount,tryCount:userTryCount.length,gardooneStatus:x.user.isSlotMachineActive,userId:x.userId};
      });

      // return [
      //     {winCount:1,tryCount:12,gardooneStatus:true,userId:'0'},
      //     {winCount:1,tryCount:12,gardooneStatus:false,userId:'1'},
      //     {winCount:1,tryCount:12,gardooneStatus:true,userId:'2'},
      //     {winCount:1,tryCount:12,gardooneStatus:false,userId:'3'},
      //     {winCount:1,tryCount:12,gardooneStatus:true,userId:'4'}
      // ]
    },
    async tarikhche_javayeze_barande_shode({parameter}){
      let {userId} = parameter;
      let result = await Axios.get(`${baseUrl}/UserAwards/WithFilter?filters=UserId==${userId}`);
      if(!result.data.isSuccess) return;
      
      return result.data.data.map(x=>{
        return {date:x.createdDate,award:x.award.title};
      });
      // return [
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'},
      //     {date:'1401/4/5 12:20',award:'جایزه 1'}
      //   ]
    },
    async sefareshate_bazargah(){

      let result = await Axios.get(`${baseUrl}/OS/GetWithDistance?cardCode=${"c39832"}&distance=100&status=0&time=100000`);
      if(!result.data.isSuccess) return;

      const data=result.data.data;
      return data.map(x=>{
        return {id:x.id,orderNumber:x.orderNumber,orderDate:x.orderDate,firstname:x.receiverName,lastname:x.receiverName,state:x.province,city:x.city,mobile:x.receiverNumber,orderAmount:x.finalAmount,orderStatus:'0',latitude: x.latitude,longitude: x.longitude};
      });

      // return [
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'0',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'1',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'2',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'3',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'4',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'1',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'2',"latitude": 35.699739,"longitude": 51.338097},
      //     {orderNumber:'4324',orderDate:'1400/3/3',firstname:'محمد',lastname:'فیض',state:'تهران',city:'تهران',mobile:'09123534314',orderAmount:12345678,orderStatus:'3',"latitude": 35.699739,"longitude": 51.338097}
      //   ]
    },
    async tarikhche_taghire_vaziate_bazargah({parameter}){
      let {order} = parameter;

      let result = await Axios.get(`${baseUrl}/OSOrderLog/WithFilter?filters=OsOrderId==${order.id}`);
      if(!result.data.isSuccess) return;
      return result.data.data.map(x=>{
        return {date:x.createdDate,description:x.newStatus};
      });

      // return [
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'},
      //     {date:'1401/4/5 12:20',description:'سفارش توسط کاربر ثبت شد'}
      //   ]
    },
    async taghyire_faaliate_gardoone({parameter}){
      let {state,userId} = parameter;
      return true
    }
  }
}