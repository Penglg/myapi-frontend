/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    // antDesignPro内置的权限管理机制
    // canAdmin: currentUser && currentUser.access === 'admin',
    canAdmin: loginUser?.userRole === 'admin',
  };
}
