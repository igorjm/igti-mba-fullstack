const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

global.fileName = "accounts.json";

// criar conta
router.post("/", async (req, res) => {
  let account = req.body;
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    account = {
      id: json.nextId++,
      ...account,
    };
    json.accounts.push(account);

    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send(`Conta ${account.id} de ${account.name} adicionada.`);
    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`POST /account - ${err.message}`);
  }
});

// método GET
router.get("/", async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    delete json.nextId;
    res.send(json);
    logger.info(`GET /account`);
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`GET /account - ${err.message}`);
  }
});

router.get("/:id", async (req, res) => {
  //req.params.id;
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    const accountID = json.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    if (accountID) {
      res.send(accountID);
      logger.info(`POST /account/:id - ${JSON.stringify(accountID)}`);
    } else {
      res.end();
      logger.info(`GET /account/:id`);
    }
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`GET /account/:id - ${err.message}`);
  }
});

// método DELETE
router.delete("/:id", async (req, res) => {
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    let updatedAccounts = json.accounts.filter(
      (account) => account.id !== parseInt(req.params.id, 10)
    );
    json.accounts = updatedAccounts;
    await fs.writeFile(global.fileName, JSON.stringify(json));

    res.end();
    logger.info(`DELETE /account/:id - ${JSON.stringify(req.params.id)}`);
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`DELETE /account/:id - ${err.message}`);
  }
});

// método PUT - atualização integral de recurso
// método PATCH - atualização parcial do recurso
router.put("/", async (req, res) => {
  let updateAccount = req.body;
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    let oldIndex = json.accounts.findIndex(
      (account) => account.id === updateAccount.id
    );
    json.accounts[oldIndex].name = updateAccount.name;
    json.accounts[oldIndex].balance = updateAccount.balance;
    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.end();
    logger.info(`PUT /account - ${JSON.stringify(updateAccount)}`);
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`PUT /account - ${err.message}`);
  }
});

// depositar na conta
router.post("/deposit", async (req, res) => {
  let newDeposit = req.body;
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    let index = json.accounts.findIndex(
      (account) => account.id === newDeposit.id
    );
    json.accounts[index].balance += newDeposit.value;
    await fs.writeFile(global.fileName, JSON.stringify(json));
    res.send(json.accounts[index]);
    logger.info(
      `POST /account/deposit - Valor depositado: ${
        newDeposit.value
      } Novo Saldo: ${JSON.stringify(json.accounts[index].balance)}`
    );
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`POST /account/deposit - ${err.message}`);
  }
});

// saque
router.post("/withdraw", async (req, res) => {
  let newWithdraw = req.body;
  try {
    let data = await fs.readFile(global.fileName, "utf8");
    let json = JSON.parse(data);
    let index = json.accounts.findIndex(
      (account) => account.id === newWithdraw.id
    );
    if (json.accounts[index].balance > newWithdraw.value) {
      json.accounts[index].balance -= newWithdraw.value;
      await fs.writeFile(global.fileName, JSON.stringify(json));
      res.send(json.accounts[index]);
    } else {
      logger.error(
        `POST /account/withdraw - Valor indisponível - account = ${
          newWithdraw.id
        } req = ${newWithdraw.value} saldo = ${JSON.stringify(
          json.accounts[index].balance
        )}`
      );
      throw new Error("Não há saldo suficiente");
    }
  } catch (err) {
    res.status(400).send({ Error: err.message });
    logger.error(`POST /account/withdraw - ${err.message}`);
  }
});

module.exports = router;
