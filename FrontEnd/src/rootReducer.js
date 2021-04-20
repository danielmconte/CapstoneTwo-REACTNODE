const INITIAL_STATE = {
    height: 10,
    width: 10,
    wallBlocks: [],
    token: "",
    confirming: false,
    isAdmin: false,
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "CHANGE_DIMENSIONS":
            return {
                ...state,
                height: action.curHeight,
                width: action.curWidth,
            };
        case "ADD_WALL":
            return {
                ...state,
                wallBlocks: [...state.wallBlocks, action.value],
            };
        case "DELETE_WALL":
            const firstArr = state.wallBlocks.slice(0, action.id);
            const secondArr = state.wallBlocks.slice(action.id + 1);
            const arr = firstArr.concat(secondArr);
            return { ...state, wallBlocks: arr };
        case "TEMPLATE_WALL":
            return {
                ...state,
                wallBlocks: [...state.wallBlocks, ...action.value],
            };
        case "ADD_TOKEN":
            return {
                ...state,
                token: action.curToken,
            };

        case "DELETE_TOKEN":
            return {
                ...state,
                token: "",
            };

        case "CONFIRMED":
            return {
                ...state,
                confirming: true,
            };

        case "ADD_ADMIN":
            return {
                ...state,
                isAdmin: true,
            };

        case "DELETE_ADMIN":
            return {
                ...state,
                isAdmin: false,
            };

        case "RESET_ALL":
            return {
               
                ...INITIAL_STATE,
              
                token: action.payload.token,
             
                isAdmin: action.payload.isAdmin,
           
            };
        default:
            return state;
    }
}

export default rootReducer;
