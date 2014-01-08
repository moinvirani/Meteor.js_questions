// This is deliberately a global variable
Questions = new Meteor.Collection('Questions');

if (Meteor.isClient) {
  Template.questions.allQuestions = function () {
    return Questions.find();
  };

  Template.questions.events({
    "click #questionAsk": function (evnt, templ) {
      var question = templ.find("#questionText").value;
      Questions.insert({question: question, score: 1});
    }
  });

}