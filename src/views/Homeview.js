import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import Header from '../components/Header/header';
import TransactionItem from '../components/Transaction/Transactionitem';
import { styles } from './style';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
      transactions: [],
      error: '',
    };
  }

  // Lifecycle method: Saat komponen pertama kali dimuat
  componentDidMount() {
    console.log('HomeView mounted');
    this.loadTransactions();
  }

  // Lifecycle method: Saat state atau props berubah
  componentDidUpdate(prevProps, prevState) {
    if (prevState.transactions !== this.state.transactions) {
      console.log('Transactions updated', this.state.transactions);
      this.saveTransactions();
    }
  }

  // Lifecycle method: Saat komponen akan dihapus
  componentWillUnmount() {
    console.log('HomeView will unmount');
  }

  // Fungsi untuk memuat transaksi dari penyimpanan (contoh: AsyncStorage)
  loadTransactions = () => {
    // Simulasi data transaksi dari penyimpanan lokal
    const savedTransactions = [];
    this.setState({ transactions: savedTransactions });
  };

  // Fungsi untuk menyimpan transaksi ke penyimpanan (contoh: AsyncStorage)
  saveTransactions = () => {
    // Di sini Anda dapat menambahkan logika untuk menyimpan transaksi ke penyimpanan lokal
    console.log('Transactions saved:', this.state.transactions);
  };

  // Fungsi untuk menambahkan transaksi
  addTransaction = (type) => {
    const { description, amount, transactions } = this.state;

    if (!description || !amount || isNaN(amount.replace(/[^\d]/g, ''))) {
      Alert.alert('Input Tidak Valid', 'Harap masukkan deskripsi dan jumlah yang valid.');
      return;
    }

    const amountWithoutDots = amount.replace(/\./g, '');
    const newTransaction = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amountWithoutDots),
      type,
    };

    this.setState({
      transactions: [...transactions, newTransaction],
      description: '',
      amount: '',
      error: '',
    });
  };

  // Fungsi untuk menghapus transaksi
  deleteTransaction = (id) => {
    const { transactions } = this.state;
    this.setState({
      transactions: transactions.filter((transaction) => transaction.id !== id),
    });
  };

  // Fungsi untuk menghitung saldo
  calculateBalance = () => {
    const { transactions } = this.state;
    return transactions.reduce((total, item) => {
      return item.type === 'income' ? total + item.amount : total - item.amount;
    }, 0);
  };

  // Fungsi untuk menangani perubahan jumlah
  handleAmountChange = (text) => {
    this.setState({ amount: this.formatAmount(text) });
  };

  // Fungsi untuk format jumlah uang
  formatAmount = (text) => {
    let rawText = text.replace(/[^0-9]/g, '');
    if (rawText.length > 3) {
      rawText = rawText.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return rawText;
  };

  render() {
    const { description, amount, transactions, error } = this.state;

    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Saldo: Rp{this.calculateBalance().toLocaleString()}</Text>
        <TextInput
          style={styles.input}
          placeholder="Deskripsi"
          placeholderTextColor="#888"
          value={description}
          onChangeText={(text) => this.setState({ description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Jumlah"
          placeholderTextColor="#888"
          value={amount}
          keyboardType="numeric"
          onChangeText={this.handleAmountChange}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => this.addTransaction('income')}
          >
            <Text style={styles.buttonText}>Tambah Pemasukan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => this.addTransaction('expense')}
          >
            <Text style={styles.buttonText}>Tambah Pengeluaran</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem
              type={item.type}
              amount={item.amount}
              description={item.description}
              onDelete={() => this.deleteTransaction(item.id)}
            />
          )}
        />
      </View>
    );
  }
}

export default HomeView;
