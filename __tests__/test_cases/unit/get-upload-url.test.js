require("dotenv").config();

const when = require("../../steps/when");
const chance = require("chance").Chance();

describe("when getImageUploadUrl runs", () => {
  it("Returns a signed S3 url", async () => {
    const username = chance.guid();
    const signedUrl = await when.we_invoke_getImageUploadUrl(
      username,
      ".png",
      "image/png"
    );

    const { BUCKET_NAME } = process.env;

    const regex = new RegExp(
      `https://${BUCKET_NAME}.s3-accelerate.amazonaws.com/${username}/.*.png?.*Content-Type=image%2Fpng.*`
    );
    expect(signedUrl).toMatch(regex);
  });
});
