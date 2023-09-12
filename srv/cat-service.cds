using fullstack_dev_challenge from '../db/data-model';

service DevChallengeService @(path: '/dev-challenge') {
    @odata.draft.enabled: true
    entity Tests as projection on fullstack_dev_challenge.Tests;
    entity Questions as projection on fullstack_dev_challenge.Questions;
    //entity Answers as projection on fullstack_dev_challenge.Answers;

// TODO: Expose other entities here
}
