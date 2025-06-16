# XRPL Payment Sender

A simple Node.js application for sending XRP payments on the XRP Ledger (XRPL) using the official xrpl.js library. This project supports both testnet and mainnet transactions with secure environment variable configuration.

## 🚀 Features

- ✅ Send XRP payments to any valid XRPL address
- ✅ Support for both testnet and mainnet
- ✅ Secure environment variable configuration
- ✅ Balance checking before and after transactions
- ✅ Transaction cost calculation
- ✅ Comprehensive error handling
- ✅ Transaction explorer links for easy verification
- ✅ Automatic retry suggestions for failed transactions

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- An XRPL wallet with sufficient XRP balance
- Valid XRPL wallet seed

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/xrpl-payment-sender.git
cd xrpl-payment-sender
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your actual values:
```env
WALLET_SEED=your_actual_wallet_seed_here
DESTINATION_ADDRESS=recipient_xrpl_address
AMOUNT_TO_SEND=10
XRPL_SERVER=wss://s.altnet.rippletest.net:51233
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `WALLET_SEED` | Your XRPL wallet seed | ✅ Yes | - |
| `DESTINATION_ADDRESS` | Recipient's XRPL address | ✅ Yes | - |
| `AMOUNT_TO_SEND` | Amount of XRP to send | No | 10 |
| `XRPL_SERVER` | XRPL server endpoint | No | Testnet |

### Network Configuration

#### Testnet (Default)
```env
XRPL_SERVER=wss://s.altnet.rippletest.net:51233
```

#### Mainnet (Production)
```env
XRPL_SERVER=wss://xrplcluster.com/
```

## 🚀 Usage

Run the payment script:
```bash
node index.js
```

### Sample Output
```
Wallet address: rw1wP4CbMeAENVrwaVT1YE8JvUAJuFpewR
Balance before transaction: 999.999988 XRP
Prepared transaction instructions: { ... }
Transaction cost: 0.000012 XRP
Current ledger: 8141025
Identifying hash: 2D02B9589DCF73395063D997E02E14E77D82F1524256A373CBB5DAFFBAAF8DF1
View your transaction on Bithomp Testnet Explorer: https://blockexplorer.one/xrp/testnet/tx/...
✅ Transaction successful!
Balance after transaction: 989.999976 XRP
Actual transaction cost: 10.000012 XRP
```

## 🏗️ Project Structure

```
xrpl-payment-sender/
├── index.js              # Main application file
├── package.json           # Project dependencies
├── .env                   # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🔐 Security Best Practices

1. **Never commit your `.env` file** - it contains sensitive wallet information
2. **Use testnet first** - always test with testnet before mainnet transactions
3. **Keep your seed secure** - never share your wallet seed with anyone
4. **Verify destination addresses** - double-check recipient addresses before sending
5. **Start with small amounts** - test with small amounts first

## 🧪 Testing

### Testnet Setup

1. Get testnet XRP from the [XRPL Testnet Faucet](https://xrpl.org/xrp-testnet-faucet.html)
2. Use testnet server: `wss://s.altnet.rippletest.net:51233`
3. View transactions on [Bithomp Testnet Explorer](https://blockexplorer.one/xrp/testnet)

### Mainnet Setup

1. Ensure you have real XRP in your wallet
2. Use mainnet server: `wss://xrplcluster.com/`
3. View transactions on [Bithomp Explorer](https://bithomp.com) or [XRPL Explorer](https://livenet.xrpl.org)

## 🐛 Troubleshooting

### Common Issues

1. **"LastLedgerSequence exceeded"**
   - The transaction expired before submission
   - Solution: Run the script again immediately

2. **"Insufficient balance"**
   - Your wallet doesn't have enough XRP
   - Solution: Add more XRP to your wallet

3. **"DESTINATION_ADDRESS is required"**
   - Missing environment variable
   - Solution: Check your `.env` file configuration

4. **Connection errors**
   - Network or server issues
   - Solution: Check your internet connection and try again

### Debug Tips

- Check balance using: [XRPL Explorer](https://livenet.xrpl.org) or [Bithomp](https://bithomp.com)
- Verify transaction status using the provided explorer links
- Ensure your wallet seed generates the expected address

## 📚 Dependencies

- [xrpl](https://www.npmjs.com/package/xrpl) - Official XRPL JavaScript library
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable loader

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is provided "as is" without warranty. Use at your own risk. Always test thoroughly on testnet before using with real XRP. The developers are not responsible for any financial losses.

## 🔗 Useful Links

- [XRPL Documentation](https://xrpl.org/docs.html)
- [xrpl.js Documentation](https://js.xrpl.org/)
- [XRPL Testnet Faucet](https://xrpl.org/xrp-testnet-faucet.html)
- [Bithomp Explorer](https://bithomp.com)
- [XRPL Official Site](https://xrpl.org)

## 📞 Support

If you encounter issues or have questions:
1. Check the troubleshooting section above
2. Review the [XRPL documentation](https://xrpl.org/docs.html)
3. Open an issue on GitHub
4. Join the [XRPL Community](https://xrpl.org/community.html)

---

**⭐ If this project helped you, please give it a star!**