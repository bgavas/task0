const expect = require('expect');
const request = require('supertest');
const strings = require('./../../../../constant/string');
const constants = require('./../../../../constant/constant');

module.exports = (app, routePrefix) => {

    describe(`POST/${routePrefix}/search`, () => {

        it('should fetch records with all search parameters', (done) => {

            request(app)
                .post(`/${routePrefix}/search`)
                .send({
                    startDate: '2016-07-01',
                    endDate: '2016-09-01',
                    minCount: 2700,
                    maxCount: 2900
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.code).toBe(constants.SUCCESS_CODE);
                    expect(res.body.msg).toBe(strings.SUCCESS_RESPONSE);
                    expect(res.body.records).toHaveLength(69);
                })
                .end(done);

        });

        it('should fetch records with missing search parameters', (done) => {

            request(app)
                .post(`/${routePrefix}/search`)
                .send({
                    minCount: 2700,
                    maxCount: 2900
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.code).toBe(constants.SUCCESS_CODE);
                    expect(res.body.msg).toBe(strings.SUCCESS_RESPONSE);
                    expect(res.body.records).toHaveLength(297);
                })
                .end(done);

        });

        it('should not fetch records if start date type is incorrect', (done) => {

            request(app)
                .post(`/${routePrefix}/search`)
                .send({
                    startDate: 'asd',
                    endDate: '2016-09-01',
                    minCount: 2700,
                    maxCount: 2900
                })
                .expect(400)
                .expect((res) => {
                    expect(res.body.code).toBe(constants.BAD_FORMATTED_DATE_CODE);
                    expect(res.body.msg).toBe(strings.BAD_FORMATTED_DATE);
                })
                .end(done);

        });

        it('should not fetch records if end date type is incorrect', (done) => {

            request(app)
                .post(`/${routePrefix}/search`)
                .send({
                    startDate: '2016-09-01',
                    endDate: 'svs',
                    minCount: 2700,
                    maxCount: 2900
                })
                .expect(400)
                .expect((res) => {
                    expect(res.body.code).toBe(constants.BAD_FORMATTED_DATE_CODE);
                    expect(res.body.msg).toBe(strings.BAD_FORMATTED_DATE);
                })
                .end(done);

        });

        it('should not fetch records if minCount is not an integer', (done) => {

            request(app)
                .post(`/${routePrefix}/search`)
                .send({
                    startDate: '2016-07-01',
                    endDate: '2016-09-01',
                    minCount: "qwe",
                    maxCount: 2900
                })
                .expect(400)
                .expect((res) => {
                    expect(res.body.code).toBe(constants.NOT_AN_INTEGER_CODE);
                    expect(res.body.msg).toBe(strings.NOT_AN_INTEGER);
                })
                .end(done);

        });

        it('should not fetch records if maxCount is not an integer', (done) => {

            request(app)
                .post(`/${routePrefix}/search`)
                .send({
                    startDate: '2016-07-01',
                    endDate: '2016-09-01',
                    minCount: 2700,
                    maxCount: "csad"
                })
                .expect(400)
                .expect((res) => {
                    expect(res.body.code).toBe(constants.NOT_AN_INTEGER_CODE);
                    expect(res.body.msg).toBe(strings.NOT_AN_INTEGER);
                })
                .end(done);

        });

    });

}