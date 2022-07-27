const Intern = require('../lib/intern');

describe('intern', () => {
  describe('setters', () => {
    it('instatiates intern as an object containing name, id, school, and email', () => {
      const obj = new Intern ('Tom', 4321,'tom@initech.com',  'Georgia Tech', 'Intern');

      expect(obj.name).toEqual('Tom');
      expect(obj.id).toEqual(4321);
      expect(obj.email).toEqual('tom@initech.com')
      expect(obj.school).toEqual('Georgia Tech');
      expect(obj.role).toEqual('Intern')
    });
  });

  describe('getters', () =>{
    it('returns an object containing values for name, id, school, and email', () => {
      const gets = new Intern('Lawrence', 4200,'lawrence@initech.com', 'School of Hard Knocks', 'Intern');
      
      expect(gets.getName()).toEqual('Lawrence');
      expect(gets.getId()).toEqual(4200);
      expect(gets.getEmail()).toEqual('lawrence@initech.com');
      expect(gets.getSchool()).toEqual('School of Hard Knocks');
      expect(gets.getRole()).toEqual('Intern')
    });
  });
});