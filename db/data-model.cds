namespace fullstack_dev_challenge;

using
{
    cuid,
    managed
}
from '@sap/cds/common';

entity Tests : cuid, managed
{
    title : String;
    description : String;
    questions : Association to many Questions on questions.test = $self;
}

entity Questions : cuid
{
    text : String;
    answers : Composition of one Answers;
    test : Association to one Tests;
}

aspect Answers : cuid
{
    text : String;
}
