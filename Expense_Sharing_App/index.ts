interface User {
  userId: string;
  name: string;
  email: string;
  mobileNumber: string;
  balances: Record<string, number>;
}

class ExpenseSharingAppp {
  private users: Record<string, User>;
  constructor() {
    this.users = {};
  }

  addUser(userId: string, name: string, email: string, mobileNumber: string): void {
    this.users[userId] = {
      userId,
      name,
      email,
      mobileNumber,
      balances: {},
    };
  }

  addBalance(user: User, debtor: User, amount: number): void {
    if (!user.balances[debtor.userId]) {
      user.balances[debtor.userId] = 0;
    }
    user.balances[debtor.userId] += amount;
  }

  addExpense(
    paidBy: string,
    totalAmount: number,
    splitType: string,
    users: string[],
    ...values: (string | number)[]
  ): void {
    if (splitType === "EQUAL") {
      const totalUsers = users.length;
      const amountPerPerson = totalAmount / totalUsers;
      for (let user of users) {
        this.addBalance(this.users[paidBy], this.users[user], amountPerPerson);
        this.addBalance(this.users[user], this.users[paidBy], -amountPerPerson);
      }
    } else if (splitType === "EXACT") {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const amount = parseFloat(values[i] as string);

        this.addBalance(this.users[paidBy], this.users[user], amount);
        this.addBalance(this.users[user], this.users[paidBy], -amount);
      }
    } else if (splitType === "PERCENT") {
      const totalPercent = Number(values.reduce((sum, val) => +sum + parseFloat(val as string), 0));

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const percentShare = parseFloat(values[i] as string);
        const amount = (totalAmount * percentShare) / totalPercent;

        this.addBalance(this.users[paidBy], this.users[user], amount);
        this.addBalance(this.users[user], this.users[paidBy], -amount);
      }
    }
  }

  showBalance(userId: string): void {
    const user = this.users[userId];
    for (const debtorId in user.balances) {
      const amount = user.balances[debtorId];
      if (amount > 0) {
        console.log(`${userId} owes ${debtorId}: ${amount.toFixed(2)}`);
      } else if (amount < 0) {
        console.log(`${debtorId} owes ${userId}: ${(-amount).toFixed(2)}`);
      }
    }
  }
}

// Create an instance of the ExpenseSharingApp
const appp = new ExpenseSharingAppp();

// Add users
appp.addUser("u1", "User1", "user1@example.com", "1234567890");
appp.addUser("u2", "User2", "user2@example.com", "9876543210");
appp.addUser("u3", "User3", "user3@example.com", "1112223333");
appp.addUser("u4", "User4", "user4@example.com", "4445556666");

// // Add expenses
appp.addExpense("u1", 1000, "EQUAL", ["u1", "u2", "u3", "u4"]);
appp.addExpense("u1", 1250, "EXACT", ["u2", "u3"], 370, 880);
appp.addExpense("u4", 1200, "PERCENT", ["u1", "u2", "u3", "u4"], 40, 20, 20, 20);

// // Show balances
appp.showBalance("u1");
appp.showBalance("u4");
