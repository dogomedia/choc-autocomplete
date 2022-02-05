import { TagProps } from "@chakra-ui/tag";
import React from "react";
declare type AutoCompleteTagProps = {
    disabled?: boolean;
    label: string;
    onRemove?: () => void;
} & TagProps;
export declare const AutoCompleteTag: React.MemoExoticComponent<(props: AutoCompleteTagProps) => JSX.Element>;
export {};
