import $api from './index'

// 新建订单
export const addOrder = async data => {
  const res = await $api.post('/order/addOrder', data)
  return res
}
// 查找一条订单
export const findOrderOne = async data => {
  const res = await $api.post('/order/findOrderOne', data)
  return res
}
// 查找全部订单
export const findOrderAll = async data => {
  const res = await $api.post('/order/findOrderAll', data)
  return res
}
// 后台订单接口
export const getAllOrder = async (data) => {
  const res = await $api.get('/order/findOrderAll', data)
  return res
}

export const addOrder = async (data) => {
  const res = await $api.post('/order/addOrder', data)
  return res
}

// export const addSong = async (data) => {
//   return await $api.post('/song/add', data)
// }
// export const delSong = async (data) => {
//   return await $api.post('/song/del', data)
// }

// export const updateSong = async (data) => {
//   return await $api.post('/song/update', data)
// }
