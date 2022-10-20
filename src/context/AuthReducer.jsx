import React from 'react'

const AuthReducer = ({state, action}) => {
  switch (action.type) {
    case "LOGIN":
      return {
        currentUser: action.payload
      }
      break;
    case "LOGUT":
      return {
        currentUser : null
      }
      break
    default:
      break;
  }
}

export default AuthReducer