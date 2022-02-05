import { ReactNode } from "react";
import { FlexProps } from "@chakra-ui/react";
import { Item } from "../types";
import { AutoCompleteItemProps } from "../autocomplete-item";
export declare const getDefItemValue: (item: AutoCompleteItemProps["value"]) => any;
export declare const setEmphasis: (children: any, query: string) => any;
export declare const getItemList: (children: ReactNode) => Item[];
export declare const getFocusedStyles: () => FlexProps;
export declare const defaultFilterMethod: (query: string, itemValue: Item["value"], itemLabel: Item["label"]) => boolean;
