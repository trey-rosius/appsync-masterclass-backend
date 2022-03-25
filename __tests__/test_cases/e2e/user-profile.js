const given = require("../../steps/given");
const when = require("../../steps/when");
const path = require("path");
const chance = require("chance").Chance();

describe("Given an authenticated user", () => {
  let user;
  beforeAll(async () => {
    user = await given.an_authenticated_user();
  });
  it("The user can fetch his profile with getMyProfile", async () => {
    const profile = await when.a_user_calls_getMyProfile(user);

    expect(profile).toMatchObject({
      id: user.username,
      name: user.name,
      imageUrl: null,
      backgroundImage: null,
      bio: null,
      location: null,
      createdAt: expect.stringMatching(
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g
      ),
      followersCount: 0,
      followingCout: 0,
      tweetsCount: 0,
      likesCount: 0,
    });

    const [firstName, lastName] = user.name.split(" ");

    expect(profile.screenName).toContain(firstName);
    expect(profile.screenName).toContain(lastName);
  });
});