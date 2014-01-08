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

// Adding validation so only users logged in can post questions
Template.questions.userId = function () {
  return Meteor.userId();
},

// show arrow only when logged in (authentication)
Template.questions.showArrow = function () {
  return Meteor.userId() &&
    ! _.contains(this.votes, Meteor.userId());
},

// adding a click event so that question is added to db when ask button is clicked
  Template.questions.events({
    "click #questionAsk": function (evt, templ) {
      var question = templ.find("#questionText").value;
      Questions.insert({
        question: question,
        score: 1,
        email: getCurrentEmail(),
        votes: [Meteor.userId()]
      });
    },

    // adding a click event so value increments as arrow is clicked
    "click .vote": function (evt, templ) {
      Questions.update(this._id, {
        $inc: {score: 1}, // increments score
        $addToSet: {votes: Meteor.userId()} //look this up
      });
    }

  });

}