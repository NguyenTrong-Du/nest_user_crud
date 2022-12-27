import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_PROVIDER_TOKEN } from 'configs/utils/constants';
import { Pool } from 'pg';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject(DATABASE_PROVIDER_TOKEN) private conn: Pool) {}

  async create(createUserDto: CreateUserDto) {
    const { displayName, email, password } = createUserDto;
    const createUserResult = await this.conn.query(
      `
        INSERT INTO users 
          (
            "display_name", 
            "email",
            password
          ) 
        VALUES 
          ($1, $2, $3)
        RETURNING *
      `,
      [displayName, email, password],
    );
    return createUserResult.rows[0];
  }

  async findAll() {
    const findAllUserResult = await this.conn.query(
      `
        SELECT * 
        FROM users
      `,
    );
    return findAllUserResult.rows;
  }

  async findById(id: number) {
    const findOneUserResult = await this.conn.query(
      `
        SELECT * 
        FROM users
        WHERE 
          id = $1
      `,
      [id],
    );

    return findOneUserResult.rows[0];
  }

  async findOne(email: string) {
    const findOneUserResult = await this.conn.query(
      `
        SELECT * 
        FROM users
        WHERE 
          email = $1
      `,
      [email],
    );

    return findOneUserResult.rows[0];
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    const findUserResult = await this.findById(id);

    const updateData = { ...findUserResult, ...updateUserDto };

    const updateUserResult = await this.conn.query(
      `
        UPDATE users
        SET 
          name = $2,
          email = $3
        WHERE
          id = $1
        RETURNING *
      `,
      [id, updateData.name, updateData.email],
    );

    return updateUserResult.rows[0];
  }

  async delete(id: number) {
    const deleteUserResult = await this.conn.query(
      `
        DELETE
        FROM users
        WHERE 
          id = $1
        RETURNING *
      `,
      [id],
    );
    return deleteUserResult.rows[0];
  }

  async softDelete(id: number) {
    const user = await this.findById(id);
    const updateUserResult = await this.conn.query(
      `
        UPDATE users
        SET 
          created_at = $1
        WHERE
          id = $2
        RETURNING *
      `,
      [null, user.id],
    );

    return updateUserResult.rows[0];
  }
}
