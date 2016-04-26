describe('Slinks', function() {
  var mock = require('protractor-http-mock');

  var token = ENV['SLACK_API_TOKEN'];

  mock([{
    request: {
      path: 'https://slack.com/api/search.messages?token=" + token + "&query=http:\/\/&pretty=1',
      method: 'GET'
    },

    response: {
      data: {
        messages: {
          matches: [
            {
              text: "<http://slack.com/>",
              previous: {
                text: "<http://expressjs.com/>"
              },
              previous_2: {
                text: "<https://mochajs.org/>"
              },
              next: {
                text: "This is not a link!"
              },
              next_2: {
                text: "<https://www.mongodb.org/>"
              }
            }
          ]
        }
      };
    }
  }]);

  afterEach(function() {
    mock.teardown();
  });

  it('has a title', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Slinks');
  });

  it('displays a list of links', function() {
    browser.get('/');
    var slinks = $$('#slinks li');
    expect(slinks.first().getText()).toEqual('https://slack.com/');
    expect(slinks.last().getText()).toEqual('https://www.mongodb.org/');
  });
});
