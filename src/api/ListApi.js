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
};

export const ContactApis = {
  requestChangeOwnerContact: {
    url: '/api/contacts/request/info/{0}/{1}',
    method: 'GET',
    contextType: 'application/json',
  },
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
  }
};
