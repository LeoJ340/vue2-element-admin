import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

/**
 * @description 生成权限路由列表
 * @param routes
 * @param { [{ id: String }] } permissions
 * @returns {*[]}
 */
function generateRoutes(routes, permissions) {
  const accessRouters = []
  routes.forEach(_route => {
    const temp = { ..._route }
    if (hasPermission(permissions, temp)) {
      if (temp.children) {
        temp.children = generateRoutes(temp.children, permissions)
      }
      accessRouters.push(temp)
    }
  })
  return accessRouters
}

// 白名单列表
const whiteRoutes = []
/**
 * 判断路由是否有权限
 * @param { [{ id: String }] } permissions
 * @param route
 */
function hasPermission(permissions, { name, path, meta: { menuId } = {}}) {
  if (menuId) {
    return permissions.some(({ id = '' }) => {
      return id && id.trim() === menuId.trim()
    })
  } else {
    // 白名单
    if (whiteRoutes.includes(name) || whiteRoutes.includes(path)) return true
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

