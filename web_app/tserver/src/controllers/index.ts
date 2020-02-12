import { UserController } from './User/User';
import { BljConfigFileController } from './BljConfigFile/BljConfigFile';


const userController = new UserController();
const bljConfigFileController = new BljConfigFileController();


export {
    userController,
    bljConfigFileController
};