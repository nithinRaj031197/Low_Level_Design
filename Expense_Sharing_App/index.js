class Userr {
  constructor(userId, name, email, mobileNumber) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.balances = {};
  }

  addBalance(user, amount) {
    if (this.balances[user.userId]) {
      this.balances[user.userId] += amount;
    } else {
      this.balances[user.userId] = amount;
    }
  }

  getBalance(user) {
    return this.balances[user] ?? 0;
  }
}

class ExpenseSharingApp {
  constructor() {
    this.users = {};
  }

  addUser(userId, name, email, mobileNumber) {
    this.users[userId] = new Userr(userId, name, email, mobileNumber);
  }

  addExpense(paidBy, totalAmount, splitType, users, ...values) {
    if (splitType === "EQUAL") {
      const totalUsers = users.length;
      const amountPerPerson = totalAmount / totalUsers;
      for (let user of users) {
        this.users[paidBy].addBalance(this.users[user], amountPerPerson);
        this.users[user].addBalance(this.users[paidBy], -amountPerPerson);
      }
    } else if (splitType === "EXACT") {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const amount = parseFloat(values[i]);

        this.users[paidBy].addBalance(this.users[user], amount);
        this.users[user].addBalance(this.users[paidBy], -amount);
      }
    } else if (splitType === "PERCENT") {
      const totalPercent = values.reduce((sum, val) => sum + parseFloat(val), 0);

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const percentShare = parseFloat(values[i]);
        const amount = (totalAmount * percentShare) / totalPercent;

        this.users[paidBy].addBalance(this.users[user], amount);
        this.users[user].addBalance(this.users[paidBy], -amount);
      }
    }
  }

  showBalance(userId) {
    const user = this.users[userId];

    for (let debtorId in user.balances) {
      const amount = user.balances[debtorId];

      if (amount > 0) {
        console.log(`${userId} owes ${debtorId}: ${amount.toFixed(2)}`);
      } else if (amount < 0) {
        console.log(`${debtorId} owes ${userId}: -${amount.toFixed(2)}`);
      }
    }
  }

  getUsers() {
    return this.users;
  }
}

// Create an instance of the ExpenseSharingApp
const app = new ExpenseSharingApp();

// Add users
app.addUser("u1", "User1", "user1@example.com", "1234567890");
app.addUser("u2", "User2", "user2@example.com", "9876543210");
app.addUser("u3", "User3", "user3@example.com", "1112223333");
app.addUser("u4", "User4", "user4@example.com", "4445556666");

// // Add expenses
app.addExpense("u1", 1000, "EQUAL", ["u1", "u2", "u3", "u4"]);
app.addExpense("u1", 1250, "EXACT", ["u2", "u3"], 370, 880);
app.addExpense("u4", 1200, "PERCENT", ["u1", "u2", "u3", "u4"], 40, 20, 20, 20);
// console.log("user", app.getUsers());
// // Show balances
app.showBalance("u1");
app.showBalance("u4");
