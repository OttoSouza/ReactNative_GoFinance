import React, { useCallback, useEffect, useState } from "react";
import HighlightCard from "../../components/HighlightCard/index";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard/index";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HightghtCardContainer,
  Transactions,
  Title,
  TransactionList,
  LoadingContainer,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/auth";
export interface DataListProps extends TransactionCardProps {
  id: string;
}
interface HightlightDataProps {
  amount: string;
  lastTransaction: string;
}

interface HightlightData {
  entries: HightlightDataProps;
  expensives: HightlightDataProps;
  total: HightlightDataProps;
}

function getLastTransactionDate(
  collection: DataListProps[],
  type: "positive" | "negative"
) {
  const collectionFiltered = collection.filter(
    (transaction) => transaction.type === type
  );

  if (collectionFiltered.length === 0) return 0;

  const lastTransactionDate = new Date(
    Math.max.apply(
      Math,
      collectionFiltered.map((transaction) =>
        new Date(transaction.date).getTime()
      )
    )
  );

  return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleDateString(
    "pt-BR",
    {
      month: "long",
    }
  )}`;
}

export default function DashBoard() {
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HightlightData>(
    {} as HightlightData
  );
  const { user, signOut } = useAuth();

  async function loadTransaction() {
    const dataKey = `@gofinance:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setTransactions(transactionFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensive = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval =
      lastTransactionExpensive === 0
        ? "Não há movimentaões"
        : `01 a ${lastTransactionExpensive}`;

    const total = entriesTotal - expensivesTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? "Não há transações"
            : `Ultima saida dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setLoading(false);
  }

  async function handleRemoveTransaction(id: string) {
    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];
      const transactionExist = transactions.some(
        (transaction: DataListProps) => transaction.id === id
      );

      if (!transactionExist) {
        Alert.alert("Erro ao remover transacao");
      }

      const updateTransaction = transactions.filter(
        (transaction: DataListProps) => transaction.id !== id
      );

      setTransactions(updateTransaction);
      await AsyncStorage.setItem(dataKey, JSON.stringify(updateTransaction));
    } catch (error) {
      Alert.alert("Erro ao remover transacao");
    }
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color="red" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Avatar
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HightghtCardContainer>
            <HighlightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              typeIcon="up"
            />
            <HighlightCard
              title="Saidas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              typeIcon="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              typeIcon="total"
            />
          </HightghtCardContainer>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item: data }) => (
                <TouchableOpacity
                  onLongPress={() => handleRemoveTransaction(data.id)}
                >
                  <TransactionCard data={data} />
                </TouchableOpacity>
              )}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
