import { EntityRepository, Repository, getConnection, getRepository, transactionEntityManager } from "typeorm";
import { User } from "../entities/User";

const bcrypt = require('bcrypt-nodejs');
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

  async createUser(firstName, lastName, email, password){
    const hash = bcrypt.hashSync(password, salt);
console.log(hash);
    const user = new User;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = hash;


    console.log(user.password)

    await this.queryRunner.startTransaction();

    try{
      await this.queryRunner.manager.save(user);
      await this.queryRunner.commitTransaction();
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
    }
  }

  async getUsers(){
    try{
      return this.find()
    }catch(error){
      console.error(error);
    }
  }

  async updateUser(id, newuser){
    this.queryRunner.startTransaction();
    try{
      await this.queryRunner.manager.delete(User, {id: id})
      const user = newuser
      user.id = id
      await this.queryRunner.manager.save(user)
      await this.queryRunner.commitTransaction();
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
    }
  }

  async deleteUser(id){
    await this.queryRunner.startTransaction();
    try{
      // const user = await this.queryRunner.manager.find({id: id})
      await this.queryRunner.manager.remove(User, {id: id});
      await this.queryRunner.commitTransaction();
    }catch(error){
      console.error(error)
      await this.queryRunner.rollbackTransaction();
    }finally{
      await this.queryRunner.release();
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