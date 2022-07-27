const Engineer = require('../lib/engineer');

describe('Engineer', () => {
  describe('setters', () => {
    it('instatiates engineer as an object containing name, id, email, role, and Github username', () => {
      const obj = new Engineer ('Peter', 5999, 'peter@initech.com', 'PeterG', 'Engineer');

      expect(obj.name).toEqual('Peter');
      expect(obj.id).toEqual(5999);
      expect(obj.email).toEqual('peter@initech.com');
      expect(obj.github).toEqual('PeterG');
      expect(obj.role).toEqual('Engineer');
    });
  });

  describe('getters', () =>{
    it('returns an object containing values for name, id, email, role, and Github username', () => {
      const gets = new Engineer('Michael', 1234, 'michael@initech.com', 'MichaelB', 'Engineer');
      
      expect(gets.getName()).toEqual('Michael');
      expect(gets.getId()).toEqual(1234);
      expect(gets.getEmail()).toEqual('michael@initech.com');
      expect(gets.getGithub()).toEqual('MichaelB');
      expect(gets.getRole()).toEqual('Engineer');
    });
  });
});