export const state = () => ({
    max:0,
    defaultMax:20,
    users:[]
  })
  
  export const mutations = {
    add(state, val) {
      state.max = val
    },
    async getUsers(state,{ $axios }) {
        // const userRequest = await $axios.get('/api/users')
        // state.users = userRequest.data.data
        // console.log("getUser " + state.users)
        // return { users: userRequest.data.data}

        // for(const index in apiRequest.data) {
        //     apiRequest.data[index]._id = index
        //     delete apiRequest.data[index].pwd
        //     returnData.push(apiRequest.data[index])
        //   }
        
        //    returnData = returnData.splice(offest, max)

    }
  }