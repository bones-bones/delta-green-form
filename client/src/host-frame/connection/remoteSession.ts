export const createSession = async () => {
    const createdSession = await fetch('http://localhost:8000/sessions', {
        method: 'POST',
    }).then((e) => e.json());
    return createdSession.id;
};

export const getSessionData = async (sessionId: string) => {
    const createdSession = await fetch(
        `http://localhost:8000/sessions/${sessionId}`,
        {}
    ).then((e) => e.json());
    return createdSession as SessionInfo;
};

export const addHostOffer = async ({
    sessionId,
    offer,
}: {
    sessionId: string;
    offer: string;
}) => {
    await fetch(`http://localhost:8000/sessions/${sessionId}/host`, {
        method: 'POST',
        body: JSON.stringify({ offer }),
        headers: { 'content-type': 'application/json' },
    }).then((e) => e.json());
    return;
};

export const addGuestOffer = async ({
    sessionId,
    offer,
}: {
    sessionId: string;
    offer: string;
}) => {
    await fetch(`http://localhost:8000/sessions/${sessionId}/guest`, {
        method: 'POST',
        body: JSON.stringify({ offer }),
        headers: { 'content-type': 'application/json' },
    }).then((e) => e.json());
    return;
};

export const pollForGuest = async (sessionId: string) => {
    let guestResponse;
    while (!guestResponse) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const request = await getSessionData(sessionId);
        guestResponse = request.guestInfo;
        console.log('polled');
    }
    return guestResponse;
};

interface SessionInfo {
    active: boolean;
    hostInfo?: string;
    guestInfo?: string;
    id: string;
}
