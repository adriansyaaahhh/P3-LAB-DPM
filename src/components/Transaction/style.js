import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F1F1', // Warna latar belakang kartu transaksi
    marginVertical: 8,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    color: '#333333', // Warna teks deskripsi
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  income: {
    color: '#4CAF50',  // Warna hijau untuk pemasukan
  },
  expense: {
    color: '#F44336',  // Warna merah untuk pengeluaran
  },
});
