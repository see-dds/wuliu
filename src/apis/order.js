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
