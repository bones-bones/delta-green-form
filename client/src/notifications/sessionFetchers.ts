export const addClientOffer = async ({
    sessionId,
    offer,
}: {
    sessionId: string;
    offer: string;
}) => {
    await fetch(`http://localhost:8000/sessions/${sessionId}/client`, {
        method: 'POST',
        body: JSON.stringify({ offer }),
    }).then((e) => e.json());
    return;
};

export const getSessionInfo = async (sessionId: string) => {
    const sessionData = await fetch(
        `http://localhost:8000/sessions/${sessionId}`,
        {}
    ).then((e) => e.json());
    return sessionData.hostInfo;
};
