import { BoxProps, FlexProps } from "@chakra-ui/react";
import React from "react";
export interface AutoCompleteGroupProps extends BoxProps {
    children?: React.ReactNode;
    showDivider?: boolean;
    dividerColor?: string;
}
export declare const AutoCompleteGroup: import("@chakra-ui/react").ComponentWithAs<"div", AutoCompleteGroupProps>;
export declare const AutoCompleteGroupTitle: import("@chakra-ui/react").ComponentWithAs<"div", FlexProps>;
