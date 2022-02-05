import React from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { AutoCompleteRefMethods, UseAutoCompleteProps } from "./types";
export declare type AutoCompleteChildProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};
export interface AutoCompleteProps extends UseAutoCompleteProps {
    children: MaybeRenderProp<AutoCompleteChildProps>;
    ref?: React.RefObject<AutoCompleteRefMethods>;
}
export declare const AutoComplete: import("@chakra-ui/react").ComponentWithAs<"div", AutoCompleteProps>;
