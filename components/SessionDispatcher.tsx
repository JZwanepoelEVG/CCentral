"use client"; // This ensures the component is treated as a client component

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession } from "@/src/store/slices/sessionSlice"; // Import the action

const SessionDispatcher = ({ session }: { session: any }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log("Session Data:", session);
        // Dispatch the session to Redux store
        if (session) {
            dispatch(setSession(session));
        }
    }, [dispatch, session]);

    return null; // This component doesn't need to render anything
};

export default SessionDispatcher;
