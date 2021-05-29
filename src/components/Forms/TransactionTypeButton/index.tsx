import React from "react";

import { Container, Button, Icon, Title } from "./styles";
import { RectButtonProps } from 'react-native-gesture-handler';

interface TransactionTypeButtonProps extends RectButtonProps {
  type: "up" | "down";
  title: string;
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  isActive,
  type,
  ...rest
}) => {
  return (
    <Container  isActive={isActive} type={type}>
      <Button {...rest}>

      <Icon name={[icons[type]]} type={type} />
      <Title>{title}</Title>
      </Button>
    </Container>
  );
};

export default TransactionTypeButton;
