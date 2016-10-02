import BookController from '../scripts/controllers/bookController.js';
import requester from 'requester';
import template from 'template';

mocha.setup('bdd');

const {expect, assert} = chai;

describe('Book shelf tests', function () {
	describe('BookController tests', function () {
		const result = [],
			page = 1,
			param = 'Horror',
			isCateogry = true;

		let BC = new BookController();

		beforeEach(function () {
			sinon.stub(requester, 'get')
				.returns(new Promise((resolve, reject) => {
					resolve(result);
				}));
		});
		afterEach(function () {
			requester.get.restore();
		});

		it('expect bookController.index() to make exactly two get call', function (done) {
			BC.index()
				.then(() => {
					expect(requester.get.calledTwice).to.be.true;
				})
				.then(done, done);
		});
		it('expect bookController.index() to make correct get first call', function (done) {
			BC.index()
				.then(() => {
					const actual = requester.get
						.firstCall
						.args[0];

					expect(actual).to.equal('/categories');
				})
				.then(done, done);
		});
		it('expect bookController.index() to make correct get second call', function (done) {
			BC.index()
				.then(() => {
					const actual = requester.get
						.secondCall
						.args[0];

					expect(actual).to.equal('/books');
				})
				.then(done, done);
		});
		it('expect bookController.index() to return correct result', function (done) {
			Promise.resolve(template.get('book')).then(templ => {
				return templ({});
			})
				.then((templ) => {
					BC.index()
						.then((obj) => {
							expect(obj).to.eql(templ);
						})
						.then(done, done);
				});
		});
		it('expect bookController.get() to make exactly one get call', function (done) {
			BC.get(123)
				.then(() => {
					expect(requester.get.calledOnce).to.be.true;
				})
				.then(done, done);
		});
		it('expect bookController.get() to make correct get first call', function (done) {
			let id = 123;
			BC.get(id)
				.then(() => {
					const actual = requester.get
						.firstCall
						.args[0];

					expect(actual).to.equal('/books/' + id);
				})
				.then(done, done);
		});
		it('expect bookController.attachToTemplate() to return correct result', function (done) {
			Promise.resolve(template.get('book')).then(templ => {
				return templ({});
			})
				.then((templ) => {
					BC.attachToTemplate({}, 'book')
						.then((obj) => {
							expect(obj).to.eql(templ);
						})
						.then(done, done);
				});
		});
		it('expect bookController.searchBy() to make exactly two get call', function (done) {
			BC.searchBy(param, page, isCateogry)
				.then(() => {
					expect(requester.get.calledTwice).to.be.true;
				})
				.then(done, done);
		});
		it('expect bookController.searchBy() to make correct get first call', function (done) {
			BC.searchBy(param, page, isCateogry)
				.then(() => {
					const actual = requester.get
						.firstCall
						.args[0];

					expect(actual).to.equal('/categories');
				})
				.then(done, done);
		});
		it('expect bookController.searchBy() to make correct get second call', function (done) {
			BC.searchBy(param, page, isCateogry)
				.then(() => {
					const actual = requester.get
						.secondCall
						.args[0];

					expect(actual).to.equal('/books');
				})
				.then(done, done);
		});
	});
});


mocha.run();