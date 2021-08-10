import {
  CSSObject,
  forwardRef,
  Input,
  InputProps,
  useMergeRefs,
  useMultiStyleConfig,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { __DEV__, runIfFn } from "@chakra-ui/utils";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import React, { useEffect } from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { UseAutoCompleteReturn } from "./types";

export interface AutoCompleteInputProps extends InputProps {
  children?: MaybeRenderProp<{ tags: UseAutoCompleteReturn["tags"] }>;
  wrapStyles?: CSSObject;
}

export const AutoCompleteInput = forwardRef<AutoCompleteInputProps, "input">(
  (props, forwardedRef) => {
    const {
      autoCompleteProps: { multiple },
      inputRef,
      getInputProps,
      setQuery,
      tags,
    } = useAutoCompleteContext();

    const ref = useMergeRefs(forwardedRef, inputRef);

    const { children: childrenProp, value, ...rest } = props;

    useEffect(() => {
      setQuery(value ?? "");
    }, [value, setQuery]);

    const themeInput: any = useMultiStyleConfig("Input", props);

    const inputProps = getInputProps(rest, themeInput);

    const children = runIfFn(childrenProp, { tags });

    const inputContent = <Input {...inputProps.input} ref={ref} />;
    const multipleInputContent = (
      <Wrap {...inputProps.wrapper}>
        {children}
        <WrapItem as={Input} {...(inputProps.input as any)} />
      </Wrap>
    );

    return multiple ? multipleInputContent : inputContent;
  }
);

if (__DEV__) {
  AutoCompleteInput.displayName = "Input";
}

AutoCompleteInput.id = "Input";
