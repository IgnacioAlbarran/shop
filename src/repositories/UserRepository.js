import { EntityRepository, Repository, getConnection, getRepository, transactionEntityManager } from "typeorm";
import { User } from "../entities/User";

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

@EntityRepository(User)
export class UserRepository extends Repository {
  constructor(){
    super();
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async signUp(firstName, lastName, email, password, level){
    const hash = bcrypt.hashSync(password, salt);
    const user = new User;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hash;
    user.level = level;

    await this.queryRunner.startTransaction();

    try{
      await this.queryRunner.manager.save(user)
      await this.queryRunner.commitTransaction()
      return user
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
    }
  }

  async showUser(email){

  }

  async getUsers(){
    try{
      return this.find()
    }catch(error){
      console.error(error);
    }
  }

  async updateUser(id, userData){
    this.queryRunner.startTransaction();
    try{
      await this.queryRunner.manager.update(User, id, userData);
      await this.queryRunner.commitTransaction();
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
    }
  }

  async deleteUser(id){
    this.queryRunner.startTransaction();
    try{
      await this.queryRunner.manager.update(User, id, { "level": 0 });
      await this.queryRunner.commitTransaction();
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release()
      return `Deleted user ${id}`
    }
  }

  async getUser(id){
    try{
      const user =  await this.find({id: id})
      if (typeof(user) !== 'object'){
        return 'User not found'
      }else{
        return user
      }
    }catch(error){
      console.error(error)
    }
  }
}
