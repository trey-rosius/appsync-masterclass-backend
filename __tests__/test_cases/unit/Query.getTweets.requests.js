const given = require("../../steps/given");
const when = require("../../steps/when");
const path = require("path");
const chance = require("chance").Chance();
describe("Query.getTweets.request template", () => {
  it("Should throw error when limit is over 25", () => {
    const templatePath = path.resolve(
      __dirname,
      "../../../mapping-templates/Query.getTweets.request.vtl"
    );
    const username = chance.guid();

    const context = given.an_appsync_context(
      { username },
      {
        userId: username,
        nextToken: null,
        limit: 26,
      }
    );

    console.log(`template path is ${templatePath}`);
    expect(() =>
      when.we_invoke_an_appsync_template(templatePath, context)
    ).toThrowError("max limit is 25");
  });
});
