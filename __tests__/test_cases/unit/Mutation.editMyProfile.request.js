const given = require("../../steps/given");
const when = require("../../steps/when");
const path = require("path");
const chance = require("chance").Chance();
describe("Mutaion.editMyProfile.request template", () => {
  it.skip("Should use 'newProfile' fields in expression values", () => {
    const templatePath = path.resolve(
      __dirname,
      "../../../mapping-templates/Mutation.editMyProfile.request.vtl"
    );
    const username = chance.guid();
    const newProfile = {
      name: "Rosius",
      imageUrl: null,
      backgroundImageUrl: null,
      bio: "test",
      location: null,
      website: null,
      birthdate: null,
    };

    const context = given.an_appsync_context(
      { username },
      {
        newProfile,
      }
    );

    console.log(`template path is ${templatePath}`);
    const result = when.we_invoke_an_appsync_template(templatePath, context);

    expect(result).toEqual({
      version: "2017-02-28",
      operation: "UpdateItem",
      key: {
        id: {
          S: username,
        },
      },
      update: {
        expression:
          "set #name = :name, imageUrl = :imageUrl, backgroundImageUrl = :backgroundImageUrl, bio = :bio, #location = :location, website = :website, birthdate = :birthdate",
        expressionNames: {
          "#name": "name",
          "#location": "location",
        },
        expressionValues: {
          ":name": {
            S: "Rosius",
          },
          ":imageUrl": {
            NULL: true,
          },
          ":backgroundImageUrl": {
            NULL: true,
          },
          ":bio": {
            NULL: true,
          },
          ":location": {
            NULL: true,
          },
          ":website": {
            NULL: true,
          },
          ":birthdate": {
            NULL: true,
          },
        },
      },
      condition: {
        expression: "attribute_exists(id)",
      },
    });
  });
});
