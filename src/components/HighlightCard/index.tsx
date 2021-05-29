import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface HighlightCardProps {
  typeIcon: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

const HighlightCard: React.FC<HighlightCardProps> = ({
  typeIcon,
  title,
  amount,
  lastTransaction,
}) => {
  return (
    <Container typeIcon={typeIcon}>
      <Header>
        <Title typeIcon={typeIcon}>{title}</Title>
        <Icon name={icon[typeIcon]} typeIcon={typeIcon} />
      </Header>
      <Footer>
        <Amount typeIcon={typeIcon}>{amount}</Amount>
        <LastTransaction typeIcon={typeIcon}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};

export default HighlightCard;
