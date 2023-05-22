import * as express from 'express';
import routes from './routes';
import { configurePassport } from './middlewares/passport-strategies.mw';
import * as path from 'path';

const app = express();

configurePassport(app);

app.use(express.json());
app.use(routes);
app.use(express.static('public'));

app.get('*', (req, res) => {
    const htmlPage = path.join(__dirname, '../public/index.html');
    res.sendFile(htmlPage);
});

app.listen(3000);