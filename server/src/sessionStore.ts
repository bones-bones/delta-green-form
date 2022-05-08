const sessions: Record<string, SessionInfo> = {
    test: { active: true, hostInfo: '23', id: '123' },
};

interface SessionInfo {
    active: boolean;
    hostInfo?: string;
    guestInfo?: string;
    id: string;
}

export const getSessionData = (key: string) => sessions[key];
export const getAllSessions = () => sessions;

export const createSession = () => {
    const sessionID = ('' + Math.random()).substring(2, 6);
    sessions[sessionID] = { active: true, id: sessionID };
    return sessionID;
};

export const updateSession = (key: string, info: string, host: boolean) => {
    const session = getSessionData(key);
    if (host) {
        session.hostInfo = info;
    } else {
        session.guestInfo = info;
    }
    return session;
};
