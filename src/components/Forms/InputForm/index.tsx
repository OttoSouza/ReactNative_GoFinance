import React from "react";

import Input from "../Input";

import { Container, Error } from "./styles";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";
interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

const InputForm: React.FC<InputFormProps> = ({
  control,
  name,
  error,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default InputForm;
