require("dotenv").config();
const xrpl = require("xrpl");

// Load configuration from environment variables
const WALLET_SEED = process.env.WALLET_SEED;
const DESTINATION_ADDRESS = process.env.DESTINATION_ADDRESS;
const AMOUNT_TO_SEND = process.env.AMOUNT_TO_SEND;
const XRPL_SERVER = process.env.XRPL_SERVER;

// Validate required environment variables
if (!WALLET_SEED) {
  throw new Error("WALLET_SEED is required in .env file");
}
if (!DESTINATION_ADDRESS) {
  throw new Error("DESTINATION_ADDRESS is required in .env file");
}

const wallet = xrpl.Wallet.fromSeed(WALLET_SEED);
console.log("Wallet address:", wallet.address);

/**
 * @dev Main function to send XRP payment and log transaction details.
 */
async function main() {
  const client = new xrpl.Client(XRPL_SERVER);

  try {
    await client.connect();

    // Check balance before the transaction
    const balanceBefore = await getBalance(client, wallet.address);
    console.log("Balance before transaction:", balanceBefore, "XRP");

    // Verify sufficient balance
    const amountToSend = parseFloat(AMOUNT_TO_SEND);
    const estimatedFee = 0.00012; // Estimate fee
    if (parseFloat(balanceBefore) < amountToSend + estimatedFee) {
      throw new Error(
        `Insufficient balance. Available: ${balanceBefore} XRP, Required: ${
          amountToSend + estimatedFee
        } XRP`
      );
    }

    // Prepare the payment transaction - REMOVED NetworkID for testnet
    // Also increased LastLedgerSequence buffer
    const prepared = await client.autofill({
      TransactionType: "Payment",
      Account: wallet.address,
      Amount: xrpl.xrpToDrops(AMOUNT_TO_SEND),
      Destination: DESTINATION_ADDRESS,
      // NetworkID removed - not needed for testnet and can cause canonical issues
    });

    // Manually increase the LastLedgerSequence to give more time
    const currentLedger = await client.getLedgerIndex();
    prepared.LastLedgerSequence = currentLedger + 100; // Give 100 ledgers buffer (~5-10 minutes)

    const max_ledger = prepared.LastLedgerSequence;
    console.log("Prepared transaction instructions:", prepared);
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP");
    console.log("Transaction expires after ledger:", max_ledger);
    console.log("Current ledger:", currentLedger);

    // Sign the transaction
    const signed = wallet.sign(prepared);
    console.log("Identifying hash:", signed.hash);
    console.log("Signed blob:", signed.tx_blob);
    console.log(
      `View your transaction on Bithomp Testnet Explorer: https://blockexplorer.one/xrp/testnet/tx/${signed.hash}`
    );

    // Submit the transaction and wait for confirmation
    const result = await client.submitAndWait(signed.tx_blob);
    console.log("Transaction result:", result);

    if (result.result.meta.TransactionResult === "tesSUCCESS") {
      console.log("✅ Transaction successful!");
    } else {
      console.log(
        "❌ Transaction failed:",
        result.result.meta.TransactionResult
      );
    }

    // Check balance after the transaction
    const balanceAfter = await getBalance(client, wallet.address);
    console.log("Balance after transaction:", balanceAfter, "XRP");

    const actualCost = parseFloat(balanceBefore) - parseFloat(balanceAfter);
    console.log("Actual transaction cost:", actualCost.toFixed(6), "XRP");
  } catch (error) {
    console.error("Error:", error.message || error);

    // If it's a ledger sequence error, suggest retry
    if (error.message && error.message.includes("LastLedgerSequence")) {
      console.log(
        "💡 Tip: The transaction expired. Try running the script again."
      );
    }
  } finally {
    await client.disconnect();
  }
}

/**
 * @dev Function to get the balance of an account.
 * @param {Client} client - The XRPL client instance.
 * @param {string} address - The account address to check.
 * @return {Promise<string>} - The balance in XRP as a string.
 */
async function getBalance(client, address) {
  const response = await client.request({
    command: "account_info",
    account: address,
    strict: true,
    ledger_index: "validated",
  });
  return xrpl.dropsToXrp(response.result.account_data.Balance);
}

main();
