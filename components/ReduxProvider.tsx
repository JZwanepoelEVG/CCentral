"use client";

import { Provider } from "react-redux";
import store from "@/src/store/store";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
