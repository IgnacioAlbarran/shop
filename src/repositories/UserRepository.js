import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository {
  async createUser(firstName, lastName, email){
    try{
      const user = new User;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      return await this.save(user)
    }catch(error){
      console.error(error)
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
    try{
      this.delete(id)
      const user = newuser
      user.id = id
      return await this.save(user)
    }catch(error){
      console.error(error)
    }
  }

  async deleteUser(id){
    try{
      return this.delete(id)
    }catch(error){
      console.error(error)
    }
  }

  async getUser(id){
    try{
      const user =  await this.find({id: id})
      console.log(typeof(user))
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