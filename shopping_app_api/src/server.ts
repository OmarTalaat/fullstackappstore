import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  config  from './config/config';
import routes from './routes';
import errorHandler  from './controllers/api/middlewares/error-handler'




    const app = express();
    
    app.use(cors())
    app.use(bodyParser.urlencoded({extended: true }));
    app.use(bodyParser.json());
    
    app.use(express.urlencoded({ extended: true }))
   


   app.use('/api',routes);


   app.use(errorHandler);
    app.listen(config.serve.port, () => {
        console.log(`listening to  ${config.serve.hostname}: ${config.serve.port}`);
    })
  

export default app