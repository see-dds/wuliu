import $api from './index'

// 添加歌曲
export const getAllSong = async (data) => {
  const res = await $api.post('/song/getAll', data)
  return res
}

export const getOneSong = async (data) => {
  return await $api.post('/song/findOne', data)
}

export const addSong = async (data) => {
  return await $api.post('/song/add', data)
}
export const delSong = async (data) => {
  return await $api.post('/song/del', data)
}

export const updateSong = async (data) => {
  return await $api.post('/song/update', data)
}
