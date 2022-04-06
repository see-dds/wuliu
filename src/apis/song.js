import $api from './index'

// 后台接口
export const getAllOrder = async (data) => {
  const res = await $api.get('/order/findOrderAll', data)
  return res
}

export const addOrder = async (data) => {
  return await $api.post('/order/addOrder', data)
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
