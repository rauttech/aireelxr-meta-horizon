import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/ping', (req: Request, res: Response) => {
    res.json({ message: 'pong' });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Signaling server running at http://localhost:${port}`);
    });
}

export default app;
