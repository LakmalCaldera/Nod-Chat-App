const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'User1',
      room: 'Awesome group'
    },
    {
      id: 2,
      name: 'User2',
      room: 'Cool group'
    },
    {
      id: 3,
      name: 'User3',
      room: 'Awesome group'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Andrew',
      room: 'Awesome group'
    }
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for Awesome group', () => {
    var userList = users.getUserList(users.users[0].room);
    expect(userList.length).toBe(2);
  });

  it('should remove a users', () => {
    var removedUser = users.removeUser(users.users[0].id);
    expect(users.users.length).toBe(2);
    expect(users.users).toNotInclude(removedUser);
  });

  it('should not remove a user', () => {
    var removedUser = users.removeUser(1231231);
    expect(removedUser).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    expect(users.getUser(1)).toEqual(users.users[0]);
  });

  it('should not find a user', () => {
    expect(users.getUser(100)).toNotExist();
  });

});
