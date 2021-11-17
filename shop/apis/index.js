//default
import axios from 'axios';
import appConfig from '../ShopertinoConfig';

//firebase
export * from './firebase';

export default axios.create(appConfig.stripeEnv.API);
