import { afterEach, beforeEach, describe, test, expect } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2"

describe("Untestable 4: enterprise application", () => {
  class mockHashingLibrary {
    verifySync(oldHash, newPw) {
      return oldHash == this.hashSync(newPw)
    }

    hashSync(pw) {
      return pw + "_hashed"
    }
  }

  class mockUserDao {
    user

    constructor() {
      const passwordHash = new mockHashingLibrary().hashSync('password')
      this.user = {
        userId: 1,
        passwordHash: passwordHash
      }
    }

    async getById(userId) {
      return this.user
    }

    async save(user) {
      user = this.user
    }
  }

  test.skip("changed password works (characterization test)", async () => {
    const service = new PasswordService();

    process.env.PGUSER = 'untestable'
    process.env.PGHOST = 'localhost'
    process.env.PGDATABASE = 'untestable'
    process.env.PGPASSWORD = 'secret'
    process.env.PGPORT = '5432'

    const users = PostgresUserDao.getInstance()

    const passwordHash = await argon2.hash("safe");

    await users.save({ userId: 1, passwordHash })

    // Just to be sure it's saved properly
    const u = await users.getById(1)
    expect(u.passwordHash).to.equal(passwordHash)

    await service.changePassword(1, 'safe', 'changed')
    const updatedU = await users.getById(1)
    expect(updatedU.passwordHash).not.to.equal(passwordHash)
    expect(argon2.verifySync(updatedU.passwordHash, 'changed')).to.equal(true)

    PostgresUserDao.getInstance().close();
  });

  test("can DI userService to passwordService", async () => {
    const hashingLibrary = new mockHashingLibrary()
    const userService = new mockUserDao();
    const service = new PasswordService(userService, hashingLibrary)

    service.changePassword(1, 'password', 'test')

    const updatedUser = await userService.getById(1);
    const verify = hashingLibrary.verifySync(updatedUser.passwordHash, 'test')
    expect(verify).to.equal(true)
  });

  test("can DI hashing library to passwordService", async () => {
    const userService = new mockUserDao();
    const hashingLibrary = new mockHashingLibrary();
    const service = new PasswordService(userService, hashingLibrary)

    service.changePassword(1, 'password', 'test')

    const updatedUser = await userService.getById(1);
    const verify = hashingLibrary.verifySync(updatedUser.passwordHash, 'test')
    expect(verify).to.equal(true)
  })
});
