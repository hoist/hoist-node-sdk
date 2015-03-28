var chai = require('chai');

process.env.NODE_ENV = 'test';

chai.should();
chai.use(require('chai-as-promised'));
chai.use(require('chai-jq'));

