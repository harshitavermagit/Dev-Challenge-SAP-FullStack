using DevChallengeService as service from '../../srv/cat-service';


annotate service.Tests with @(UI.FieldGroup #TestDetails: {
    $Type: 'UI.FieldGroupType',
    Data : [
        {
            $Type: 'UI.DataField',
            Label: 'Title',
            Value: title,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: description,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Created By',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Created At',
            Value: createdAt,
        }
    ],
});

annotate service.Tests with @(UI.HeaderInfo: {
    $Type         : 'UI.HeaderInfoType',
    TypeName      : 'Test',
    TypeNamePlural: 'Tests',
    Title         : {
        $Type: 'UI.DataField',
        Value: title,
    },
    Description   : {
        $Type: 'UI.DataField',
        Value: description,
    }
});

annotate service.Tests with @(UI.Facets: [
    {
        $Type : 'UI.ReferenceFacet',
        ID    : 'TestDetailsFacet',
        Label : 'Test Details',
        Target: '@UI.FieldGroup#TestDetails',
    },
    {
        $Type : 'UI.ReferenceFacet',
        Target: 'questions/@UI.LineItem#QuestionTable',
        Label : 'Questions',
        ID    : 'QuestionDetails',
    },
]);

annotate service.Tests with @(
    UI.LineItem                : [
        {
            $Type: 'UI.DataField',
            Label: 'Title',
            Value: title,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: description,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Created By',
            Value: createdBy,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Created At',
            Value: createdAt,
        }
    ],

    UI.LineItem #QuestionTables: [
        {
            $Type: 'UI.DataField',
            Label: 'Question Text',
            Value: questions.text,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Answer Text',
            Value: questions.answers.text,
        },
    ]
);

annotate service.Questions with @(UI.LineItem #QuestionTable: [
    {
        $Type: 'UI.DataField',
        Value: text,
        Label: 'Question Text',
    },
    {
        $Type: 'UI.DataField',
        Value: answers.text,
        Label: 'Answer Text',
    },
]);

