/**
 * usage::
 * action = {
 *    middleLoginRequired: true,
 * }
*/
export const login = ({ getState, dispatch }) => {
    return (next) => (action) => {
        if (action.middleLoginRequired) {
            // 异步请求
            isLogined().then(islogin => {
                if (islogin) {
                    next(action);
                } else {
                    dispatch(actLoginPage());
                }
            })
        } else {
            next(action);
        }
    }
}