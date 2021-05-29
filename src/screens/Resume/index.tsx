import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
} from "./styles";
import HistoryCard from "../../components/HistoryCard/index";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingContainer } from "../DashBoard/styles";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/auth";
interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  totalFormatted: string;
  total: number;
  color: string;
  percentFormatted: string;
  percent: number;
}

const Resume: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const { user } = useAuth();

  /**
   * Metodo para passar o mes das transaçoes.
   * No caso se estiver no mes de maio e quiser verificar as transaçoes do mes anterior
   * Metodo recebe uma action de proximo e anterior
   * Se for proximo, pega o mes atual e acrescenta mais 1 -> maio -> junho
   * Se for anterior, pega o mes atual e decrementa menos 1 -> maio -> abril
   * @param action
   */

  function handleDateChanged(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  /**
   * Metodo para realizar a leitura dos dados a partir das despesas que foram cadastradas
   * 1. Obtem a chave do AsyncStorage para recuperar os dados
   * 2. Recupera dos dados
   * 3. Armazena os dados em responseFormated
   */
  async function loadData() {
    setIsLoading(true);

    const dataKey = `@gofinance:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormated = response ? JSON.parse(response) : [];

    /**
     * A constante "expensives" ira ser armazenada se o tipo da transação for "negative",
     * se o mes e ano forem iguais ao Mes selecionada para listagem dos dados. No caso exiba somente os dados de "MAIO, 2021"
     */
    const expensives = responseFormated.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    /**
     * Armazena o total gasto de cada categoria.
     */
    const totalByCategory: CategoryData[] = [];

    /**
     * Calcular o gasto por categoria
     * Depois esse valor ira ser usado para calcular a porcentagem.
     * Esse valor sera usado no Grafico
     */
    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    /**
     * Ira percorrer cada categoria
     * Para cada categoria percorrida, ira percorrer todos os gastos
     * Verifica se a categoria que foi salva é igual as categorias que existem
     *
     * No segundo for ira pegar os gastos de cada categoria e somar.
     * Armazenando em "categorySum"
     */

    categories.forEach((category) => {
      let categorySum = 0;
      // se for soma
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        /**
         * Transaformando os valores em porcentagem para ser usados nas categorias
         */
        const percent = (categorySum / expensivesTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          name: category.name,
          color: category.color,
          total: categorySum,
          key: category.key,
          percent,
          percentFormatted,
          totalFormatted,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color="red" />
        </LoadingContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChanged("prev")}>
              <SelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChanged("next")}>
              <SelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            {/* Sobre esse grafico, recebe os dados e os valores x e y que seriam o nome e o valor */}
            {/* Nesse caso a unica coisa que desejo seria o porcentual formatado */}
            <VictoryPie
              data={totalByCategories}
              x="percentFormatted"
              y="total"
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(14),
                  fontWeight: "bold",
                  fill: "#fff",
                },
              }}
              labelRadius={80}
            />
          </ChartContainer>
          {totalByCategories.map((item) => (
            <HistoryCard
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
              key={item.key}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default Resume;
