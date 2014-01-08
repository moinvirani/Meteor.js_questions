// This is deliberately a global variable
Questions = new Meteor.Collection('Questions');

var getCurrentEmail = function () {
  return Meteor.user() &&
  Meteor.user().emails &&
  Meteor.user().emails[0].address;
};

if (Meteor.isClient) {
  Template.questions.allQuestions = function () {
    return Questions.find();
  };

  Template.questions.events({
    "click #questionAsk": function (evnt, templ) {
      var question = templ.find("#questionText").value;
      Questions.insert({
        question: question,
        score: 1,
        email: getCurrentEmail(),
        votes: [Meteor.userId()]
      });
    }
  });

}