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
// 查询所有数据
export const getAllOrder = async (data) => {
  const res = await $api.post('/order/findOrderAll', data)
  return res
}
// 修改数据
export const updataOrder = async (data) => {
  return await $api.post('/order/updataOrder', data)
}
// 删除数据
export const deletOrder = async (data) => {
  return await $api.post('/order/deletOrder', data)
}
// 查询单个数据 根据订单状态查询
export const findOrderByState = async (data) => {
  return await $api.post('/order/findOrderByState', data)
}
// 根据客户ID查询
export const findUserID = async (data) => {
  const res = await $api.post('/order/findUserID', data)
  return res
}
// 根据司机ID查询
export const findDriverID = async (data) => {
  const res = await $api.post('/order/findDriverID', data)
  return res
}
