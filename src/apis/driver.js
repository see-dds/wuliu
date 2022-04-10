import $api from './index'

// 获取所有的司机
export const getAllDriver = async data => {
  const res = await $api.post('/driver/findDriver', data)
  return res
}
// 获取单个司机信息
export const getOneDriver = async data => {
  const res = await $api.post('/driver/findOneDriver', data)
  return res
}
// 修改司机信息
export const upDriverMsg = async data => {
  const res = await $api.post('/driver/changemsg', data)
  return res
}
// 拉黑司机
export const remDriver = async data => {
  const res = await $api.post('/driver/remDriver', data)
  return res
}
