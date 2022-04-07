import $api from './index'

// 后台订单接口
// 查询所有数据
export const getAllOrder = async (data) => {
  const res = await $api.post('/order/findOrderAll', data)
  return res
}
// 添加数据
export const addOrder = async (data) => {
  const res = await $api.post('/order/addOrder', data)
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

// export const updateSong = async (data) => {
//   return await $api.post('/song/update', data)
// }
