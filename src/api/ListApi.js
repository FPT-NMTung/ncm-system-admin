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
  listUser: {
    url: '/api/admin/list-email-user',
    method: 'GET',
    contextType: 'application/json',
  }
};

export const ContactApis = {
  requestChangeOwnerContact: {
    url: '/api/contacts/request/info/{0}/{1}',
    method: 'GET',
    contextType: 'application/json',
  },
  listContact: {
    url: '/api/admin/contacts/list-user-da/{0}',
    method: 'GET',
    contextType: 'application/json'
  },
  transferContact: {
    url: '/api/contacts/transfer',
    method: 'PATCH',
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
  excuteImport: {
    url: '/api/admin/user-imported/{0}',
    method: 'POST',
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
