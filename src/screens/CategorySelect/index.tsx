import React from "react";

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Divider,
  Footer,
} from "./styles";
import { categories } from "../../utils/categories";
import { FlatList } from "react-native";
import Button from '../../components/Forms/Button/index';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

const CategorySelect: React.FC<Props> = ({
  category,
  closeSelectCategory,
  setCategory,
}) => {

  function handleCategorySelect(category: Category) {
    setCategory(category)
  }
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={categories}
        keyExtractor={(item) => item.key}
        style={{ flex: 1, width: "100%" }}
        renderItem={({ item }) => (
          <Category onPress={() => handleCategorySelect(item)} isActive={category.key === item.key}>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory}/>
      </Footer>
    </Container>
  );
};

export default CategorySelect;
