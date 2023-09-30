const cds = require('@sap/cds')
const { Questions, Tests } = cds.entities('fullstack_dev_challenge')

module.exports = class DevChallengeService extends cds.ApplicationService {
    init() {


        this.on('assignQuestionsToTest', 'Tests', async (req) => {
            const questionsCount = req.data.questionsCount;
            const testIdFromContext = req._params[0].ID;
            const records = await SELECT.from(Questions)
                .where({ test_ID: null });
            console.log(records)
            if (questionsCount < 1) {
                return "The least value of Question Count is 1";
            }

            if (records.length === 0) {
                return "No Questions are available. Please add more questions.";
            }

            var recordsUpdated = 0;
            for (let item of records) {
                ++recordsUpdated;
                if (recordsUpdated > questionsCount) {
                    console.log("inside if :"+recordsUpdated)
                    recordsUpdated=questionsCount;
                    console.log("inside if value updated:"+recordsUpdated)
                    break;
                }
                else {
                    console.log("inside else :"+recordsUpdated)
                    const tx = cds.transaction(req);
                    cds.tx(req).run(UPDATE.entity(Questions).data({ test_ID: testIdFromContext }).where({
                        ID: item.ID
                    }));
                }
                console.log("records updated: "+recordsUpdated);
                

            }
            const isActiveEntity = true;
            this.read(Tests, { testIdFromContext, isActiveEntity });
            return recordsUpdated + " Question(s) successfully added to the Test!";
        });



        return super.init()

    }

    /* assignQuestionsToTest(tests,questionsCount) {
        
        if (questionsCount === 1) {
            return "Question Count value should be greater than 1";
        }
    } */


} 