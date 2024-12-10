import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './style';

const TransactionItem = ({ type, amount, description, onDelete }) => {
  const isIncome = type === 'income';

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.description}>{description}</Text>
        <Text
          style={[styles.amount, isIncome ? styles.income : styles.expense]}>
          {isIncome ? '+' : '-'}Rp{amount.toLocaleString()}
        </Text>
      </View>
      <Button title="Delete" onPress={onDelete} color="#FF5252" />
    </View>
  );
};

export default TransactionItem;
