const { sequelize } = require('../sequelize_index');
const Account = require('../classes/Account');

type ACCOUNT = {
    id: number,
    name: string,
    email: string,
    password: string,
    destroy(): Function
}

describe("Account", () => {
    let account: ACCOUNT;
    beforeAll(async (): Promise<void> => {
        await sequelize.sync({ force: true });
    });

    test("can create a new account", async (): Promise<void> => {
        account = await Account.create({
            name: "John Wick",
            email: "john_wick@gmail.com",
            password: "encrypted_password123"
        });

        expect(account.id).toBeTruthy();
    });

    test("can access name", async (): Promise<void> => {
        expect(account.name).toBe("John Wick");
    });

    test("can access email", async (): Promise<void> => {
        expect(account.email).toBe("john_wick@gmail.com");
    });

    test("can access password", async (): Promise<void> => {
        expect(account.password).toBe("encrypted_password123");
    });

    test("can edit account", async (): Promise<void> => {
        await Account.update(
            { name: "J0hn W1ck" },
            { where: { id: account.id } }
        );

        account = await Account.findByPk(account.id);

        expect(account.name).toBe("J0hn W1ck");
    });

    test("can delete account", async (): Promise<void> => {
        account.destroy();

        account = await Account.findByPk(1);

        expect(account).toBe(null);
    });
});