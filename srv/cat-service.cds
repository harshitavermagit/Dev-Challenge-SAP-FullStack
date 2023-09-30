
using fullstack_dev_challenge from '../db/data-model';

service DevChallengeService @(path: '/dev-challenge') {

    @odata.draft.enabled: true
    entity Tests     as projection on fullstack_dev_challenge.Tests

    actions {

        // @cds.odata.bindingparameter.name: '_it'
        // @Common.SideEffects             : {
        //     TargetProperties: ['_it/questions/test_ID','_it/questions/text', '_it/questions/answers/text']
        // }
        action assignQuestionsToTest(questionsCount : Integer) returns String;    };

    entity Questions as projection on fullstack_dev_challenge.Questions;

}
