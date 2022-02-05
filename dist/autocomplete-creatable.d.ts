/// <reference types="react" />
import { FlexProps } from "@chakra-ui/react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
interface AutoCompleteCreatableProps extends FlexProps {
    children?: MaybeRenderProp<{
        value: any;
    }>;
}
export declare function AutoCompleteCreatable(props: AutoCompleteCreatableProps): JSX.Element | null;
export declare namespace AutoCompleteCreatable {
    var displayName: string;
}
export {};
