import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
    createSession,
    getAllSessions,
    getSessionData,
    updateSession,
} from './sessionStore';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, response: Response) => {
    response.send('blank');
});

app.get(
    '/sessions/:sessionId',
    ({ params: { sessionId } }: Request, response: Response) => {
        console.log(sessionId);
        response.send(getSessionData(sessionId));
    }
);

app.get('/sessions', (request: Request, response: Response) => {
    response.send(getAllSessions());
});

app.post('/sessions', (request: Request, response: Response) => {
    const sessionId = createSession();

    response.send({ id: sessionId });
});

app.post(
    '/sessions/:sessionId/host',
    (request: Request, response: Response) => {
        console.log(request.body);
        const session = updateSession(
            request.params.sessionId,
            request.body.offer,
            true
        );
        response.send(session);
    }
);

app.post(
    '/sessions/:sessionId/guest',
    (request: Request, response: Response) => {
        const session = updateSession(
            request.params.sessionId,
            request.body.offer,
            false
        );
        response.send(session);
    }
);

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
