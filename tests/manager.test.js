const Manager = require('../lib/Manager');

describe('Manager', () => {
  describe('setters', () => {
    it('instatiates Manager as an object containing name, id, office number, and email', () => {
      const obj = new Manager ('Bill', 1000, 'bill@initech.com', 1, 'Manager');

      expect(obj.name).toEqual('Bill');
      expect(obj.id).toEqual(1000);
      expect(obj.email).toEqual('bill@initech.com')
      expect(obj.officeNumber).toEqual(1);
      expect(obj.role).toEqual('Manager')
    });
  });

  describe('getters', () =>{
    it('returns an object containing values for name, id, office number, and email', () => {
      const gets = new Manager('Bob', 2000,'bob@initech.com',  4, 'Manager');
      
      expect(gets.getName()).toEqual('Bob');
      expect(gets.getId()).toEqual(2000);
      expect(gets.getEmail()).toEqual('bob@initech.com');
      expect(gets.getOfficeNumber()).toEqual(4);
      expect(gets.getRole()).toEqual('Manager')
    });
  });
});