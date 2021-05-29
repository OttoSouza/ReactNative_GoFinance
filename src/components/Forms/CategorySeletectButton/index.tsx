import React from "react";

import { Container, CategoryTitle, Icon } from "./styles";

interface CategorySeletectButtonProps{
  title: string;
  onPress: () => void;
}

const CategorySeletectButton: React.FC<CategorySeletectButtonProps> = ({title, onPress}) => {
  return ( 
    <Container onPress={onPress}  >
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down"/>
    </Container>
  );
};

export default CategorySeletectButton;
