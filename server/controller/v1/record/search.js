const moment = require('moment');
const { Record } = require('./../../../model/record');
const strings = require('./../../../constant/string');
const constants = require('./../../../constant/constant');

module.exports = (req, res, next) => {

    // Extract fields
    let { startDate, endDate, minCount, maxCount } = req.body;

    // Empty filter
    let filter = { $and: [] };

    // Start date filter
    if (startDate) {

        // Valid date
        if (moment(startDate).isValid()) {
            // Add startDate filter
            filter.$and.push({ createdAt: { $gt: new Date(startDate) }});
        }
        // Not valid
        else {
            return res.status(400).send({
                code: constants.BAD_FORMATTED_DATE_CODE,
                msg: strings.BAD_FORMATTED_DATE
            });
        }

    }
    // End date filter
    if (endDate) {

        // Valid date
        if (moment(endDate).isValid()) {
            // Add end date filter
            filter.$and.push({ createdAt: { $lt: new Date(endDate) }});
        }
        // Not valid
        else {
            return res.status(400).send({
                code: constants.BAD_FORMATTED_DATE_CODE,
                msg: strings.BAD_FORMATTED_DATE
            });
        }
        
    }
    // Min filter
    if (minCount) {

        // Valid date
        if (parseInt(minCount)) {
            // Add minCount filter
            filter.$and.push({ totalCount: { $gt: parseInt(minCount) }});
        }
        // Not valid
        else {
            return res.status(400).send({
                code: constants.NOT_AN_INTEGER_CODE,
                msg: strings.NOT_AN_INTEGER
            });
        }
        
    }
    // Max filter
    if (maxCount) {

        // Valid date
        if (parseInt(maxCount)) {
            // Add maxCount filter
            filter.$and.push({ totalCount: { $lt: parseInt(maxCount) }});
        }
        // Not valid
        else {
            return res.status(400).send({
                code: constants.NOT_AN_INTEGER_CODE,
                msg: strings.NOT_AN_INTEGER
            });
        }
        
    }

    // Find records
    Record
        .aggregate([{
            $addFields: {
                totalCount: {
                    $sum: '$counts'
                }
            }
        }, {
            $match: filter
        }])
        .then(records => {

            // Log success.
            // In my old projects, I use Winston package to log
            console.log("Records fetched with the filter: " + JSON.stringify(filter, null, 2));

            // Return success response
            return res.status(200).send({
                code: constants.SUCCESS_CODE,
                msg: strings.SUCCESS_RESPONSE,
                records: records.map(record => ({
                    key: record.key,
                    createdAt: record.createdAt,
                    totalCount: record.totalCount
                }))
            });

        })
        .catch(error => {

            // Log error.
            // In my old projects, I use Winston package to log
            console.log("An error occured during fetching records. Error: " + error);

            // Return fail response
            return res.status(400).send({
                code: constants.FAIL_CODE,
                msg: strings.SEARCH_FAIL_MESSAGE
            });

        });

    
};

/**
 * @swagger
 * definition:
 *   searchRecord:
 *     properties:
 *       startDate:
 *         type: string
 *       endDate:
 *         type: string
 *       minCount:
 *         type: integer
 *       maxCount:
 *         type: integer
 *     example: {
 *       "startDate": "2016-07-01",
 *       "endDate": "2016-11-01",
 *       "minCount": 2700,
 *       "maxCount": 2900
 *     }
 */

/**
 * @swagger
 * /api/v1/record/search:
 *   post:
 *     tags:
 *       - Record
 *     description: Get records
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: filter
 *         description: Search object
 *         in: body
 *         schema:
 *           $ref: '#/definitions/searchRecord'
 *     responses:
 *       200:
 *         description: Records
 *         schema:
 *           properties:
 *             code:
 *               type: integer
 *             msg:
 *               type: string
 *             records:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/definitions/record'
 *       400:
 *         description: Code = 2000
 *         schema:
 *           properties:
 *             code:
 *               type: integer
 *             msg:
 *               type: string
 */