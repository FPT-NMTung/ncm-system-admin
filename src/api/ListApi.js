export const UserApis = {
  login: {
    url: '/api/auth/login',
    method: 'POST',
    contextType: 'application/json',
  },
  viewTeam: {
    url: '/api/admin/team',
    method: 'GET',
    contextType: 'application/json',
  },
  listUserDeActive: {
    url: '/api/admin/list-user-da',
    method: 'GET',
    contextType: 'application/json',
  },
  listEmailUser: {
    url: '/api/admin/list-email-user',
    method: 'GET',
    contextType: 'application/json',
  },
  listAllUser: {
    url: '/api/admin/user/list',
    method: 'GET',
    contextType: 'application/json',
  },
  getParentOfUser: {
    url: '/api/admin/user/{0}/parent',
    method: 'GET',
    contextType: 'application/json',
  },
  searchUser: {
    url: '/api/admin/search',
    method: 'GET',
    contextType: 'application/json',
  },
  exportUser: {
    url: '/api/admin/user/export',
    method: 'POST',
    contextType: 'application/json',
  }
};

export const ContactApis = {
  requestChangeOwnerContact: {
    url: '/api/contacts/request/info/{0}/{1}',
    method: 'GET',
    contextType: 'application/json',
  },
  acceptRequestChangeOwnerContact: {
    url: '/api/contacts/request/{0}/{1}',
    method: 'PATCH',
    contextType: 'application/json',
  },
  rejectRequestChangeOwnerContact: {
    url: '/api/contacts/request/cancel/{0}/{1}',
    method: 'PATCH',
    contextType: 'application/json',
  },
  listContactDeActiveUser: {
    url: '/api/admin/contacts/list-user-da/{0}',
    method: 'GET',
    contextType: 'application/json'
  },
  transferContact: {
    url: '/api/admin/transfer',
    method: 'PATCH',
    contextType: 'application/json'
  },
  listContactUser: {
    url:'/api/admin/contacts/list-user/{0}',
    method: 'GET',
    contextType: 'application/json'
  }
};

export const ImportUserApis = {
  importUser: {
    url: '/api/admin/import',
    method: 'POST',
    contextType: 'multipart/form-data',
  },
  listUserImport: {
    url: '/api/admin/user-imported',
    method: 'GET',
    contextType: 'application/json',
  },
  executeImport: {
    url: '/api/admin/user-imported/{0}',
    method: 'POST',
    contextType: 'application/json',
  },  
  listEmailUserActive: {
    url: '/api/admin/list-email-manager',
    method: 'GET',
    contextType: 'application/json',
  },
  updateUser: {
    url: '/api/admin/user-imported/{0}',
    method: 'PUT',
    contextType: 'application/json',
  },
  addUser: {
    url: '/api/admin/user',
    method: 'POST',
    contextType: 'application/json',
  },
  detailUser: {
    url: '/api/admin/user/{0}',
    method: 'GET',
    contextType: 'application/json',
  },
  updateUserDetail: {
    url: '/api/admin/user/{0}',
    method: 'PUT',
    contextType: 'application/json',
  },
  deleteAllUserImport: {
    url: '/api/admin/user-imported',
    method: 'DELETE',
    contextType: 'application/json',
  },
  deleteUserImport: {
    url: '/api/admin/user-imported/{0}',
    method: 'DELETE',
    contextType: 'application/json',
  }
};

export const TestApis = {
  test: {
    url: '/api/test-api/{0}',
    method: 'GET',
    contextType: 'application/json',
  }
}
