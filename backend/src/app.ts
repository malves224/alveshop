import express, { Router } from 'express';
import cors from 'cors';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use([express.json(), cors()]);
  }

  public startServer(PORT: string | number): void {
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }
}

export default App;
