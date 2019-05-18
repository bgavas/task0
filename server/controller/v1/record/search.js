const { Record } = require('./../../../model/record');

const strings = require('./../../../constant/string');
const constants = require('./../../../constant/constant');

module.exports = (req, res, next) => {

    // Generate filter
    let filter = { $and: [] };
    // Start date filter
    if (req.body.startDate) filter.$and.push({ createdAt: { $gt: new Date(req.body.startDate) }});
    // End date filter
    if (req.body.endDate) filter.$and.push({ createdAt: { $lt: new Date(req.body.endDate) }});
    // Min filter
    if (req.body.minCount) filter.$and.push({ totalCount: { $gt: parseInt(req.body.minCount) }});
    // Max filter
    if (req.body.maxCount) filter.$and.push({ totalCount: { $lt: parseInt(req.body.maxCount) }});

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

            // Log success. In my project, I use Winston package to log
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

            // Log error. In my project, I use Winston package to log
            console.log("An error occured during fetching records. Error: " + error);

            // Return fail response
            return res.status(400).send({
                code: constants.FAIL_CODE,
                msg: strings.FAIL_RESPONSE
            });

        });

    
};