'use strict';

module.exports = ProjectPage;

function ProjectPage(projectElem) {
    this.projectElem = projectElem;
    this.url =  '/#/app/projects/show/' + this.id;
    this.subscribeButton = element(by.id('subscribe-btn'));
    this.unsubscribeButton = element(by.id('unsubscribe-btn'));
    this.submitSubscriptionButton = element(by.id('submit-btn'));
    this.comment = element(by.model('subscriptionData.help'));
    this.confirmationButton = element(by.buttonText('Confirmar'));

    this.go = function() {
        this.projectElem.click();
    };

    this.clickSubscribeButton = function() {
        this.subscribeButton.click();
    };

    this.clickUnsubscribeButton = function() {
        this.unsubscribeButton.click();
    };

    this.setComment = function(comment) {
        this.comment.clear();
        this.comment.sendKeys(comment);
    };

    this.subscribe = function(comment) {
        this.clickSubscribeButton();
        if (comment) this.setComment(comment);
        this.submitSubscriptionButton.click();
    };

    this.unsubscribe = function(comment) {
        this.clickUnsubscribeButton();
        this.clickConfirm();
    };

    this.clickConfirm = function() {
        this.confirmationButton.click();
    };
}
