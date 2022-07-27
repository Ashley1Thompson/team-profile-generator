const Employee = require('../lib/employee');

describe('Employee', () => {
  describe('setters', () => {
    it('instatiates employee as an object containing name, id, and email', () => {
      const obj = new Employee ('Samir', 1010, 'samir@initech.com');

      expect(obj.name).toEqual('Samir');
      expect(obj.id).toEqual(1010);
      expect(obj.email).toEqual('samir@initech.com')
    });
  });

  describe('getters', () =>{
    it('returns an object containing values for name, id, and email', () => {
      const gets = new Employee('Milton', 1111, 'milton@initech.com');
      
      expect(gets.getName()).toEqual('Milton');
      expect(gets.getId()).toEqual(1111);
      expect(gets.getEmail()).toEqual('milton@initech.com');
    });
  });
});