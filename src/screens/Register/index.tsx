import React, { useState } from "react";
import uuid from "react-native-uuid";
import Button from "../../components/Forms/Button/index";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySeletectButton from "../../components/Forms/CategorySeletectButton/index";
import CategorySelect from "../CategorySelect/index";
import InputForm from "../../components/Forms/InputForm/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypeContainer,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser nagativo")
    .required("Preço é obrigatório"),
});

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();
  const {user} = useAuth()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseSelecteCategoryModal() {
    setIsModalOpen(false);
  }

  function handleOpenSelecteCategoryModal() {
    setIsModalOpen(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      category: category.key,
      type: transactionType,
      date: new Date(),
    };
    try {
      const dataKey = `@gofinance:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possivel salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Name"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypeContainer>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Saida"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionTypeContainer>

            <CategorySeletectButton
              title={category.name}
              onPress={handleOpenSelecteCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={isModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelecteCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
